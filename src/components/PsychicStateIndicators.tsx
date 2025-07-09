
import React from 'react';
import { PsychicState } from '@/types/mythos';

interface PsychicStateIndicatorsProps {
  psychicState: PsychicState;
}

export const PsychicStateIndicators: React.FC<PsychicStateIndicatorsProps> = ({ psychicState }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {Object.entries(psychicState).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full border-4 border-white/40 flex items-center justify-center shadow-lg"
               style={{ backgroundColor: `hsl(${value * 36}, 60%, 85%)` }}>
            <span className="text-slate-700 font-bold">{Math.round(value)}</span>
          </div>
          <p className="text-sm text-slate-600 capitalize">{key}</p>
        </div>
      ))}
    </div>
  );
};
