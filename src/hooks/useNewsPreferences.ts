import { useCallback, useEffect, useState } from 'react';

export type ReadingDensity = 'comfortable' | 'compact';

interface ContinueReadingItem {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  viewedAt: string;
  category: string;
}

const STORAGE_KEYS = {
  selectedCategory: 'dc-news:selected-category',
  dismissedStories: 'dc-news:dismissed-stories',
  readingDensity: 'dc-news:reading-density',
  viewedCategories: 'dc-news:viewed-categories',
  continueReading: 'dc-news:continue-reading-session',
} as const;

const DEFAULT_CATEGORY = 'All';
const DEFAULT_DENSITY: ReadingDensity = 'comfortable';
const MAX_RECENT_CATEGORIES = 5;
const MAX_CONTINUE_READING = 6;

const isBrowser = typeof window !== 'undefined';

const parseJSON = <T,>(rawValue: string | null, fallback: T): T => {
  if (!rawValue) return fallback;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

export const useNewsPreferences = () => {
  const [selectedCategory, setSelectedCategoryState] = useState(DEFAULT_CATEGORY);
  const [dismissedStories, setDismissedStories] = useState<string[]>([]);
  const [readingDensity, setReadingDensityState] = useState<ReadingDensity>(DEFAULT_DENSITY);
  const [viewedCategories, setViewedCategories] = useState<string[]>([]);
  const [continueReading, setContinueReading] = useState<ContinueReadingItem[]>([]);

  useEffect(() => {
    if (!isBrowser) return;

    setSelectedCategoryState(localStorage.getItem(STORAGE_KEYS.selectedCategory) || DEFAULT_CATEGORY);
    setDismissedStories(parseJSON<string[]>(localStorage.getItem(STORAGE_KEYS.dismissedStories), []));

    const density = localStorage.getItem(STORAGE_KEYS.readingDensity);
    setReadingDensityState(density === 'compact' ? 'compact' : DEFAULT_DENSITY);

    setViewedCategories(parseJSON<string[]>(localStorage.getItem(STORAGE_KEYS.viewedCategories), []));
    setContinueReading(parseJSON<ContinueReadingItem[]>(sessionStorage.getItem(STORAGE_KEYS.continueReading), []));
  }, []);

  const setSelectedCategory = useCallback((category: string) => {
    setSelectedCategoryState(category);
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.selectedCategory, category);
  }, []);

  const setReadingDensity = useCallback((density: ReadingDensity) => {
    setReadingDensityState(density);
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.readingDensity, density);
  }, []);

  const dismissStory = useCallback((storyId: string) => {
    setDismissedStories((current) => {
      if (current.includes(storyId)) return current;

      const next = [...current, storyId];
      if (isBrowser) {
        localStorage.setItem(STORAGE_KEYS.dismissedStories, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const restoreDismissedStories = useCallback(() => {
    setDismissedStories([]);
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.dismissedStories, JSON.stringify([]));
  }, []);

  const trackArticleView = useCallback((article: Omit<ContinueReadingItem, 'viewedAt'>) => {
    setViewedCategories((current) => {
      const next = [article.category, ...current.filter((category) => category !== article.category)].slice(0, MAX_RECENT_CATEGORIES);

      if (isBrowser) {
        localStorage.setItem(STORAGE_KEYS.viewedCategories, JSON.stringify(next));
      }

      return next;
    });

    setContinueReading((current) => {
      const nextItem: ContinueReadingItem = { ...article, viewedAt: new Date().toISOString() };
      const next = [nextItem, ...current.filter((item) => item.id !== article.id)].slice(0, MAX_CONTINUE_READING);

      if (isBrowser) {
        sessionStorage.setItem(STORAGE_KEYS.continueReading, JSON.stringify(next));
      }

      return next;
    });
  }, []);

  const clearContinueReading = useCallback(() => {
    setContinueReading([]);
    if (!isBrowser) return;
    sessionStorage.setItem(STORAGE_KEYS.continueReading, JSON.stringify([]));
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    dismissedStories,
    dismissStory,
    restoreDismissedStories,
    readingDensity,
    setReadingDensity,
    viewedCategories,
    continueReading,
    trackArticleView,
    clearContinueReading,
  };
};

export type { ContinueReadingItem };
