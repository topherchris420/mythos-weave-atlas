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
    let category = "All";
    try {
      const body = await req.json();
      if (body?.category) category = body.category;
    } catch {
      const url = new URL(req.url);
      category = url.searchParams.get("category") || "All";
    }

    // Use simpler, broader search terms that GNews is more likely to return results for
    // Use quoted "Washington DC" to force exact match — prevents unrelated US news
    const categoryKeywords: Record<string, string> = {
      "Local": '"Washington DC" OR "Washington D.C." OR "District of Columbia"',
      "Politics": '"Washington DC" OR "D.C. Council" OR "Capitol Hill" politics',
      "Crime & Safety": '"Washington DC" OR "D.C. police" OR "MPD" crime',
      "Weather": '"Washington DC" OR "D.C. area" weather',
      "Traffic": '"Washington DC" OR "WMATA" OR "Metro" transit traffic',
      "Sports": '"Washington DC" Commanders OR Nationals OR Capitals OR Wizards',
      "Entertainment": '"Washington DC" OR "Smithsonian" OR "Kennedy Center" entertainment',
      "All": '"Washington DC" OR "Washington D.C."',
    };

    // Some categories map better to GNews topic categories
    const topicCategories: Record<string, string | null> = {
      "Politics": "nation",
      "Sports": "sports",
      "Entertainment": "entertainment",
      "Crime & Safety": "nation",
      "Weather": "science",
      "Traffic": null,
      "Local": null,
      "All": null,
    };

    const searchQuery = categoryKeywords[category] || "Washington DC news";
    const topicCategory = topicCategories[category] ?? null;

    // Try search endpoint first
    const gnewsUrl = new URL("https://gnews.io/api/v4/search");
    gnewsUrl.searchParams.set("q", searchQuery);
    gnewsUrl.searchParams.set("lang", "en");
    gnewsUrl.searchParams.set("country", "us");
    gnewsUrl.searchParams.set("max", "10");
    gnewsUrl.searchParams.set("apikey", GNEWS_API_KEY);

    console.log(`Fetching news for category "${category}" with query: "${searchQuery}"`);

    const response = await fetch(gnewsUrl.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GNews API error [${response.status}]:`, errorText);
      
      // If rate limited or error, return empty with informative message
      return new Response(
        JSON.stringify({ articles: [], rateLimited: response.status === 429 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log(`GNews returned ${data.articles?.length || 0} articles for "${category}"`);

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
      JSON.stringify({ articles: [], error: message }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
