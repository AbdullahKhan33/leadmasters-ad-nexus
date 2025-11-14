import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { originalPrompt, refinedPrompt, otherRefinedPrompts } = await req.json();

    if (!refinedPrompt || typeof refinedPrompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Refined prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing environment variables');
      return new Response(
        JSON.stringify({ error: 'Service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user ID from auth header
    const authHeader = req.headers.get('authorization');
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    let userId;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
      if (authError || !user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      userId = user.id;
    } else {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating 2 images for prompt:', refinedPrompt);

    // Generate 2 images
    const imagePromises = [1, 2].map(async (index) => {
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image',
          messages: [
            {
              role: 'user',
              content: refinedPrompt
            }
          ],
          modalities: ['image', 'text']
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Image ${index} generation error:`, response.status, errorText);
        
        if (response.status === 429) {
          throw new Error('RATE_LIMIT');
        }
        if (response.status === 402) {
          throw new Error('PAYMENT_REQUIRED');
        }
        throw new Error(`Failed to generate image ${index}`);
      }

      const data = await response.json();
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (!imageUrl) {
        console.error(`No image URL in response for image ${index}`);
        throw new Error(`No image generated for image ${index}`);
      }

      // Extract base64 data
      const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

      // Upload to Supabase Storage
      const fileName = `${userId}/${crypto.randomUUID()}.png`;
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('ai-creatives')
        .upload(fileName, imageBuffer, {
          contentType: 'image/png',
          upsert: false
        });

      if (uploadError) {
        console.error(`Failed to upload image ${index}:`, uploadError);
        throw new Error(`Failed to upload image ${index}`);
      }

      // Get public URL
      const { data: urlData } = supabaseClient.storage
        .from('ai-creatives')
        .getPublicUrl(fileName);

      return {
        imageUrl: urlData.publicUrl,
        fileName
      };
    });

    const results = await Promise.all(imagePromises);

    // Save both creatives to database
    const creativeInserts = results.map(result => ({
      user_id: userId,
      original_prompt: originalPrompt || refinedPrompt,
      refined_prompt: refinedPrompt,
      other_refined_prompts: otherRefinedPrompts || [],
      image_url: result.imageUrl,
      generation_metadata: {
        model: 'google/gemini-2.5-flash-image',
        generated_at: new Date().toISOString()
      }
    }));

    const { data: creatives, error: dbError } = await supabaseClient
      .from('ai_creatives')
      .insert(creativeInserts)
      .select();

    if (dbError) {
      console.error('Failed to save creatives to database:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save creatives' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        creatives,
        success: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-ad-creative:', error);
    
    if (error.message === 'RATE_LIMIT') {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (error.message === 'PAYMENT_REQUIRED') {
      return new Response(
        JSON.stringify({ error: 'Credits exhausted. Please add credits to continue.' }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});