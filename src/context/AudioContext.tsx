import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { PodcastEpisode } from '../types';
import { PODCAST_EPISODES } from '../data/podcasts';

interface AudioContextType {
  currentEpisode: PodcastEpisode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  isMiniPlayerVisible: boolean;
  playEpisode: (episode: PodcastEpisode, autoPlay?: boolean) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (seconds: number) => void;
  skip: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  closeMiniPlayer: () => void;
  openMiniPlayer: () => void;
  downloadEpisode: (episode: PodcastEpisode) => void;
  isSynthesizedFallbackActive: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to first episode ready in player
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(PODCAST_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(PODCAST_EPISODES[0]?.durationSeconds || 1725);
  const [playbackRate, setPlaybackRateState] = useState<number>(1);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState<boolean>(false);
  const [isSynthesizedFallbackActive, setIsSynthesizedFallbackActive] = useState<boolean>(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const webAudioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Initialize native HTML audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioElementRef.current = audio;

    const handleTimeUpdate = () => {
      if (!isSynthesizedFallbackActive) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      stopFallbackSynth();
    };

    const handleError = () => {
      // Audio placeholder file wasn't found on disk (404), activate pleasant ambient acoustic fallback
      if (isPlaying) {
        startFallbackSynth();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      stopFallbackSynth();
    };
  }, []);

  // Web Audio ambient soundscape synthesizer (so user hears actual audio even with placeholder MP3s)
  const startFallbackSynth = () => {
    try {
      setIsSynthesizedFallbackActive(true);
      if (!webAudioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        webAudioCtxRef.current = new AudioCtxClass();
      }
      const ctx = webAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (ambientOscillatorRef.current) {
        ambientOscillatorRef.current.stop();
        ambientOscillatorRef.current.disconnect();
      }

      // Create a gentle warm sine/triangle wave with subtle tremolo for desert ambient feel
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.value = 320;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(146.83, ctx.currentTime); // D3 warm fundamental

      gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.12, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      ambientOscillatorRef.current = osc;
      ambientGainRef.current = gain;

      // Timer ticker for simulated playback progression
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const targetDuration = currentEpisode?.durationSeconds || 1725;
          if (prev >= targetDuration) {
            setIsPlaying(false);
            stopFallbackSynth();
            return 0;
          }
          return prev + 1 * playbackRate;
        });
      }, 1000);
    } catch {
      // Fallback gracefully if Web Audio is blocked
    }
  };

  const stopFallbackSynth = () => {
    setIsSynthesizedFallbackActive(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (ambientGainRef.current && webAudioCtxRef.current) {
      try {
        ambientGainRef.current.gain.setValueAtTime(0, webAudioCtxRef.current.currentTime);
      } catch {
        // ignore
      }
    }
    if (ambientOscillatorRef.current) {
      try {
        ambientOscillatorRef.current.stop();
        ambientOscillatorRef.current.disconnect();
      } catch {
        // ignore
      }
      ambientOscillatorRef.current = null;
    }
  };

  const playEpisode = (episode: PodcastEpisode, autoPlay = true) => {
    if (currentEpisode?.id !== episode.id) {
      setCurrentEpisode(episode);
      setCurrentTime(0);
      setDuration(episode.durationSeconds);
      setIsMiniPlayerVisible(true);

      if (audioElementRef.current) {
        audioElementRef.current.src = episode.audioUrl;
        audioElementRef.current.currentTime = 0;
        audioElementRef.current.playbackRate = playbackRate;
        audioElementRef.current.volume = isMuted ? 0 : volume;

        if (autoPlay) {
          setIsPlaying(true);
          const playPromise = audioElementRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Real file missing, switch to seamless ambient soundscape
              startFallbackSynth();
            });
          }
        }
      }
    } else {
      if (autoPlay && !isPlaying) {
        togglePlay();
      }
      setIsMiniPlayerVisible(true);
    }
  };

  const togglePlay = () => {
    if (!currentEpisode) return;
    setIsMiniPlayerVisible(true);

    if (isPlaying) {
      setIsPlaying(false);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      stopFallbackSynth();
    } else {
      setIsPlaying(true);
      if (audioElementRef.current) {
        if (!audioElementRef.current.src || !audioElementRef.current.src.includes(currentEpisode.audioUrl)) {
          audioElementRef.current.src = currentEpisode.audioUrl;
        }
        audioElementRef.current.playbackRate = playbackRate;
        audioElementRef.current.volume = isMuted ? 0 : volume;
        const playPromise = audioElementRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            startFallbackSynth();
          });
        }
      } else {
        startFallbackSynth();
      }
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    stopFallbackSynth();
  };

  const seek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    if (audioElementRef.current && !isSynthesizedFallbackActive) {
      audioElementRef.current.currentTime = clamped;
    }
  };

  const skip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
    seek(newTime);
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : clamped;
    }
    if (ambientGainRef.current && webAudioCtxRef.current) {
      ambientGainRef.current.gain.setValueAtTime(isMuted ? 0 : clamped * 0.12, webAudioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioElementRef.current) {
      audioElementRef.current.volume = nextMuted ? 0 : volume;
    }
    if (ambientGainRef.current && webAudioCtxRef.current) {
      ambientGainRef.current.gain.setValueAtTime(nextMuted ? 0 : volume * 0.12, webAudioCtxRef.current.currentTime);
    }
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = rate;
    }
  };

  const closeMiniPlayer = () => {
    setIsMiniPlayerVisible(false);
  };

  const openMiniPlayer = () => {
    setIsMiniPlayerVisible(true);
  };

  const downloadEpisode = (episode: PodcastEpisode) => {
    // Generate a downloadable text/audio package representation for the user
    const content = `WANDER & TALK PODCAST
${episode.title}
Duration: ${episode.duration}
Location: ${episode.locationName}
Published: ${episode.publishedAt}

Description:
${episode.description}

Show Notes:
${episode.showNotes.join('\n')}

Audio Source:
${episode.audioUrl}

---
Thank you for listening to Wander & Talk. Connect at wanderandtalk.fm`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Wander-and-Talk-${episode.id}-${episode.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        volume,
        isMuted,
        isMiniPlayerVisible,
        playEpisode,
        togglePlay,
        pause,
        seek,
        skip,
        setVolume,
        toggleMute,
        setPlaybackRate,
        closeMiniPlayer,
        openMiniPlayer,
        downloadEpisode,
        isSynthesizedFallbackActive
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Utility format helper for 00:00 display
export const formatDuration = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  return `${formattedMins}:${formattedSecs}`;
};
