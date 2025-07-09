
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
  );
};
