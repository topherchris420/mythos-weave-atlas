
import React, { useState, useEffect } from 'react';
import { Eye, Compass, BookOpen, Sparkles, Moon, Sun, Star, Heart, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ArchetypalNode {
  id: string;
  title: string;
  type: 'guide' | 'wound' | 'threshold' | 'trial' | 'gift' | 'shadow' | 'ally' | 'treasure';
  description: string;
  intensity: number;
  connections: string[];
  position: { x: number; y: number };
  icon: React.ComponentType<any>;
  color: string;
  timestamp: Date;
}

interface JournalEntry {
  id: string;
  content: string;
  type: 'dream' | 'reflection' | 'emotion' | 'vision';
  timestamp: Date;
  extractedArchetypes: string[];
  emotionalResonance: number;
}

const ARCHETYPAL_THEMES = {
  guide: { icon: Eye, color: 'from-amber-400 to-yellow-600', name: 'The Guide' },
  wound: { icon: Heart, color: 'from-red-400 to-rose-600', name: 'The Wound' },
  threshold: { icon: Compass, color: 'from-purple-400 to-indigo-600', name: 'The Threshold' },
  trial: { icon: Shield, color: 'from-orange-400 to-red-600', name: 'The Trial' },
  gift: { icon: Star, color: 'from-green-400 to-emerald-600', name: 'The Gift' },
  shadow: { icon: Moon, color: 'from-slate-400 to-gray-600', name: 'The Shadow' },
  ally: { icon: Sun, color: 'from-blue-400 to-cyan-600', name: 'The Ally' },
  treasure: { icon: Sparkles, color: 'from-violet-400 to-purple-600', name: 'The Treasure' }
};

export const MythOSInterface = () => {
  const [activeTab, setActiveTab] = useState('mythos');
  const [nodes, setNodes] = useState<ArchetypalNode[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [entryType, setEntryType] = useState<'dream' | 'reflection' | 'emotion' | 'vision'>('reflection');
  const [selectedNode, setSelectedNode] = useState<ArchetypalNode | null>(null);
  const [mythicPrompt, setMythicPrompt] = useState('');

  // Simulate archetypal processing
  const processEntry = (content: string, type: string) => {
    const keywords = {
      guide: ['mentor', 'teacher', 'wisdom', 'guidance', 'elder', 'sage', 'advice'],
      wound: ['pain', 'hurt', 'loss', 'trauma', 'sadness', 'grief', 'broken'],
      threshold: ['decision', 'crossroads', 'change', 'beginning', 'door', 'portal', 'new'],
      trial: ['challenge', 'difficult', 'struggle', 'test', 'obstacle', 'fight', 'battle'],
      gift: ['breakthrough', 'discovery', 'talent', 'blessing', 'found', 'realized', 'gift'],
      shadow: ['dark', 'fear', 'hidden', 'secret', 'ashamed', 'denied', 'suppressed'],
      ally: ['friend', 'support', 'help', 'companion', 'together', 'partnership', 'team'],
      treasure: ['treasure', 'reward', 'achievement', 'success', 'valuable', 'precious', 'worth']
    };

    const detectedArchetypes: string[] = [];
    const lowerContent = content.toLowerCase();

    Object.entries(keywords).forEach(([archetype, words]) => {
      if (words.some(word => lowerContent.includes(word))) {
        detectedArchetypes.push(archetype);
      }
    });

    return detectedArchetypes;
  };

  const handleSubmitEntry = () => {
    if (!currentEntry.trim()) return;

    const extractedArchetypes = processEntry(currentEntry, entryType);
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry,
      type: entryType,
      timestamp: new Date(),
      extractedArchetypes,
      emotionalResonance: Math.random() * 10
    };

    setEntries(prev => [newEntry, ...prev]);

    // Create new nodes for detected archetypes
    extractedArchetypes.forEach(archetype => {
      if (!nodes.find(n => n.type === archetype as any)) {
        const theme = ARCHETYPAL_THEMES[archetype as keyof typeof ARCHETYPAL_THEMES];
        const newNode: ArchetypalNode = {
          id: `${archetype}-${Date.now()}`,
          title: theme.name,
          type: archetype as any,
          description: `A ${theme.name.toLowerCase()} has emerged in your narrative`,
          intensity: Math.random() * 10,
          connections: [],
          position: {
            x: Math.random() * 400 + 100,
            y: Math.random() * 300 + 100
          },
          icon: theme.icon,
          color: theme.color,
          timestamp: new Date()
        };
        setNodes(prev => [...prev, newNode]);
      }
    });

    // Generate mythic prompt
    if (extractedArchetypes.length > 0) {
      const prompts = [
        "The path reveals itself to those who dare to see...",
        "What gift lies hidden within this trial?",
        "The shadow speaks truths the light cannot illuminate...",
        "Every wound carries the seed of wisdom...",
        "The threshold awaits your conscious crossing..."
      ];
      setMythicPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }

    setCurrentEntry('');
  };

  const generateMythicInsight = () => {
    const insights = [
      "Your archetypal pattern suggests a period of integration approaching...",
      "The recurring themes point toward an unresolved threshold...",
      "Your shadow and light are seeking balance in this chapter...",
      "A guide energy is calling for your attention...",
      "The wound you carry may be your greatest teacher..."
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            MythOS
          </h1>
          <p className="text-xl text-purple-200 opacity-80">
            Navigate the Archetypal Landscape of Your Soul
          </p>
          {mythicPrompt && (
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-500/30">
              <p className="text-amber-200 italic">"{mythicPrompt}"</p>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-purple-500/30">
            <TabsTrigger value="mythos" className="data-[state=active]:bg-purple-600">
              <Compass className="w-4 h-4 mr-2" />
              Myth-Space
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-purple-600">
              <BookOpen className="w-4 h-4 mr-2" />
              Chronicle
            </TabsTrigger>
            <TabsTrigger value="resonance" className="data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Resonance
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600">
              <Eye className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Myth-Space Visualizer */}
          <TabsContent value="mythos" className="mt-6">
            <Card className="bg-slate-800/30 border-purple-500/30 p-6">
              <h2 className="text-2xl font-bold text-amber-200 mb-4">Your Archetypal Landscape</h2>
              <div className="relative w-full h-96 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg border border-purple-500/30 overflow-hidden">
                {nodes.map(node => {
                  const theme = ARCHETYPAL_THEMES[node.type];
                  const IconComponent = theme.icon;
                  return (
                    <div
                      key={node.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                      style={{ left: node.position.x, top: node.position.y }}
                      onClick={() => setSelectedNode(node)}
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${theme.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-slate-800/80 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {node.title}
                      </div>
                    </div>
                  );
                })}
                
                {nodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-purple-300">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Your mythic landscape awaits your first chronicle...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedNode && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-500/30">
                  <h3 className="text-xl font-bold text-amber-200">{selectedNode.title}</h3>
                  <p className="text-purple-200 mt-2">{selectedNode.description}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <Badge variant="outline" className="border-purple-400 text-purple-200">
                      Intensity: {selectedNode.intensity.toFixed(1)}
                    </Badge>
                    <Badge variant="outline" className="border-purple-400 text-purple-200">
                      {selectedNode.timestamp.toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Chronicle (Journal) */}
          <TabsContent value="journal" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/30 border-purple-500/30 p-6">
                <h2 className="text-2xl font-bold text-amber-200 mb-4">New Chronicle Entry</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-purple-200">Entry Type</Label>
                    <select
                      value={entryType}
                      onChange={(e) => setEntryType(e.target.value as any)}
                      className="w-full p-2 bg-slate-700 border border-purple-500/30 rounded text-white mt-1"
                    >
                      <option value="reflection">Reflection</option>
                      <option value="dream">Dream</option>
                      <option value="emotion">Emotional Log</option>
                      <option value="vision">Vision</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-purple-200">Chronicle</Label>
                    <Textarea
                      value={currentEntry}
                      onChange={(e) => setCurrentEntry(e.target.value)}
                      placeholder="Write your experience, dream, or reflection here... Let the archetypal patterns emerge through your words."
                      className="min-h-32 bg-slate-700 border-purple-500/30 text-white placeholder-purple-300 mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitEntry}
                    disabled={!currentEntry.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Chronicle Experience
                  </Button>
                </div>
              </Card>

              <Card className="bg-slate-800/30 border-purple-500/30 p-6">
                <h2 className="text-2xl font-bold text-amber-200 mb-4">Recent Chronicles</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {entries.map(entry => (
                    <div key={entry.id} className="p-4 bg-slate-700/50 rounded-lg border border-purple-500/20">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="border-purple-400 text-purple-200 capitalize">
                          {entry.type}
                        </Badge>
                        <span className="text-xs text-purple-300">
                          {entry.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-purple-100 text-sm mb-2 line-clamp-3">
                        {entry.content}
                      </p>
                      {entry.extractedArchetypes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.extractedArchetypes.map(archetype => {
                            const theme = ARCHETYPAL_THEMES[archetype as keyof typeof ARCHETYPAL_THEMES];
                            return (
                              <Badge key={archetype} variant="secondary" className="text-xs bg-purple-600/50">
                                {theme.name}
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                  {entries.length === 0 && (
                    <div className="text-center text-purple-300 py-8">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Begin your chronicle to see archetypal patterns emerge...</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Resonance Patterns */}
          <TabsContent value="resonance" className="mt-6">
            <Card className="bg-slate-800/30 border-purple-500/30 p-6">
              <h2 className="text-2xl font-bold text-amber-200 mb-4">Archetypal Resonance Patterns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(ARCHETYPAL_THEMES).map(([key, theme]) => {
                  const IconComponent = theme.icon;
                  const count = entries.filter(e => e.extractedArchetypes.includes(key)).length;
                  const intensity = count > 0 ? (count / entries.length) * 10 : 0;
                  
                  return (
                    <div key={key} className={`p-4 rounded-lg bg-gradient-to-br ${theme.color} bg-opacity-20 border border-purple-500/30`}>
                      <div className="flex items-center mb-2">
                        <IconComponent className="w-6 h-6 text-amber-200 mr-2" />
                        <h3 className="font-bold text-white">{theme.name}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-200">Frequency</span>
                          <span className="text-amber-200">{count}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${theme.color}`}
                            style={{ width: `${(intensity / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Mythic Insights */}
          <TabsContent value="insights" className="mt-6">
            <Card className="bg-slate-800/30 border-purple-500/30 p-6">
              <h2 className="text-2xl font-bold text-amber-200 mb-4">Mythic Guidance</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-amber-800/30 to-yellow-800/30 rounded-lg border border-amber-500/30">
                  <h3 className="text-lg font-bold text-amber-200 mb-2">Current Archetypal Phase</h3>
                  <p className="text-amber-100">
                    {entries.length > 0 
                      ? generateMythicInsight()
                      : "Your journey begins with the first chronicle. Every hero's path starts with a single step into the unknown."
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-500/30">
                    <h3 className="text-lg font-bold text-purple-200 mb-2">Narrative Arc Status</h3>
                    <p className="text-purple-100 text-sm">
                      {nodes.length === 0 && "Awaiting emergence..."}
                      {nodes.length > 0 && nodes.length < 3 && "Early formation stage - patterns beginning to crystallize"}
                      {nodes.length >= 3 && nodes.length < 6 && "Active development - multiple archetypal forces at play"}
                      {nodes.length >= 6 && "Rich mythic landscape - deep integration phase"}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-800/30 to-green-800/30 rounded-lg border border-emerald-500/30">
                    <h3 className="text-lg font-bold text-emerald-200 mb-2">Integration Opportunity</h3>
                    <p className="text-emerald-100 text-sm">
                      {entries.length === 0 && "Chronicle your first experience to begin the integration process"}
                      {entries.length > 0 && "Continue chronicling to deepen the archetypal understanding of your path"}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-rose-800/30 to-pink-800/30 rounded-lg border border-rose-500/30">
                  <h3 className="text-lg font-bold text-rose-200 mb-2">Symbolic Invitation</h3>
                  <p className="text-rose-100 italic">
                    "The soul speaks in symbols, dreams in archetypes, and heals through story. What myth are you living, and how consciously are you authoring it?"
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
