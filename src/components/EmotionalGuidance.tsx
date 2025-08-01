import React from 'react';
import { Card } from '@/components/ui/card';
import { PsychicState } from '@/types/mythos';
import { Heart, Brain, Lightbulb, Target } from 'lucide-react';

interface EmotionalGuidanceProps {
  psychicState: PsychicState;
}

export const EmotionalGuidance: React.FC<EmotionalGuidanceProps> = ({ psychicState }) => {
  const getGuidanceMessage = () => {
    const { clarity, turbulence, growth, integration } = psychicState;
    
    if (turbulence > 7) {
      return {
        icon: Heart,
        message: "You're feeling overwhelmed. Try the ritual space to process these emotions.",
        color: "text-red-600",
        bg: "bg-red-50"
      };
    } else if (clarity < 4) {
      return {
        icon: Brain,
        message: "Your mind feels foggy. The dream space can help unlock new perspectives.",
        color: "text-blue-600", 
        bg: "bg-blue-50"
      };
    } else if (growth > 7) {
      return {
        icon: Lightbulb,
        message: "You're in a creative flow state. Perfect time to explore and create.",
        color: "text-green-600",
        bg: "bg-green-50"
      };
    } else if (integration < 4) {
      return {
        icon: Target,
        message: "Time to connect the dots. Visit the integration chamber for insights.",
        color: "text-purple-600",
        bg: "bg-purple-50"
      };
    }
    
    return {
      icon: Heart,
      message: "You're in a balanced state. Perfect time for exploration and discovery.",
      color: "text-slate-600",
      bg: "bg-slate-50"
    };
  };

  const guidance = getGuidanceMessage();
  const GuidanceIcon = guidance.icon;

  return (
    <Card className={`${guidance.bg} border-l-4 border-l-purple-400 p-4 mb-6`}>
      <div className="flex items-center space-x-3">
        <GuidanceIcon className={`w-6 h-6 ${guidance.color}`} />
        <p className={`text-sm font-medium ${guidance.color}`}>
          {guidance.message}
        </p>
      </div>
    </Card>
  );
};