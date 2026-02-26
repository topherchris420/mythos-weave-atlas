// GNews API Hook for fetching real Washington DC news
import { useState, useEffect, useCallback } from 'react';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

const GNEWS_API_URL = 'https://gnews.io/api/v4/search';

// Fallback real DC headlines in case API fails
const FALLBACK_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Washington DC Area News - Visit gnews.io to enable live news',
    description: 'Get your free API key from gnews.io and add it to your .env file as VITE_GNEWS_API_KEY to see real DC news here.',
    content: '',
    url: 'https://gnews.io',
    image: null,
    publishedAt: new Date().toISOString(),
    source: { name: 'MythOS', url: 'https://mythos.app' }
  }
];

export const useDCNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

    // Check if API key is configured
    if (!apiKey || apiKey === 'your_gnews_api_key_here') {
      setError('API key not configured');
      setArticles(FALLBACK_ARTICLES);
      setLoading(false);
      return;
    }

    try {
      // Fetch Washington DC related news
      const response = await fetch(
        `${GNEWS_API_URL}?q=Washington%20DC%20OR%20DC%20politics%20OR%20Maryland%20Virginia&lang=en&country=us&max=10`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: GNewsResponse = await response.json();

      // Transform GNews format to our format
      const transformedArticles: NewsArticle[] = data.articles.map((article, index) => ({
        id: `news-${index}-${Date.now()}`,
        title: article.title,
        description: article.description || '',
        content: article.content || '',
        url: article.url,
        image: article.image,
        publishedAt: article.publishedAt,
        source: article.source
      }));

      setArticles(transformedArticles);
    } catch (err) {
      console.error('News fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Refresh function
  const refresh = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  return { articles, loading, error, refresh };
};
