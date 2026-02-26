import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JournalEntry } from '@/types/mythos';
import { useJournal } from '@/hooks/useJournal';
import { BookOpen, Moon, Lightbulb, Flame, Heart, Plus, Trash2, Edit3, Search, Calendar, X } from 'lucide-react';

// Entry type icons and colors
const TYPE_CONFIG = {
  dream: { icon: Moon, color: 'bg-indigo-100 text-indigo-700 border-indigo-200', label: 'Dream' },
  insight: { icon: Lightbulb, color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Insight' },
  ritual: { icon: Flame, color: 'bg-orange-100 text-orange-700 border-orange-200', label: 'Ritual' },
  integration: { icon: Heart, color: 'bg-rose-100 text-rose-700 border-rose-200', label: 'Integration' },
  general: { icon: BookOpen, color: 'bg-slate-100 text-slate-700 border-slate-200', label: 'General' }
};

// Mood colors
const MOOD_COLORS: Record<string, string> = {
  clarity: 'bg-blue-100 text-blue-700',
  turbulence: 'bg-gray-100 text-gray-700',
  growth: 'bg-green-100 text-green-700',
  shadow: 'bg-purple-100 text-purple-700',
  peace: 'bg-cyan-100 text-cyan-700',
  conflict: 'bg-red-100 text-red-700',
  breakthrough: 'bg-yellow-100 text-yellow-700'
};

interface JournalProps {
  compact?: boolean;
}

export const Journal: React.FC<JournalProps> = ({ compact = false }) => {
  const { entries, createEntry, updateEntry, deleteEntry, getDreamEntries, getInsightEntries, searchEntries } = useJournal();

  const [isOpen, setIsOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Form state
  const [formType, setFormType] = useState<JournalEntry['type']>('general');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formMood, setFormMood] = useState<JournalEntry['mood'] | ''>('');

  const filteredEntries = searchQuery
    ? searchEntries(searchQuery)
    : activeTab === 'all'
      ? entries
      : activeTab === 'dreams'
        ? getDreamEntries()
        : activeTab === 'insights'
          ? getInsightEntries()
          : entries.filter(e => e.type === activeTab);

  const handleSubmit = () => {
    if (!formTitle.trim() || !formContent.trim()) return;

    if (editingEntry) {
      updateEntry(editingEntry.id, {
        title: formTitle,
        content: formContent,
        mood: formMood || undefined
      });
    } else {
      createEntry(formType, formTitle, formContent, formMood || undefined);
    }

    resetForm();
    setIsOpen(false);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormType(entry.type);
    setFormTitle(entry.title);
    setFormContent(entry.content);
    setFormMood(entry.mood || '');
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id);
    }
  };

  const resetForm = () => {
    setEditingEntry(null);
    setFormType('general');
    setFormTitle('');
    setFormContent('');
    setFormMood('');
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (compact) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Journal
          </h3>
          <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-1" /> New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingEntry ? 'Edit Entry' : 'New Journal Entry'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={formType} onValueChange={(v) => setFormType(v as JournalEntry['type'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TYPE_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Write your thoughts, dreams, insights..."
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mood (optional)</label>
                  <Select value={formMood} onValueChange={(v) => setFormMood(v as JournalEntry['mood'])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mood..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {Object.keys(MOOD_COLORS).map((mood) => (
                        <SelectItem key={mood} value={mood}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
                  {editingEntry ? 'Save Changes' : 'Create Entry'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries..."
            className="pl-9"
          />
        </div>

        {/* Entry Count */}
        <p className="text-sm text-slate-500 mb-3">{entries.length} entries total</p>

        {/* Entry List */}
        <ScrollArea className="h-[300px] pr-4">
          {filteredEntries.length === 0 ? (
            <p className="text-center text-slate-400 py-8">No entries yet. Start journaling!</p>
          ) : (
            <div className="space-y-3">
              {filteredEntries.map((entry) => {
                const config = TYPE_CONFIG[entry.type];
                const Icon = config.icon;
                return (
                  <div
                    key={entry.id}
                    className="p-3 bg-white/50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-md ${config.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <h4 className="font-medium text-slate-700 text-sm">{entry.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(entry)}>
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleDelete(entry.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">{entry.content}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(entry.createdAt)}
                      </span>
                      {entry.mood && (
                        <Badge className={`${MOOD_COLORS[entry.mood]} text-[10px] h-5`}>
                          {entry.mood}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </Card>
    );
  }

  // Full version with tabs
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-700 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Journal & Dream Log
        </h2>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" /> New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingEntry ? 'Edit Entry' : 'New Journal Entry'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={formType} onValueChange={(v) => setFormType(v as JournalEntry['type'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPE_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Give your entry a title..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write your thoughts, dreams, insights..."
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mood (optional)</label>
                <Select value={formMood} onValueChange={(v) => setFormMood(v as JournalEntry['mood'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {Object.keys(MOOD_COLORS).map((mood) => (
                      <SelectItem key={mood} value={mood}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
                {editingEntry ? 'Save Changes' : 'Create Entry'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-white/50">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="dreams">Dreams</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="ritual">Ritual</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your journal..."
          className="pl-9"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {Object.entries(TYPE_CONFIG).map(([key, config]) => {
          const Icon = config.icon;
          const count = entries.filter(e => e.type === key).length;
          return (
            <div key={key} className="text-center p-3 bg-white/30 rounded-lg">
              <Icon className="w-5 h-5 mx-auto mb-1 text-slate-600" />
              <p className="text-2xl font-bold text-slate-700">{count}</p>
              <p className="text-xs text-slate-500">{config.label}</p>
            </div>
          );
        })}
      </div>

      {/* Entry List */}
      <ScrollArea className="h-[400px] pr-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-400">No entries yet. Start your journey of self-discovery!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => {
              const config = TYPE_CONFIG[entry.type];
              const Icon = config.icon;
              return (
                <div
                  key={entry.id}
                  className="p-4 bg-white/50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`p-2 rounded-lg ${config.color}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-700">{entry.title}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(entry.createdAt)}
                          {entry.updatedAt && entry.updatedAt !== entry.createdAt && (
                            <span className="ml-2">(edited)</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(entry.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-slate-600 whitespace-pre-wrap mb-3">{entry.content}</p>
                  {entry.mood && (
                    <Badge className={`${MOOD_COLORS[entry.mood]}`}>
                      {entry.mood}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};
