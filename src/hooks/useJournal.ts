// Journal and Dream Log Management Hook
import { useState, useEffect, useCallback } from 'react';
import { JournalEntry } from '@/types/mythos';
import { storage, STORAGE_KEYS } from './useMythosStorage';

export const useJournal = () => {
  // Load persisted entries
  const [entries, setEntries] = useState<JournalEntry[]>(() =>
    storage.get(STORAGE_KEYS.JOURNAL_ENTRIES, [])
  );

  // Persist entries whenever they change
  useEffect(() => {
    storage.set(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
  }, [entries]);

  // Create a new journal entry
  const createEntry = useCallback((
    type: JournalEntry['type'],
    title: string,
    content: string,
    mood?: JournalEntry['mood'],
    associatedLandforms?: string[]
  ): JournalEntry => {
    const now = new Date();
    const newEntry: JournalEntry = {
      id: `journal-${now.getTime()}`,
      type,
      title,
      content,
      mood,
      associatedLandforms,
      createdAt: now,
      updatedAt: now
    };
    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  }, []);

  // Update an existing entry
  const updateEntry = useCallback((
    id: string,
    updates: Partial<Pick<JournalEntry, 'title' | 'content' | 'mood' | 'associatedLandforms'>>
  ) => {
    setEntries(prev => prev.map(entry =>
      entry.id === id
        ? { ...entry, ...updates, updatedAt: new Date() }
        : entry
    ));
  }, []);

  // Delete an entry
  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  }, []);

  // Get entries by type
  const getEntriesByType = useCallback((type: JournalEntry['type']) => {
    return entries.filter(entry => entry.type === type);
  }, [entries]);

  // Get dream entries (most recent first)
  const getDreamEntries = useCallback(() => {
    return getEntriesByType('dream');
  }, [getEntriesByType]);

  // Get insight entries
  const getInsightEntries = useCallback(() => {
    return getEntriesByType('insight');
  }, [getEntriesByType]);

  // Get entry by id
  const getEntryById = useCallback((id: string) => {
    return entries.find(entry => entry.id === id);
  }, [entries]);

  // Search entries by content or title
  const searchEntries = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return entries.filter(entry =>
      entry.title.toLowerCase().includes(lowerQuery) ||
      entry.content.toLowerCase().includes(lowerQuery)
    );
  }, [entries]);

  // Get total entry count
  const getTotalEntries = useCallback(() => {
    return entries.length;
  }, [entries]);

  return {
    entries,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntriesByType,
    getDreamEntries,
    getInsightEntries,
    getEntryById,
    searchEntries,
    getTotalEntries
  };
};
