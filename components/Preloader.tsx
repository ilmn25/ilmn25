
import React, { useState, useEffect, useRef } from 'react';
import { ILLUSTRATIONS } from '../data/illustrations';
import { GAME_GALLERY, GAME_FEATURES } from '../data/unityProject';
import { TUTOR_GALLERY, TUTOR_FEATURES } from '../data/tutorProject';
import { DISCORD_GALLERY } from '../data/discordTool';
import { WORKFLOW_STEPS } from '../data/spaTree';
import { PERSONAL_INFO } from '../constants';

const BOOT_DURATION = 1200; // Fast 1.2s "boot" animation
const BATCH_SIZE = 3; // Conservative batching to avoid stuttering during browsing

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const hasTriggeredComplete = useRef(false);

  useEffect(() => {
    // 1. Gather all assets into a single background queue
    const allAssets = [
      PERSONAL_INFO.avatar,
      ...GAME_FEATURES.map(f => f.media.thumbnailUrl),
      ...TUTOR_FEATURES.map(f => f.image),
      ...WORKFLOW_STEPS.map(s => s.imageUrl),
      ...ILLUSTRATIONS.colored,
      ...ILLUSTRATIONS.sketches,
      ...GAME_GALLERY,
      ...TUTOR_GALLERY,
      ...DISCORD_GALLERY,
    ].filter((url): url is string => typeof url === 'string');

    const uniqueAssets = Array.from(new Set(allAssets));

    // 2. Simulated fast "System Check" progress
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(Math.round((elapsed / BOOT_DURATION) * 100), 100);
      
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        triggerComplete();
      }
    }, 16);

    const triggerComplete = () => {
      if (hasTriggeredComplete.current) return;
      hasTriggeredComplete.current = true;
      
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 600);
      }, 200);

      // Start the heavy lifting silently in the background AFTER the user has "entered"
      startBackgroundLoading(uniqueAssets);
    };

    const startBackgroundLoading = async (urls: string[]) => {
      const queue = [...urls];
      // Small delay to let the initial page render settle
      await new Promise(r => setTimeout(r, 1000));
      
      while (queue.length > 0) {
        const batch = queue.splice(0, BATCH_SIZE);
        await Promise.all(batch.map(url => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = resolve; // Continue even on broken links
          });
        }));
        // Breathe between batches to keep main thread smooth for user interactions
        await new Promise(r => setTimeout(r, 300));
      }
    };

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center w-64">
        <div className="mb-10 relative flex items-center justify-center">
          <div className="absolute w-20 h-20 border border-slate-100 rounded-full"></div>
          <div 
            className="absolute w-20 h-20 border border-slate-900 rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: '0.8s' }}
          ></div>
          <span className="text-sm font-bold text-slate-900 font-mono tracking-tighter">
            {progress}%
          </span>
        </div>
        
        <div className="w-full text-center space-y-3">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-900 font-bold">
            {progress < 100 ? 'booting' : 'ready'}
          </h2>
          <div className="w-full bg-slate-50 h-[1px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">
            {progress < 50 ? 'Initializing Environment' : 'Preparing Layout Engine'}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-[9px] font-mono text-slate-200 uppercase tracking-[0.3em]">
        illu's portfolio v2
      </div>
    </div>
  );
};

export default Preloader;
