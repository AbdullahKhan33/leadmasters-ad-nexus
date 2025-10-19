import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaignDescription } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Construct the AI prompt
    const systemPrompt = `You are a professional social media content strategist. Based on the user's campaign description, generate 5 unique, highly targeted post ideas.

Platform options: Instagram, Facebook, LinkedIn, Twitter, TikTok, WhatsApp
- For WhatsApp: Keep it conversational, personal, and emoji-friendly. Use shorter captions (100-200 characters). Hashtags are optional but can be included for cross-posting reference.
- For other platforms: Follow standard best practices for that platform.
- Ensure at least one of the 5 ideas is tailored for WhatsApp unless the description explicitly makes WhatsApp inappropriate.

For each post idea, provide:
1. Platform (choose the most appropriate platform based on the campaign description and content type)
2. Post caption (engaging, platform-optimized, 150-280 characters for social media, 100-200 for WhatsApp)
3. 5-8 relevant, trending hashtags (without # symbol)
4. Best posting time (specific time recommendation based on platform and audience)
5. Engagement optimization tips (actionable advice)
6. Expected engagement level (low/medium/high)
7. Content type (image, video, carousel, story, reel, message)
8. Image prompt (detailed description of the ideal image/visual that should accompany this post - be creative and specific)

Make content authentic, actionable, and perfectly aligned with the user's goals.`;

    const userPrompt = `Campaign description:\n${campaignDescription}`;

    // Call Lovable AI API with tool calling for structured output
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
        tools: [
          {
            type: "function",
            function: {
              name: "generate_post_ideas",
              description: "Return the generated post ideas with structured data",
              parameters: {
                type: "object",
                  properties: {
                    ideas: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          platform: { type: "string", description: "Social media platform (facebook, instagram, linkedin, twitter, tiktok, whatsapp)" },
                          caption: { type: "string", description: "The post caption" },
                          hashtags: { 
                            type: "array", 
                            items: { type: "string" },
                            description: "Array of hashtags without # symbol"
                          },
                          best_posting_time: { type: "string", description: "Suggested posting time" },
                          engagement_tips: { type: "string", description: "Tips to maximize engagement" },
                          expected_engagement: { 
                            type: "string", 
                            enum: ["low", "medium", "high"],
                            description: "Expected engagement level"
                          },
                          content_type: { type: "string", description: "Suggested content format" },
                          image_prompt: { type: "string", description: "Detailed description of the ideal image/visual for this post" }
                        },
                        required: ["platform", "caption", "hashtags", "best_posting_time", "engagement_tips", "expected_engagement", "content_type", "image_prompt"]
                      }
                    }
                  },
                required: ["ideas"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_post_ideas" } }
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    
    // Extract the tool call response
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call response from AI");
    }

    const generatedIdeas = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ideas: generatedIdeas.ideas,
        metadata: {
          campaignDescription
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error generating post ideas:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
