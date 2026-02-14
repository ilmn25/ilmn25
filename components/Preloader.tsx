
import React, { useState, useEffect, useRef } from 'react';
import { ILLUSTRATIONS } from '../data/illustrations';
import { GAME_GALLERY, GAME_FEATURES } from '../data/unityProject';
import { TUTOR_GALLERY, TUTOR_FEATURES } from '../data/tutorProject';
import { DISCORD_GALLERY } from '../data/discordTool';
import { WORKFLOW_STEPS } from '../data/spaTree';
import { PERSONAL_INFO } from '../constants';

/** 
 * CONFIGURATION: 
 * LOADING_THRESHOLD: Percentage of total assets that must load to trigger "100%" visual progress.
 * MAX_LOADING_TIME: Maximum milliseconds to wait before forcing the app to open.
 */
const LOADING_THRESHOLD = 15; 
const MAX_LOADING_TIME = 4000; 

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const hasTriggeredComplete = useRef(false);

  useEffect(() => {
    // Collect all image URLs from across the application data modules
    const imageUrls = [
      PERSONAL_INFO.avatar,
      ...ILLUSTRATIONS.colored,
      ...ILLUSTRATIONS.sketches,
      ...GAME_GALLERY,
      ...GAME_FEATURES.map(f => f.media.thumbnailUrl).filter(Boolean),
      ...TUTOR_GALLERY,
      ...TUTOR_FEATURES.map(f => f.image),
      ...DISCORD_GALLERY,
      ...WORKFLOW_STEPS.map(s => s.imageUrl).filter(Boolean),
    ].filter((url): url is string => typeof url === 'string');

    const uniqueImages = Array.from(new Set(imageUrls));
    const total = uniqueImages.length;
    let loaded = 0;

    const triggerComplete = () => {
      if (hasTriggeredComplete.current) return;
      hasTriggeredComplete.current = true;
      
      setProgress(100);
      
      // Brief delay for the user to see the "warming up" status reach 100%
      setTimeout(() => {
        setIsVisible(false);
        // Wait for fade animation before calling onComplete to unmount
        setTimeout(onComplete, 800);
      }, 400);
    };

    // Safety timeout: If loading takes too long, just let the user in
    const timeoutId = setTimeout(() => {
      if (!hasTriggeredComplete.current) {
        console.warn('Preloader timed out. Entering app...');
        triggerComplete();
      }
    }, MAX_LOADING_TIME);

    if (total === 0) {
      triggerComplete();
      clearTimeout(timeoutId);
      return;
    }

    const updateProgress = () => {
      if (hasTriggeredComplete.current) return;
      
      loaded++;
      const realProgress = (loaded / total) * 100;
      
      // Scale displayed progress so LOADING_THRESHOLD real = 100% displayed
      const displayedProgress = Math.min(Math.round((realProgress / LOADING_THRESHOLD) * 100), 99);
      setProgress(displayedProgress);
      
      if (realProgress >= LOADING_THRESHOLD) {
        clearTimeout(timeoutId);
        triggerComplete();
      }
    };

    uniqueImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress; 
    });

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center w-72 animate-fade-in">
        <div className="mb-12 relative flex items-center justify-center">
          <div className="absolute w-24 h-24 border-2 border-slate-100 rounded-full"></div>
          <div 
            className="absolute w-24 h-24 border-2 border-slate-900 rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: '1.2s' }}
          ></div>
          <span className="text-xl font-bold text-slate-900 font-mono tracking-tighter">
            {progress}%
          </span>
        </div>
        
        <div className="w-full text-center space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-slate-900 font-bold">
            initializing
          </h2>
          <div className="w-full bg-slate-50 h-[1px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest animate-pulse">
            warming up assets
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em]">
        illu's portfolio site
      </div>
    </div>
  );
};

export default Preloader;
