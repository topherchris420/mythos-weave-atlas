// MythOS Persistence Utilities
// Handles localStorage operations for all user data

const STORAGE_KEYS = {
  PSYCHIC_STATE: 'mythos_psychic_state',
  LANDFORMS: 'mythos_landforms',
  NAVIGATION_MODE: 'mythos_navigation_mode',
  SOUNDSCAPE_MODE: 'mythos_soundscape_mode',
  SOUNDSCAPE_VOLUME: 'mythos_soundscape_volume',
  RITUAL_PROGRESS: 'mythos_ritual_progress',
  JOURNAL_ENTRIES: 'mythos_journal_entries',
  SESSION_HISTORY: 'mythos_session_history',
  FIRST_VISIT: 'mythos_first_visit',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
type StorageValue = typeof STORAGE_KEYS[StorageKey];

// Generic get/set with error handling - accepts either key name or resolved value
export const storage = {
  get: <T>(key: StorageKey | StorageValue, defaultValue: T): T => {
    try {
      const resolvedKey = key in STORAGE_KEYS
        ? STORAGE_KEYS[key as StorageKey]
        : key as string;
      const item = localStorage.getItem(resolvedKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Storage get error for ${key}:`, error);
      return defaultValue;
    }
  },

  set: <T>(key: StorageKey | StorageValue, value: T): void => {
    try {
      const resolvedKey = key in STORAGE_KEYS
        ? STORAGE_KEYS[key as StorageKey]
        : key as string;
      localStorage.setItem(resolvedKey, JSON.stringify(value));
    } catch (error) {
      console.warn(`Storage set error for ${key}:`, error);
    }
  },

  remove: (key: StorageKey | StorageValue): void => {
    try {
      const resolvedKey = key in STORAGE_KEYS
        ? STORAGE_KEYS[key as StorageKey]
        : key as string;
      localStorage.removeItem(resolvedKey);
    } catch (error) {
      console.warn(`Storage remove error for ${key}:`, error);
    }
  },

  clear: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn('Storage clear error:', error);
    }
  },
};

// Check if user is visiting for the first time
export const isFirstVisit = (): boolean => {
  return storage.get(STORAGE_KEYS.FIRST_VISIT, true);
};

export const markVisited = (): void => {
  storage.set(STORAGE_KEYS.FIRST_VISIT, false);
};

export { STORAGE_KEYS };
