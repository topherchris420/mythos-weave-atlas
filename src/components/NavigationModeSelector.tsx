
import React from 'react';
import { Button } from '@/components/ui/button';
import { NavigationMode } from '@/types/mythos';
import { NAVIGATION_MODES } from '@/constants/mythos';

interface NavigationModeSelectorProps {
  navigationMode: NavigationMode;
  setNavigationMode: (mode: NavigationMode) => void;
}

export const NavigationModeSelector: React.FC<NavigationModeSelectorProps> = ({
  navigationMode,
  setNavigationMode
}) => {
  return (
    <div className="flex justify-center mb-6 sm:mb-8">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:space-x-2 sm:gap-0 bg-white/40 backdrop-blur-sm rounded-2xl p-2 shadow-lg max-w-full">
        {NAVIGATION_MODES.map(({ mode, icon: Icon, name }) => {
          const descriptions = {
            overview: 'Start here',
            ritual: 'Process emotions',
            dream: 'Unlock creativity', 
            integration: 'Find insights'
          };
          
          return (
            <Button
              key={mode}
              variant={navigationMode === mode ? "default" : "ghost"}
              onClick={() => setNavigationMode(mode as NavigationMode)}
              className={`rounded-full px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm min-h-[44px] flex flex-col sm:flex-row items-center ${
                navigationMode === mode 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4 sm:mr-2" />
              <div className="text-center sm:text-left">
                <span className="block text-xs sm:text-sm font-medium">{name}</span>
                <span className="hidden sm:block text-xs opacity-70">{descriptions[mode]}</span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
