import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { industry, businessType, targetMarket, campaignGoal, budgetRange, platform } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert digital advertising strategist. Generate comprehensive campaign suggestions based on the user's business context. Return ONLY valid JSON without any markdown formatting or code blocks.`;

    const userPrompt = `Generate campaign suggestions for:
Industry: ${industry}
Business Type: ${businessType}
Target Market: ${targetMarket}
Campaign Goal: ${campaignGoal}
Budget Range: ${budgetRange || 'Not specified'}
Platform: ${platform}

Return suggestions in this exact JSON structure:
{
  "campaignSetup": {
    "objective": "string",
    "recommendedBudget": { "min": number, "max": number, "reasoning": "string" },
    "bidStrategy": "string",
    "tips": ["string"]
  },
  "targetAudience": {
    "demographics": {
      "ageRange": [number, number],
      "gender": "string",
      "reasoning": "string"
    },
    "locations": [{ "name": "string", "reasoning": "string" }],
    ${platform === 'linkedin' ? '"jobTitles": ["string"], "industries": ["string"],' : ''}
    ${platform === 'google' ? '"keywords": ["string"],' : ''}
    ${platform === 'facebook' || platform === 'instagram' ? '"interests": ["string"],' : ''}
  },
  "adContent": {
    "headlines": [{ "text": "string", "confidence": "high" }],
    "descriptions": [{ "text": "string", "confidence": "high" }],
    "primaryText": ["string"],
    "callToAction": ["string"],
    "visualSuggestions": ["string"]
  }
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Clean the content to remove any markdown code blocks
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    
    const suggestions = JSON.parse(cleanContent);

    return new Response(JSON.stringify(suggestions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in campaign-ai-assistant:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Failed to generate AI suggestions'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
