
import React, { useState } from 'react';
import { Star, Flame, Eye, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SymbolicTool } from '@/types/mythos';

interface RitualSpaceProps {
  selectedTool: SymbolicTool | null;
  onRitualComplete: (ritual: string) => void;
}

export const RitualSpace: React.FC<RitualSpaceProps> = ({ selectedTool, onRitualComplete }) => {
  const [ritualPhase, setRitualPhase] = useState<'preparation' | 'invocation' | 'manifestation'>('preparation');
  const [activeElements, setActiveElements] = useState<string[]>([]);

  const ritualElements = [
    { id: 'earth', name: 'Earth Anchor', icon: Mountain, color: 'from-amber-500 to-yellow-600' },
    { id: 'fire', name: 'Fire of Will', icon: Flame, color: 'from-red-500 to-orange-600' },
    { id: 'water', name: 'Waters of Flow', icon: Eye, color: 'from-blue-500 to-cyan-600' },
    { id: 'air', name: 'Winds of Change', icon: Star, color: 'from-purple-500 to-indigo-600' }
  ];

  const activateElement = (elementId: string) => {
    if (!activeElements.includes(elementId)) {
      setActiveElements(prev => [...prev, elementId]);
      
      if (activeElements.length === 2) {
        setRitualPhase('invocation');
      } else if (activeElements.length === 3) {
        setRitualPhase('manifestation');
      }
    }
  };

  const completeRitual = () => {
    const ritualType = selectedTool?.type || 'general';
    onRitualComplete(`${ritualType}-ritual-${Date.now()}`);
    setActiveElements([]);
    setRitualPhase('preparation');
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-8">
      <h2 className="text-3xl font-bold text-slate-700 mb-6 text-center">Sacred Ritual Space</h2>
      
      <div className="text-center mb-8">
        <div className="text-lg text-slate-600 mb-4">
          Phase: <span className="capitalize font-semibold text-purple-700">{ritualPhase}</span>
        </div>
        {selectedTool && (
          <p className="text-sm text-slate-500">
            Working with: {selectedTool.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {ritualElements.map(element => {
          const ElementIcon = element.icon;
          const isActive = activeElements.includes(element.id);
          
          return (
            <div
              key={element.id}
              className={`p-6 rounded-lg cursor-pointer transition-all ${
                isActive 
                  ? `bg-gradient-to-br ${element.color} text-white shadow-lg scale-105 animate-pulse` 
                  : 'bg-white/40 hover:bg-white/60 text-slate-600'
              }`}
              onClick={() => activateElement(element.id)}
            >
              <ElementIcon className="w-12 h-12 mx-auto mb-3" />
              <p className="text-center font-medium">{element.name}</p>
            </div>
          );
        })}
      </div>

      {ritualPhase === 'manifestation' && (
        <div className="text-center">
          <Button
            onClick={completeRitual}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg animate-pulse"
          >
            <Star className="w-5 h-5 mr-2" />
            Complete Sacred Ritual
          </Button>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-slate-500">
        Activate all four elemental anchors to complete the ritual manifestation
      </div>
    </Card>
  );
};
