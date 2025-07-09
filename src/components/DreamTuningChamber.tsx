
import React from 'react';
import { Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DreamTuningChamberProps {
  onInitiateDreamTuning: () => void;
}

export const DreamTuningChamber: React.FC<DreamTuningChamberProps> = ({ onInitiateDreamTuning }) => {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-8">
      <h2 className="text-3xl font-bold text-slate-700 mb-6 text-center">Dream Tuning Chamber</h2>
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
          <Moon className="w-16 h-16 text-white" />
        </div>
        <p className="text-lg text-slate-600 mb-6">
          Attune your symbolic frequencies to seed tonight's mythic visions
        </p>
        <Button
          onClick={onInitiateDreamTuning}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg"
        >
          <Moon className="w-5 h-5 mr-2" />
          Begin Dream Resonance
        </Button>
      </div>
    </Card>
  );
};
