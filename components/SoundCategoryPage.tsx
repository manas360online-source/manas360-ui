
import React, { useState, useEffect, useRef } from 'react';
import { storageService } from '../utils/storageService';

interface Track {
  title: string;
  duration: string;
  url: string;
}

interface CategoryData {
  title: string;
  subtitle: string;
  image: string;
  tracks: Track[];
}

const CATEGORY_DATA: Record<string, CategoryData> = {
  beach: {
    title: "Ocean Peace",
    subtitle: "Rhythmic waves to soothe your soul",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2560&auto=format&fit=crop",
    tracks: [
      { title: "Relaxing Flute Waves", duration: "15:00", url: "/audio/beach/beach_part1.mp3" },
      { title: "Relaxing Flute Waves", duration: "15:00", url: "/audio/beach/beach_part2.mp3" },
      { title: "Relaxing Flute Waves", duration: "15:00", url: "/audio/beach/beach_part3.mp3" },
      { title: "Relaxing Flute Waves", duration: "15:27", url: "/audio/beach/beach_part4.mp3" }
    ]
  },
  mountain: {
    title: "Peak Calm",
    subtitle: "High altitude silence and clarity",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2560&auto=format&fit=crop",
    tracks: [
      { title: "Peaceful Breeze Meditation", duration: "15:00", url: "/audio/mountain/mountain_part1.mp3" },
      { title: "Peaceful Breeze Meditation", duration: "15:00", url: "/audio/mountain/mountain_part2.mp3" },
      { title: "Peaceful Breeze Meditation", duration: "15:00", url: "/audio/mountain/mountain_part3.mp3" },
      { title: "Peaceful Breeze Meditation", duration: "15:24", url: "/audio/mountain/mountain_part4.mp3" }
    ]
  },
  forest: {
    title: "Nature's Embrace",
    subtitle: "Nature sounds to reset your mind",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop",
    tracks: [
      { title: "Anti-Stress Indian Sitar Meditation", duration: "15:00", url: "/audio/forest/forest_part1.mp3" },
      { title: "Anti-Stress Indian Sitar Meditation", duration: "15:00", url: "/audio/forest/forest_part2.mp3" },
      { title: "Anti-Stress Indian Sitar Meditation", duration: "15:00", url: "/audio/forest/forest_part3.mp3" },
      { title: "Anti-Stress Indian Sitar Meditation", duration: "18:50", url: "/audio/forest/forest_part4.mp3" }
    ]
  },
  temple: {
    title: "Divine Frequency",
    subtitle: "Ancient vibrations for deep focus",
    image: "https://www.peakadventuretour.com/assets/imgs/famous-temples-south-india.webp", // Hindu Temple
    tracks: [
      { title: "Om Mani Padme Hum", duration: "03:57", url: "/audio/temple/om_mani_padme_hum.mp3" }
    ]
  }
};

interface SoundCategoryPageProps {
  category: string;
}

export const SoundCategoryPage: React.FC<SoundCategoryPageProps> = ({ category }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const data = CATEGORY_DATA[category];

  useEffect(() => {
    // Security Check: Redirect if free
    const plan = storageService.getSoundTherapyPlan();
    if (plan === 'free') {
      window.location.hash = '#/sound-therapy/plans';
    }
  }, [category]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (loadError) return;
        audioRef.current.play().catch(e => console.error("Playback failed. User interaction might be required."));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playTrack = (index: number) => {
    if (index < 0 || index >= data.tracks.length) return;
    
    setLoadError(false);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setCurrentTime(0);
    
    const url = data.tracks[index].url;
    console.log(`Playing: ${url}`);

    // Timeout to allow src update
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Playback failed. User interaction might be required."));
      }
    }, 100);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setLoadError(false);
    }
  };

  const onError = () => {
    setLoadError(true);
    setIsPlaying(false);
    console.error(`Audio file not found: ${data.tracks[currentTrackIndex].url}. Please ensure file exists in public/audio/...`);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || loadError) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleBack = () => {
    window.location.hash = '#/sound-therapy';
  };

  if (!data) return <div>Category not found</div>;

  return (
    <div className="min-h-screen bg-[#FDFCF8] relative transition-colors duration-500">
      
      {/* Background with Blur */}
      <div className="absolute inset-0 h-[60vh] overflow-hidden z-0">
        <img src={data.image} className="w-full h-full object-cover" alt={data.title} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FDFCF8]"></div>
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-4xl mx-auto">
        <button onClick={handleBack} className="text-white font-bold mb-8 flex items-center gap-2 hover:opacity-80 drop-shadow-md">
          ← Back to Sanctuary
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/50 mt-20 md:mt-32">
          
          <div className="text-center mb-10">
            <h1 className="font-serif text-[2.5rem] md:text-[4rem] text-[#0A3A78] leading-none mb-2">{data.title}</h1>
            <p className="text-slate-500 text-lg">{data.subtitle}</p>
          </div>

          {/* Main Player */}
          <div className="flex flex-col items-center mb-12">
            
            {/* Error Message */}
            {loadError && (
              <div className="w-full bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-center text-sm font-medium border border-red-100">
                ⚠️ Audio file not found. Please upload MP3 to public{data.tracks[currentTrackIndex].url}
              </div>
            )}

            {/* Progress Bar */}
            <div 
              ref={progressBarRef}
              className={`w-full bg-slate-200 h-2 rounded-full mb-2 relative overflow-hidden cursor-pointer group ${loadError ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={handleSeek}
            >
               <div 
                 className="absolute top-0 left-0 h-full bg-[#1FA2DE] transition-all duration-100 ease-linear"
                 style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
               ></div>
            </div>
            
            {/* Time Display */}
            <div className="w-full flex justify-between text-xs text-slate-400 font-medium mb-8">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-8">
              <button 
                onClick={() => playTrack((currentTrackIndex - 1 + data.tracks.length) % data.tracks.length)}
                className="text-3xl text-[#0A3A78] hover:opacity-70 transition-opacity"
                disabled={loadError}
              >
                ⏮
              </button>
              <button 
                onClick={handlePlayPause}
                className={`w-20 h-20 rounded-full bg-[#1FA2DE] text-white text-3xl flex items-center justify-center shadow-xl hover:scale-105 transition-transform ${loadError ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loadError}
              >
                {isPlaying && !loadError ? '⏸' : '▶'}
              </button>
              <button 
                onClick={() => playTrack((currentTrackIndex + 1) % data.tracks.length)}
                className="text-3xl text-[#0A3A78] hover:opacity-70 transition-opacity"
                disabled={loadError}
              >
                ⏭
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="font-bold text-[#0A3A78] text-lg">{data.tracks[currentTrackIndex].title}</p>
              <p className="text-slate-400 text-sm">Now Playing</p>
            </div>

            <audio 
              ref={audioRef}
              src={data.tracks[currentTrackIndex].url}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onError={onError}
              onEnded={() => playTrack((currentTrackIndex + 1) % data.tracks.length)}
            />
          </div>

          {/* Playlist */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm mb-4">Playlist</h3>
            <div className="space-y-2">
              {data.tracks.map((track, index) => (
                <div 
                  key={index}
                  onClick={() => playTrack(index)}
                  className={`p-4 rounded-2xl flex justify-between items-center cursor-pointer transition-all hover:bg-slate-50 ${currentTrackIndex === index ? 'bg-sky-50 border border-sky-100' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 font-serif text-lg w-6">{index + 1}.</span>
                    <span className={`font-medium ${currentTrackIndex === index ? 'text-[#1FA2DE]' : 'text-[#1A1A1A]'}`}>
                      {track.title}
                    </span>
                  </div>
                  <span className="text-slate-400 text-sm">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
