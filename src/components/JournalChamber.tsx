import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Moon,
  Lightbulb,
  Sparkles,
  Heart,
  Trash2,
  Edit3,
  Plus,
  Search,
  Clock,
  ChevronRight
} from 'lucide-react';
import { JournalEntry } from '@/types/mythos';
import { useJournal } from '@/hooks/useJournal';

type EntryType = JournalEntry['type'];
type EntryMood = JournalEntry['mood'];

const TYPE_CONFIG: Record<EntryType, { icon: React.ReactNode; label: string; color: string }> = {
  dream: { icon: <Moon className="w-4 h-4" />, label: 'Dream', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  insight: { icon: <Lightbulb className="w-4 h-4" />, label: 'Insight', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  ritual: { icon: <Sparkles className="w-4 h-4" />, label: 'Ritual', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  integration: { icon: <Heart className="w-4 h-4" />, label: 'Integration', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  general: { icon: <BookOpen className="w-4 h-4" />, label: 'General', color: 'bg-slate-100 text-slate-800 border-slate-200' },
};

const MOOD_OPTIONS: { value: EntryMood; label: string; color: string }[] = [
  { value: 'clarity', label: 'Clarity', color: 'bg-blue-500' },
  { value: 'turbulence', label: 'Turbulence', color: 'bg-orange-500' },
  { value: 'growth', label: 'Growth', color: 'bg-green-500' },
  { value: 'shadow', label: 'Shadow', color: 'bg-slate-700' },
  { value: 'peace', label: 'Peace', color: 'bg-cyan-500' },
  { value: 'conflict', label: 'Conflict', color: 'bg-red-500' },
  { value: 'breakthrough', label: 'Breakthrough', color: 'bg-yellow-500' },
];

interface JournalChamberProps {
  onEntryCreated?: (entry: JournalEntry) => void;
}

export const JournalChamber: React.FC<JournalChamberProps> = ({ onEntryCreated }) => {
  const {
    entries,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntriesByType,
    searchEntries,
    getTotalEntries
  } = useJournal();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<EntryType | 'all'>('all');

  // Form state
  const [entryType, setEntryType] = useState<EntryType>('dream');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<EntryMood | ''>('');

  const resetForm = () => {
    setEntryType('dream');
    setTitle('');
    setContent('');
    setMood('');
    setEditingEntry(null);
  };

  const handleOpenDialog = (entry?: JournalEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setEntryType(entry.type);
      setTitle(entry.title);
      setContent(entry.content);
      setMood(entry.mood || '');
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingEntry) {
      updateEntry(editingEntry.id, {
        title: title.trim(),
        content: content.trim(),
        mood: mood || undefined
      });
    } else {
      const newEntry = createEntry(
        entryType,
        title.trim(),
        content.trim(),
        mood || undefined
      );
      onEntryCreated?.(newEntry);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
  };

  // Filter and search entries
  const filteredEntries = searchQuery
    ? searchEntries(searchQuery)
    : filterType === 'all'
      ? entries
      : getEntriesByType(filterType);

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

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-700">Journal & Dream Log</h2>
          <Badge variant="secondary" className="ml-2">
            {getTotalEntries()} entries
          </Badge>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Entry</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
              </DialogTitle>
              <DialogDescription>
                {editingEntry
                  ? 'Update your thoughts and reflections.'
                  : 'Record your dreams, insights, and experiences.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Entry Type */}
              <div className="space-y-2">
                <Label>Entry Type</Label>
                <Select
                  value={entryType}
                  onValueChange={(v) => setEntryType(v as EntryType)}
                  disabled={!!editingEntry}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPE_CONFIG).map(([type, config]) => (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          {config.icon}
                          {config.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your entry..."
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your dream, insight, or reflection..."
                  className="min-h-[200px]"
                />
              </div>

              {/* Mood */}
              <div className="space-y-2">
                <Label>Mood (optional)</Label>
                <Select
                  value={mood}
                  onValueChange={(v) => setMood(v as EntryMood)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MOOD_OPTIONS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${m.color}`} />
                          {m.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!title.trim() || !content.trim()}
              >
                {editingEntry ? 'Save Changes' : 'Create Entry'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries..."
            className="pl-10"
          />
        </div>
        <Select
          value={filterType}
          onValueChange={(v) => setFilterType(v as EntryType | 'all')}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(TYPE_CONFIG).map(([type, config]) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center gap-2">
                  {config.icon}
                  {config.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Entry List */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No entries yet</p>
          <p className="text-sm">Start documenting your journey by creating a new entry.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((entry) => {
            const config = TYPE_CONFIG[entry.type];
            const moodConfig = MOOD_OPTIONS.find((m) => m.value === entry.mood);

            return (
              <div
                key={entry.id}
                className="group relative bg-white/70 rounded-lg border border-purple-100 p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Type Badge and Date */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${config.color} border`}>
                        <span className="mr-1">{config.icon}</span>
                        {config.label}
                      </Badge>
                      {moodConfig && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <div className={`w-2 h-2 rounded-full ${moodConfig.color}`} />
                          {moodConfig.label}
                        </div>
                      )}
                      <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(entry.createdAt)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-slate-700 mb-1 truncate">
                      {entry.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {entry.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(entry)}
                      className="h-8 w-8"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(entry.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
