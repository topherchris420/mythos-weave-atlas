import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Square, Music2 } from 'lucide-react';

// Simple ambient soundscapes using Web Audio API (no external assets)
// Modes:
// - focus: white noise through lowpass (brown-ish)
// - calm: soft sine pad
// - flow: white noise through bandpass for airy texture

type SoundscapeMode = 'focus' | 'calm' | 'flow';

export const Soundscapes: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<SoundscapeMode>('focus');
  const [volume, setVolume] = useState<number>(0.5);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const createNoiseBuffer = (ctx: AudioContext) => {
    const duration = 2; // seconds
    const sampleRate = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1; // white noise
    }
    return buffer;
  };

  const teardown = async () => {
    try {
      noiseSourceRef.current?.stop();
    } catch {}
    try {
      oscRef.current?.stop();
    } catch {}
    noiseSourceRef.current?.disconnect();
    oscRef.current?.disconnect();
    filterRef.current?.disconnect();
    gainRef.current?.disconnect();

    noiseSourceRef.current = null;
    oscRef.current = null;
    filterRef.current = null;
    gainRef.current = null;

    if (audioCtxRef.current) {
      try {
        await audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
    }
  };

  const buildGraph = (ctx: AudioContext, currentMode: SoundscapeMode) => {
    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    if (currentMode === 'calm') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 174; // Solfeggio-ish soothing tone
      osc.connect(gain);
      osc.start();
      oscRef.current = osc;
    } else {
      const noiseBuffer = createNoiseBuffer(ctx);
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      if (currentMode === 'focus') {
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 0.7;
      } else {
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 1.2;
      }

      noise.connect(filter);
      filter.connect(gain);
      noise.start();

      noiseSourceRef.current = noise;
      filterRef.current = filter;
    }
  };

  const handlePlay = async () => {
    if (isPlaying) {
      await teardown();
      setIsPlaying(false);
      return;
    }

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;
    await ctx.resume();
    buildGraph(ctx, mode);
    setIsPlaying(true);
  };

  const handleModeChange = async (nextMode: SoundscapeMode) => {
    setMode(nextMode);
    // Rebuild graph live if playing
    if (audioCtxRef.current && isPlaying) {
      const ctx = audioCtxRef.current;
      // Stop sources but keep context
      try { noiseSourceRef.current?.stop(); } catch {}
      try { oscRef.current?.stop(); } catch {}
      noiseSourceRef.current?.disconnect();
      oscRef.current?.disconnect();
      filterRef.current?.disconnect();
      gainRef.current && gainRef.current.disconnect();

      // Recreate gain and chain
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      buildGraph(ctx, nextMode);
    }
  };

  const handleVolume = (val: number) => {
    setVolume(val);
    if (gainRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(val, (audioCtxRef.current?.currentTime || 0) + 0.05);
    }
  };

  useEffect(() => {
    return () => {
      teardown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-purple-200/30 shadow-xl p-4">
      <section aria-label="Soundscapes player">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Music2 className="w-5 h-5 text-slate-700" />
            <h3 className="text-base font-semibold text-slate-700">Soundscapes</h3>
          </div>
          <div className="flex items-center gap-3">
            <select
              aria-label="Soundscape mode"
              value={mode}
              onChange={(e) => handleModeChange(e.target.value as SoundscapeMode)}
              className="rounded-md border border-purple-200/50 bg-white/70 px-2 py-1 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="focus">Focus (Brown Noise)</option>
              <option value="calm">Calm (Sine Pad)</option>
              <option value="flow">Flow (Airy)</option>
            </select>
            <div className="w-32">
              <Slider
                aria-label="Volume"
                value={[Math.round(volume * 100)]}
                onValueChange={(v) => handleVolume((v?.[0] ?? 50) / 100)}
                max={100}
                step={1}
              />
            </div>
            <Button
              onClick={handlePlay}
              variant={isPlaying ? 'destructive' : 'default'}
              className="min-w-[96px]"
              aria-label={isPlaying ? 'Stop soundscape' : 'Play soundscape'}
            >
              {isPlaying ? (
                <span className="flex items-center gap-2"><Square className="w-4 h-4" /> Stop</span>
              ) : (
                <span className="flex items-center gap-2"><Play className="w-4 h-4" /> Play</span>
              )}
            </Button>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Regulate your nervous system and open creative channels with gentle, non-intrusive ambience.
        </p>
      </section>
    </Card>
  );
};
