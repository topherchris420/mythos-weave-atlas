
import { useState, useEffect } from 'react';
import { PsychicState } from '@/types/mythos';

export const usePsychicState = () => {
  const [psychicState, setPsychicState] = useState<PsychicState>({
    clarity: 7,
    turbulence: 3,
    growth: 5,
    integration: 4
  });

  // Phase-responsive terrain morphing
  useEffect(() => {
    const interval = setInterval(() => {
      setPsychicState(prev => ({
        clarity: Math.max(1, Math.min(10, prev.clarity + (Math.random() - 0.5) * 0.5)),
        turbulence: Math.max(1, Math.min(10, prev.turbulence + (Math.random() - 0.5) * 0.7)),
        growth: Math.max(1, Math.min(10, prev.growth + (Math.random() - 0.5) * 0.3)),
        integration: Math.max(1, Math.min(10, prev.integration + (Math.random() - 0.5) * 0.2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { psychicState, setPsychicState };
};
