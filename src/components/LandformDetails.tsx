
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArchetypalLandform } from '@/types/mythos';

interface LandformDetailsProps {
  selectedLandform: ArchetypalLandform;
}

export const LandformDetails: React.FC<LandformDetailsProps> = ({ selectedLandform }) => {
  return (
    <Card className="mt-6 bg-white/80 backdrop-blur-sm border-purple-200/30 shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-700 mb-2">{selectedLandform.name}</h3>
      <p className="text-slate-600 mb-4">{selectedLandform.description}</p>
      <div className="flex items-center space-x-4">
        <div 
          className="px-3 py-1 rounded-full text-sm font-medium text-white shadow-lg"
          style={{ backgroundColor: `hsl(${selectedLandform.intensity * 36}, 70%, 60%)` }}
        >
          Intensity: {selectedLandform.intensity.toFixed(1)}
        </div>
        <div className="px-3 py-1 rounded-full text-sm font-medium bg-slate-200 text-slate-700 capitalize shadow-lg">
          {selectedLandform.resonance}
        </div>
        <div className="px-3 py-1 rounded-full text-sm font-medium bg-purple-200 text-purple-800 shadow-lg">
          {selectedLandform.timestamp.toLocaleDateString()}
        </div>
      </div>
    </Card>
  );
};
