import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArchetypalLandform, NavigationMode, SymbolicTool } from '@/types/mythos';
import { LANDFORM_ARCHETYPES, SYMBOLIC_TOOLS } from '@/constants/mythos';
import { usePsychicState } from '@/hooks/usePsychicState';
import { PsychicStateIndicators } from './PsychicStateIndicators';
import { NavigationModeSelector } from './NavigationModeSelector';
import { SymbolicTools } from './SymbolicTools';
import { ArchetypalLandscape } from './ArchetypalLandscape';
import { DreamTuningChamber } from './DreamTuningChamber';
import { LandformDetails } from './LandformDetails';
import { CosmicResonanceField } from './CosmicResonanceField';
import { RitualSpace } from './RitualSpace';
import { IntegrationChamber } from './IntegrationChamber';

export const MythOSInterface = () => {
  const { psychicState, setPsychicState } = usePsychicState();
  const [landforms, setLandforms] = useState<ArchetypalLandform[]>([]);
  const [selectedLandform, setSelectedLandform] = useState<ArchetypalLandform | null>(null);
  const [activeTools, setActiveTools] = useState<SymbolicTool[]>(SYMBOLIC_TOOLS);
  const [selectedTool, setSelectedTool] = useState<SymbolicTool | null>(null);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>('overview');
  const [ritualPhase, setRitualPhase] = useState<string>('');

  // Dynamic background based on psychic state
  const getBackgroundPattern = () => {
    const { clarity, turbulence, growth } = psychicState;
    
    if (turbulence > 7) {
      return 'bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-pulse';
    } else if (clarity > 8) {
      return 'bg-gradient-to-br from-white via-blue-50 to-indigo-50';
    } else if (growth > 8) {
      return 'bg-gradient-to-br from-white via-green-50 to-emerald-50';
    }
    return 'bg-gradient-to-br from-white via-purple-50 to-rose-50';
  };

  // Generate landforms based on symbolic interactions
  const manifestLandform = (type: keyof typeof LANDFORM_ARCHETYPES, intensity: number) => {
    const archetype = LANDFORM_ARCHETYPES[type];
    const newLandform: ArchetypalLandform = {
      id: `${type}-${Date.now()}`,
      type,
      name: archetype.name,
      description: `A ${archetype.name.toLowerCase()} has emerged in your inner landscape`,
      position: {
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        z: intensity * 10
      },
      intensity,
      resonance: intensity > 8 ? 'breakthrough' : intensity > 6 ? 'growth' : intensity < 3 ? 'shadow' : 'calm',
      interactions: [],
      icon: archetype.icon,
      color: archetype.color,
      timestamp: new Date()
    };
    
    setLandforms(prev => [...prev, newLandform]);
  };

  // Symbolic glyph carving interface
  const handleGlyphCarving = (x: number, y: number) => {
    if (!selectedTool) return;
    
    // Simulate glyph carving effect
    const intensity = Math.random() * 10;
    
    if (intensity > 7) {
      manifestLandform('crystal', intensity);
      setRitualPhase('A crystal of clarity manifests from your carved intention...');
    } else if (intensity > 5) {
      manifestLandform('flame', intensity);
      setRitualPhase('The flame of transformation ignites from your symbolic gesture...');
    } else {
      manifestLandform('river', intensity);
      setRitualPhase('A river of flow emerges from your carved symbol...');
    }

    // Update psychic state based on tool interaction
    setPsychicState(prev => ({
      ...prev,
      clarity: selectedTool.type === 'compass' ? Math.min(10, prev.clarity + 1) : prev.clarity,
      integration: selectedTool.type === 'mirror' ? Math.min(10, prev.integration + 1) : prev.integration
    }));
  };

  // Dream tuning resonance
  const initiateDreamTuning = () => {
    setNavigationMode('dream');
    setRitualPhase('The dream frequency attunes to your symbolic landscape...');
    
    // Simulate dream resonance effect
    setTimeout(() => {
      manifestLandform('forest', 8);
      setRitualPhase('Dream echoes manifest in the Forest of Echoes...');
    }, 2000);
  };

  // Add new handler for ritual completion
  const handleRitualComplete = (ritual: string) => {
    setRitualPhase(`Sacred ritual completed: ${ritual}`);
    // Manifest a special landform based on the ritual
    manifestLandform('altar', 9);
  };

  // Add new handler for integration completion
  const handleIntegrationComplete = (integration: string) => {
    setRitualPhase(`Integration embodied: ${integration}`);
    // Update psychic state based on successful integration
    setPsychicState(prev => ({
      ...prev,
      integration: Math.min(10, prev.integration + 2),
      clarity: Math.min(10, prev.clarity + 1)
    }));
  };

  return (
    <div className={`min-h-screen ${getBackgroundPattern()} text-slate-800 transition-all duration-1000 relative overflow-hidden`}>
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="mythic-3d-bg">
          <div className="floating-crystal floating-crystal-1"></div>
          <div className="floating-crystal floating-crystal-2"></div>
          <div className="floating-crystal floating-crystal-3"></div>
          <div className="floating-pyramid floating-pyramid-1"></div>
          <div className="floating-pyramid floating-pyramid-2"></div>
          <div className="floating-sphere floating-sphere-1"></div>
          <div className="floating-sphere floating-sphere-2"></div>
        </div>
      </div>

      <CosmicResonanceField psychicState={psychicState} />

      <div className="relative z-10 container mx-auto p-3 sm:p-6">
        {/* Archetypal Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-800 mb-2 drop-shadow-lg">
            <span className="bg-gradient-to-r from-slate-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MythOS
            </span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-slate-600 opacity-80 px-4 drop-shadow-sm">
            Symbolic Navigation System for the Inner Landscape
          </p>
          {ritualPhase && (
            <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200/30 shadow-lg">
              <p className="text-purple-800 italic font-medium">"{ritualPhase}"</p>
            </div>
          )}
        </div>

        <PsychicStateIndicators psychicState={psychicState} />
        <NavigationModeSelector 
          navigationMode={navigationMode} 
          setNavigationMode={setNavigationMode} 
        />

        {/* Main Symbolic Interface */}
        {navigationMode === 'overview' && (
          <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 mb-4 sm:mb-6 text-center">Archetypal Cartography</h2>
            
            <ArchetypalLandscape
              landforms={landforms}
              onGlyphCarving={handleGlyphCarving}
              onLandformSelect={setSelectedLandform}
            />

            <SymbolicTools
              activeTools={activeTools}
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
            />
          </Card>
        )}

        {navigationMode === 'ritual' && (
          <RitualSpace
            selectedTool={selectedTool}
            onRitualComplete={handleRitualComplete}
          />
        )}

        {navigationMode === 'dream' && (
          <DreamTuningChamber onInitiateDreamTuning={initiateDreamTuning} />
        )}

        {navigationMode === 'integration' && (
          <IntegrationChamber
            landforms={landforms}
            psychicState={psychicState}
            onIntegrationComplete={handleIntegrationComplete}
          />
        )}

        {selectedLandform && (
          <LandformDetails selectedLandform={selectedLandform} />
        )}
      </div>
    </div>
  );
};
