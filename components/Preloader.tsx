
import React, { useState, useEffect, useRef } from 'react';
import { ILLUSTRATIONS } from '../data/illustrations';
import { GAME_GALLERY, GAME_FEATURES } from '../data/unityProject';
import { TUTOR_GALLERY, TUTOR_FEATURES } from '../data/tutorProject';
import { DISCORD_GALLERY } from '../data/discordTool';
import { WORKFLOW_STEPS } from '../data/spaTree';
import { PERSONAL_INFO } from '../constants';

const BATCH_SIZE = 16; // Parallel load batches to balance speed and browser performance
const MAX_LOAD_TIME = 6000; // 6 seconds time limit

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const hasTriggeredComplete = useRef(false);

  useEffect(() => {
    // 1. Gather all assets that MUST be loaded before showing the page
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
    const totalAssets = uniqueAssets.length;
    let loadedCount = 0;

    const triggerComplete = () => {
      if (hasTriggeredComplete.current) return;
      hasTriggeredComplete.current = true;
      
      setProgress(100);
      
      // Small visual buffer so the user sees 100% for a moment
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 600);
      }, 800);
    };

    // 6-second safety timeout
    const timeoutId = setTimeout(() => {
      if (!hasTriggeredComplete.current) {
        console.warn('Preloader: Asset loading timed out after 6 seconds. Proceeding to app.');
        triggerComplete();
      }
    }, MAX_LOAD_TIME);

    const loadAssets = async () => {
      if (totalAssets === 0) {
        triggerComplete();
        return;
      }

      const queue = [...uniqueAssets];
      
      // Process in batches to prevent browser lock-up and maximize throughput
      while (queue.length > 0 && !hasTriggeredComplete.current) {
        const batch = queue.splice(0, BATCH_SIZE);
        await Promise.all(batch.map(url => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            
            const handleLoad = () => {
              loadedCount++;
              if (!hasTriggeredComplete.current) {
                const currentProgress = Math.round((loadedCount / totalAssets) * 100);
                // Don't set progress to 100 here to let triggerComplete handle final state
                setProgress(Math.min(currentProgress, 99));
              }
              resolve(null);
            };

            img.onload = handleLoad;
            img.onerror = handleLoad; // Continue even if an image fails to load
          });
        }));

        // Safety check: if all are loaded
        if (loadedCount >= totalAssets) {
          triggerComplete();
          break;
        }
      }
    };

    loadAssets();

    return () => clearTimeout(timeoutId);
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
          <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-900 font-bold transition-all duration-300">
            {progress < 100 ? 'Initializing' : 'Ready'}
          </h2>
          <div className="w-full bg-slate-50 h-[1px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">
            {progress < 100 ? 'Warming Up Assets' : 'Loading Page'}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-[9px] font-mono text-slate-200 uppercase tracking-[0.3em]">
        illu's portfolio
      </div>
    </div>
  );
};

export default Preloader;
