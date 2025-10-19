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
    const { businessType, targetAudience, goals, platform, brandVoice = "professional", numberOfIdeas = 5 } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Construct the AI prompt
    const systemPrompt = `You are a professional social media content strategist specializing in creating engaging, platform-optimized post ideas.

Based on the user's business context, generate ${numberOfIdeas} unique post ideas.

For each idea, provide:
1. Compelling caption (150-280 characters, platform-optimized)
2. 5-8 relevant, trending hashtags
3. Best posting time (based on platform and audience)
4. Engagement optimization tips
5. Expected engagement level (low/medium/high)
6. Content type suggestion (image, video, carousel, story)

Make content authentic, platform-appropriate, and aligned with the brand voice (${brandVoice}).`;

    const userPrompt = `Generate ${numberOfIdeas} post ideas for:
Business Type: ${businessType}
Target Audience: ${targetAudience}
Goals: ${goals.join(", ")}
Platform: ${platform}
Brand Voice: ${brandVoice}`;

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
                        content_type: { type: "string", description: "Suggested content format" }
                      },
                      required: ["caption", "hashtags", "best_posting_time", "engagement_tips", "expected_engagement", "content_type"]
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
          businessType,
          targetAudience,
          goals,
          platform,
          brandVoice
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
