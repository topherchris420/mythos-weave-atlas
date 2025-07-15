
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
        {NAVIGATION_MODES.map(({ mode, icon: Icon, name }) => (
          <Button
            key={mode}
            variant={navigationMode === mode ? "default" : "ghost"}
            onClick={() => setNavigationMode(mode as NavigationMode)}
            className={`rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm min-h-[44px] ${
              navigationMode === mode 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <Icon className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
