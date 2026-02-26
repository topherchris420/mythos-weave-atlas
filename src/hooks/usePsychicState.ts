
import { useState, useEffect, useCallback } from 'react';
import { PsychicState } from '@/types/mythos';
import { storage, STORAGE_KEYS } from './useMythosStorage';

const DEFAULT_STATE: PsychicState = {
  clarity: 7,
  turbulence: 3,
  growth: 5,
  integration: 4
};

export const usePsychicState = () => {
  const [psychicState, setPsychicState] = useState<PsychicState>(() => {
    return storage.get(STORAGE_KEYS.PSYCHIC_STATE, DEFAULT_STATE);
  });

  // Persist state changes to localStorage
  const setPsychicStateWithPersist = useCallback((update: PsychicState | ((prev: PsychicState) => PsychicState)) => {
    setPsychicState(prev => {
      const newState = typeof update === 'function' ? update(prev) : update;
      storage.set(STORAGE_KEYS.PSYCHIC_STATE, newState);
      return newState;
    });
  }, []);

  // Phase-responsive terrain morphing (only if user hasn't manually set values)
  useEffect(() => {
    const interval = setInterval(() => {
      setPsychicState(prev => {
        // Smaller, more subtle fluctuations
        const newClarity = Math.max(1, Math.min(10, prev.clarity + (Math.random() - 0.5) * 0.3));
        const newTurbulence = Math.max(1, Math.min(10, prev.turbulence + (Math.random() - 0.5) * 0.4));
        const newGrowth = Math.max(1, Math.min(10, prev.growth + (Math.random() - 0.5) * 0.2));
        const newIntegration = Math.max(1, Math.min(10, prev.integration + (Math.random() - 0.5) * 0.15));

        const newState = {
          clarity: newClarity,
          turbulence: newTurbulence,
          growth: newGrowth,
          integration: newIntegration
        };

        // Persist subtle changes too
        storage.set(STORAGE_KEYS.PSYCHIC_STATE, newState);
        return newState;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { psychicState, setPsychicState: setPsychicStateWithPersist };
};
