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

// Generic get/set with error handling
export const storage = {
  get: <T>(key: StorageKey, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(STORAGE_KEYS[key]);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Storage get error for ${key}:`, error);
      return defaultValue;
    }
  },

  set: <T>(key: StorageKey, value: T): void => {
    try {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
    } catch (error) {
      console.warn(`Storage set error for ${key}:`, error);
    }
  },

  remove: (key: StorageKey): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS[key]);
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
