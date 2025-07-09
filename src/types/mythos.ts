
import { LucideIcon } from 'lucide-react';

export interface ArchetypalLandform {
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

export interface PsychicState {
  clarity: number;
  turbulence: number;
  growth: number;
  integration: number;
}

export interface SymbolicTool {
  id: string;
  name: string;
  type: 'compass' | 'torch' | 'mirror' | 'crystal' | 'glyph';
  power: number;
  resonance: string;
  icon: React.ComponentType<any>;
}

export type NavigationMode = 'overview' | 'ritual' | 'dream' | 'integration';
