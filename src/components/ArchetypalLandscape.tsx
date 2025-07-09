
import React from 'react';
import { Sparkles } from 'lucide-react';
import { ArchetypalLandform } from '@/types/mythos';

interface ArchetypalLandscapeProps {
  landforms: ArchetypalLandform[];
  onGlyphCarving: (x: number, y: number) => void;
  onLandformSelect: (landform: ArchetypalLandform) => void;
}

export const ArchetypalLandscape: React.FC<ArchetypalLandscapeProps> = ({
  landforms,
  onGlyphCarving,
  onLandformSelect
}) => {
  return (
    <div 
      className="relative w-full h-96 bg-gradient-to-br from-white/80 to-purple-50/80 rounded-lg border-2 border-purple-200/30 overflow-hidden cursor-crosshair shadow-inner"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        onGlyphCarving(x, y);
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
              onLandformSelect(landform);
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
  );
};
