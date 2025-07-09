
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
    <div className="flex justify-center mb-8">
      <div className="flex space-x-2 bg-white/40 backdrop-blur-sm rounded-full p-2 shadow-lg">
        {NAVIGATION_MODES.map(({ mode, icon: Icon, name }) => (
          <Button
            key={mode}
            variant={navigationMode === mode ? "default" : "ghost"}
            onClick={() => setNavigationMode(mode as NavigationMode)}
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
  );
};
