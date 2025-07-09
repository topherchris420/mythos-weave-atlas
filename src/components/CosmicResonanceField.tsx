
import React from 'react';
import { PsychicState } from '@/types/mythos';

interface CosmicResonanceFieldProps {
  psychicState: PsychicState;
}

export const CosmicResonanceField: React.FC<CosmicResonanceFieldProps> = ({ psychicState }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{
          background: `radial-gradient(circle, hsl(${psychicState.clarity * 36}, 70%, 60%), transparent)`,
          top: '20%',
          left: '30%',
          animationDuration: `${3 + psychicState.turbulence * 0.5}s`
        }}
      ></div>
      <div 
        className="absolute w-64 h-64 rounded-full blur-2xl opacity-15 animate-pulse"
        style={{
          background: `radial-gradient(circle, hsl(${psychicState.growth * 36 + 120}, 60%, 50%), transparent)`,
          bottom: '30%',
          right: '25%',
          animationDuration: `${2 + psychicState.integration * 0.3}s`
        }}
      ></div>
    </div>
  );
};
