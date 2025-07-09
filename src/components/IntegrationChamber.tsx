
import React, { useState, useEffect } from 'react';
import { Gem, ArrowRight, Check, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArchetypalLandform, PsychicState } from '@/types/mythos';

interface IntegrationChamberProps {
  landforms: ArchetypalLandform[];
  psychicState: PsychicState;
  onIntegrationComplete: (integration: string) => void;
}

export const IntegrationChamber: React.FC<IntegrationChamberProps> = ({ 
  landforms, 
  psychicState, 
  onIntegrationComplete 
}) => {
  const [integrationPhase, setIntegrationPhase] = useState<'analysis' | 'synthesis' | 'embodiment'>('analysis');
  const [selectedLandforms, setSelectedLandforms] = useState<string[]>([]);
  const [integrationProgress, setIntegrationProgress] = useState(0);

  const polarityPairs = [
    { light: 'crystal', shadow: 'abyss', name: 'Clarity ↔ Mystery' },
    { light: 'flame', shadow: 'cave', name: 'Transformation ↔ Retreat' },
    { light: 'mountain', shadow: 'river', name: 'Resistance ↔ Flow' },
    { light: 'altar', shadow: 'forest', name: 'Sacred ↔ Wild' }
  ];

  const selectLandform = (landformId: string) => {
    setSelectedLandforms(prev => 
      prev.includes(landformId) 
        ? prev.filter(id => id !== landformId)
        : [...prev, landformId]
    );
  };

  const proceedToSynthesis = () => {
    setIntegrationPhase('synthesis');
    // Simulate integration process
    const interval = setInterval(() => {
      setIntegrationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIntegrationPhase('embodiment');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const completeIntegration = () => {
    onIntegrationComplete(`integration-${selectedLandforms.join('-')}-${Date.now()}`);
    setSelectedLandforms([]);
    setIntegrationProgress(0);
    setIntegrationPhase('analysis');
  };

  const getIntegrationReadiness = () => {
    const { clarity, growth, integration } = psychicState;
    return (clarity + growth + integration) / 3;
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-8">
      <h2 className="text-3xl font-bold text-slate-700 mb-6 text-center">Integration Chamber</h2>
      
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg">
          <Gem className="w-12 h-12 text-white" />
        </div>
        <p className="text-lg text-slate-600">
          Phase: <span className="capitalize font-semibold text-purple-700">{integrationPhase}</span>
        </p>
        <div className="mt-2 text-sm text-slate-500">
          Integration Readiness: {Math.round(getIntegrationReadiness())}/10
        </div>
      </div>

      {integrationPhase === 'analysis' && (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-700 mb-4 text-center">
              Select Landforms for Integration
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {landforms.map(landform => {
                const LandformIcon = landform.icon;
                const isSelected = selectedLandforms.includes(landform.id);
                
                return (
                  <div
                    key={landform.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? `bg-gradient-to-br ${landform.color} text-white shadow-lg scale-105` 
                        : 'bg-white/40 hover:bg-white/60 text-slate-600'
                    }`}
                    onClick={() => selectLandform(landform.id)}
                  >
                    <LandformIcon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs text-center font-medium">{landform.name}</p>
                    {isSelected && <Check className="w-4 h-4 mx-auto mt-1" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-3 text-center">
              Polarity Integration Patterns
            </h3>
            <div className="space-y-2">
              {polarityPairs.map((pair, index) => (
                <div key={index} className="flex items-center justify-center p-3 bg-white/40 rounded-lg">
                  <span className="text-sm text-slate-600">{pair.name}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedLandforms.length >= 2 && (
            <div className="text-center">
              <Button
                onClick={proceedToSynthesis}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg"
              >
                Begin Integration Synthesis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}

      {integrationPhase === 'synthesis' && (
        <div className="text-center">
          <div className="mb-6">
            <Circle className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-spin" />
            <p className="text-lg text-slate-600 mb-2">Synthesizing Archetypal Patterns...</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
              <div
                className="bg-gradient-to-r from-purple-400 to-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${integrationProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-500">{integrationProgress}% Complete</p>
          </div>
        </div>
      )}

      {integrationPhase === 'embodiment' && (
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-lg animate-pulse">
              <Gem className="w-10 h-10 text-white" />
            </div>
            <p className="text-lg text-slate-600 mb-4">Integration Complete</p>
            <p className="text-sm text-slate-500 mb-6">
              Your selected archetypal patterns have been woven into a unified symbolic matrix
            </p>
            <Button
              onClick={completeIntegration}
              className="bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-white px-8 py-4 text-lg rounded-full shadow-lg"
            >
              <Gem className="w-5 h-5 mr-2" />
              Embody Integration
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
