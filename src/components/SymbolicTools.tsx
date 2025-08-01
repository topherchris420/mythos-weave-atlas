
import React from 'react';
import { SymbolicTool } from '@/types/mythos';

interface SymbolicToolsProps {
  activeTools: SymbolicTool[];
  selectedTool: SymbolicTool | null;
  setSelectedTool: (tool: SymbolicTool) => void;
}

export const SymbolicTools: React.FC<SymbolicToolsProps> = ({
  activeTools,
  selectedTool,
  setSelectedTool
}) => {
  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-3 sm:mb-4 text-center">Choose Your Tool</h3>
      <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:space-x-4 sm:gap-0">
        {activeTools.map(tool => {
          const ToolIcon = tool.icon;
          return (
            <div
              key={tool.id}
              className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all min-h-[80px] sm:min-h-auto touch-manipulation ${
                selectedTool?.id === tool.id
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/60 text-slate-600 hover:bg-white/80 hover:scale-102 active:scale-95'
              }`}
              onClick={() => setSelectedTool(tool)}
            >
              <ToolIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm text-center font-medium">{tool.name}</p>
              <div className="w-full bg-slate-200 rounded-full h-1 mt-1 sm:mt-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-indigo-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${tool.power * 10}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
