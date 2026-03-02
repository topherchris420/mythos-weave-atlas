import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const GNEWS_API_KEY = Deno.env.get("GNEWS_API_KEY");
  if (!GNEWS_API_KEY) {
    return new Response(
      JSON.stringify({ error: "GNEWS_API_KEY is not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Parse category from request body or query params
    let category = "All";
    try {
      const body = await req.json();
      if (body?.category) category = body.category;
    } catch {
      const url = new URL(req.url);
      category = url.searchParams.get("category") || "All";
    }

    // Map UI categories to search keywords
    const categoryKeywords: Record<string, string> = {
      "Local": "Washington DC local news",
      "Politics": "Washington DC politics government",
      "Crime & Safety": "Washington DC crime safety police",
      "Weather": "Washington DC weather",
      "Traffic": "Washington DC traffic metro transit",
      "Sports": "Washington DC sports nationals commanders",
      "Entertainment": "Washington DC entertainment arts culture",
      "All": "Washington DC",
    };

    const searchQuery = categoryKeywords[category] || "Washington DC";

    const gnewsUrl = new URL("https://gnews.io/api/v4/search");
    gnewsUrl.searchParams.set("q", searchQuery);
    gnewsUrl.searchParams.set("lang", "en");
    gnewsUrl.searchParams.set("country", "us");
    gnewsUrl.searchParams.set("max", "10");
    gnewsUrl.searchParams.set("apikey", GNEWS_API_KEY);

    const response = await fetch(gnewsUrl.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GNews API error [${response.status}]:`, errorText);
      return new Response(
        JSON.stringify({ error: `GNews API error: ${response.status}`, details: errorText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    // Transform GNews response to match our NewsArticle format
    const articles = (data.articles || []).map((article: any, index: number) => ({
      id: `gnews-${Date.now()}-${index}`,
      category: category === "All" ? "Local" : category,
      title: article.title || "Untitled",
      description: article.description || "",
      content: article.content || "",
      url: article.url || "#",
      image: article.image || null,
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        name: article.source?.name || "Unknown",
        url: article.source?.url || "#",
      },
    }));

    return new Response(JSON.stringify({ articles }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
