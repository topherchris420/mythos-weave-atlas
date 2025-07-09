import React, { useState, useEffect, useRef } from 'react';
import { Eye, Compass, BookOpen, Sparkles, Moon, Sun, Star, Heart, Zap, Shield, Mountain, Waves, TreePine, Flame, Gem } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ArchetypalLandform {
  id: string;
  type: 'mountain' | 'river' | 'forest' | 'cave' | 'altar' | 'abyss' | 'crystal' | 'flame';
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  intensity: number;
  resonance: 'calm' | 'turbulent' | 'growth' | 'shadow' | 'breakthrough';
  interactions: string[];
  icon: React.ComponentType<any>;
  color: string;
  timestamp: Date;
}

interface PsychicState {
  clarity: number;
  turbulence: number;
  growth: number;
  integration: number;
}

interface SymbolicTool {
  id: string;
  name: string;
  type: 'compass' | 'torch' | 'mirror' | 'crystal' | 'glyph';
  power: number;
  resonance: string;
  icon: React.ComponentType<any>;
}

const LANDFORM_ARCHETYPES = {
  mountain: { icon: Mountain, color: 'from-stone-400 to-slate-600', name: 'Mountain of Resistance' },
  river: { icon: Waves, color: 'from-blue-400 to-cyan-600', name: 'River of Flow' },
  forest: { icon: TreePine, color: 'from-green-400 to-emerald-600', name: 'Forest of Echoes' },
  cave: { icon: Shield, color: 'from-gray-600 to-slate-800', name: 'Shadow Cave' },
  altar: { icon: Star, color: 'from-gold-400 to-amber-600', name: 'Sacred Altar' },
  abyss: { icon: Eye, color: 'from-purple-800 to-indigo-900', name: 'Abyss of Doubt' },
  crystal: { icon: Gem, color: 'from-violet-400 to-purple-600', name: 'Crystal of Clarity' },
  flame: { icon: Flame, color: 'from-orange-400 to-red-600', name: 'Flame of Transformation' }
};

const SYMBOLIC_TOOLS: SymbolicTool[] = [
  { id: 'compass', name: 'Compass of Clarity', type: 'compass', power: 8, resonance: 'clarity', icon: Compass },
  { id: 'torch', name: 'Torch of Insight', type: 'torch', power: 7, resonance: 'illumination', icon: Sun },
  { id: 'mirror', name: 'Mirror of Recognition', type: 'mirror', power: 9, resonance: 'reflection', icon: Eye },
  { id: 'crystal', name: 'Crystal of Resonance', type: 'crystal', power: 6, resonance: 'harmony', icon: Gem }
];

export const MythOSInterface = () => {
  const [psychicState, setPsychicState] = useState<PsychicState>({
    clarity: 7,
    turbulence: 3,
    growth: 5,
    integration: 4
  });
  
  const [landforms, setLandforms] = useState<ArchetypalLandform[]>([]);
  const [selectedLandform, setSelectedLandform] = useState<ArchetypalLandform | null>(null);
  const [activeTools, setActiveTools] = useState<SymbolicTool[]>(SYMBOLIC_TOOLS);
  const [selectedTool, setSelectedTool] = useState<SymbolicTool | null>(null);
  const [navigationMode, setNavigationMode] = useState<'overview' | 'ritual' | 'dream' | 'integration'>('overview');
  const [ritualPhase, setRitualPhase] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <div className={`min-h-screen ${getBackgroundPattern()} text-slate-800 transition-all duration-1000`}>
      {/* Cosmic Resonance Field */}
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

      <div className="relative z-10 container mx-auto p-6">
        {/* Archetypal Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            MythOS
          </h1>
          <p className="text-xl text-slate-600 opacity-80">
            Symbolic Navigation System for the Inner Landscape
          </p>
          {ritualPhase && (
            <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200/30 shadow-lg">
              <p className="text-purple-800 italic font-medium">"{ritualPhase}"</p>
            </div>
          )}
        </div>

        {/* Psychic State Indicators */}
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

        {/* Navigation Modes */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white/40 backdrop-blur-sm rounded-full p-2 shadow-lg">
            {[
              { mode: 'overview', icon: Compass, name: 'Overview' },
              { mode: 'ritual', icon: Star, name: 'Ritual Space' },
              { mode: 'dream', icon: Moon, name: 'Dream Tuning' },
              { mode: 'integration', icon: Gem, name: 'Integration' }
            ].map(({ mode, icon: Icon, name }) => (
              <Button
                key={mode}
                variant={navigationMode === mode ? "default" : "ghost"}
                onClick={() => setNavigationMode(mode as any)}
                className={`rounded-full px-6 py-3 ${
                  navigationMode === mode 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Symbolic Interface */}
        {navigationMode === 'overview' && (
          <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-8">
            <h2 className="text-3xl font-bold text-slate-700 mb-6 text-center">Archetypal Cartography</h2>
            
            {/* Interactive Landscape Canvas */}
            <div 
              className="relative w-full h-96 bg-gradient-to-br from-white/80 to-purple-50/80 rounded-lg border-2 border-purple-200/30 overflow-hidden cursor-crosshair shadow-inner"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                handleGlyphCarving(x, y);
              }}
            >
              {landforms.map(landform => {
                const LandformIcon = landform.icon;
                return (
                  <div
                    key={landform.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ 
                      left: landform.position.x, 
                      top: landform.position.y,
                      filter: `drop-shadow(0 ${landform.position.z / 10}px ${landform.position.z / 5}px rgba(0,0,0,0.3))`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLandform(landform);
                    }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${landform.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform animate-pulse`}>
                      <LandformIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-xs text-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      {landform.name}
                    </div>
                  </div>
                );
              })}
              
              {landforms.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Carve your first symbolic glyph to manifest the landscape...</p>
                    <p className="text-sm mt-2">Select a tool below and click anywhere to begin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Symbolic Tools */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-4 text-center">Sacred Instruments</h3>
              <div className="flex justify-center space-x-4">
                {activeTools.map(tool => {
                  const ToolIcon = tool.icon;
                  return (
                    <div
                      key={tool.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedTool?.id === tool.id
                          ? 'bg-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white/60 text-slate-600 hover:bg-white/80 hover:scale-102'
                      }`}
                      onClick={() => setSelectedTool(tool)}
                    >
                      <ToolIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm text-center font-medium">{tool.name}</p>
                      <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-indigo-500 h-1 rounded-full"
                          style={{ width: `${tool.power * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {navigationMode === 'dream' && (
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
                onClick={initiateDreamTuning}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg"
              >
                <Moon className="w-5 h-5 mr-2" />
                Begin Dream Resonance
              </Button>
            </div>
          </Card>
        )}

        {selectedLandform && (
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
        )}
      </div>
    </div>
  );
};
