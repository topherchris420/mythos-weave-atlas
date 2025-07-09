
import { Eye, Compass, Sun, Star, Shield, Mountain, Waves, TreePine, Flame, Gem, Moon } from 'lucide-react';
import { SymbolicTool } from '@/types/mythos';

export const LANDFORM_ARCHETYPES = {
  mountain: { icon: Mountain, color: 'from-stone-400 to-slate-600', name: 'Mountain of Resistance' },
  river: { icon: Waves, color: 'from-blue-400 to-cyan-600', name: 'River of Flow' },
  forest: { icon: TreePine, color: 'from-green-400 to-emerald-600', name: 'Forest of Echoes' },
  cave: { icon: Shield, color: 'from-gray-600 to-slate-800', name: 'Shadow Cave' },
  altar: { icon: Star, color: 'from-gold-400 to-amber-600', name: 'Sacred Altar' },
  abyss: { icon: Eye, color: 'from-purple-800 to-indigo-900', name: 'Abyss of Doubt' },
  crystal: { icon: Gem, color: 'from-violet-400 to-purple-600', name: 'Crystal of Clarity' },
  flame: { icon: Flame, color: 'from-orange-400 to-red-600', name: 'Flame of Transformation' }
};

export const SYMBOLIC_TOOLS: SymbolicTool[] = [
  { id: 'compass', name: 'Compass of Clarity', type: 'compass', power: 8, resonance: 'clarity', icon: Compass },
  { id: 'torch', name: 'Torch of Insight', type: 'torch', power: 7, resonance: 'illumination', icon: Sun },
  { id: 'mirror', name: 'Mirror of Recognition', type: 'mirror', power: 9, resonance: 'reflection', icon: Eye },
  { id: 'crystal', name: 'Crystal of Resonance', type: 'crystal', power: 6, resonance: 'harmony', icon: Gem }
];

export const NAVIGATION_MODES = [
  { mode: 'overview', icon: Compass, name: 'Overview' },
  { mode: 'ritual', icon: Star, name: 'Ritual Space' },
  { mode: 'dream', icon: Moon, name: 'Dream Tuning' },
  { mode: 'integration', icon: Gem, name: 'Integration' }
] as const;
