import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  category: string;
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

// Fallback static articles in case the API is unavailable
const FALLBACK_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    category: 'Traffic',
    title: 'Metro Board Approves FY2027 Budget Amid Ridership Recovery',
    description: 'WMATA officials unveiled a $2.1 billion operating budget focused on increasing service frequency and improving reliability across all rail and bus lines.',
    content: '',
    url: 'https://www.wmata.com',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=600&h=400&fit=crop',
    publishedAt: new Date().toISOString(),
    source: { name: 'Washington Metro Report', url: 'https://www.wmata.com' }
  },
  {
    id: '2',
    category: 'Weather',
    title: 'National Cherry Blossom Festival Announces Peak Bloom Window',
    description: 'The National Park Service expects peak bloom around April 8-15, with enhanced pedestrian safety measures planned around the Tidal Basin.',
    content: '',
    url: 'https://www.nps.gov',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: 'NPS News', url: 'https://www.nps.gov' }
  },
  {
    id: '3',
    category: 'Politics',
    title: 'DC Council Passes Affordable Housing Legislation',
    description: 'New bill mandates 30% of new residential developments in high-density zones include affordable units, effective January 2027.',
    content: '',
    url: 'https://dc.gov',
    image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=600&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: 'DC Wire', url: 'https://dc.gov' }
  },
  {
    id: '4',
    category: 'Entertainment',
    title: 'Smithsonian Announces Major Renovation of National Air and Space Museum',
    description: 'The museum will close for 18 months starting July for comprehensive infrastructure upgrades and exhibit modernization.',
    content: '',
    url: 'https://www.si.edu',
    image: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=600&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    source: { name: 'Smithsonian Insider', url: 'https://www.si.edu' }
  },
];

export const useDCNews = (category?: string) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-dc-news', {
        body: null,
        headers: { 'Content-Type': 'application/json' },
      });

      if (fnError) {
        console.error('Edge function error:', fnError);
        throw new Error(fnError.message || 'Failed to fetch news');
      }

      if (data?.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        // Use fallback if API returns no results
        setArticles(FALLBACK_ARTICLES);
      }
    } catch (err) {
      console.error('News fetch failed, using fallback:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refresh = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  return { articles, loading, error, refresh };
};
