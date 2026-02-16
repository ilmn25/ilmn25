
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ILLUSTRATIONS } from '../data/illustrations';
import { ArrowLeft, X, ZoomIn, Move, Sparkles, PenTool, Shuffle } from 'lucide-react';

interface IllustrationPageProps {
  onBack: () => void;
}

type Category = 'colored' | 'sketches';

const IllustrationItem: React.FC<{ 
  src: string; 
  index: number; 
  category: string;
  priority?: boolean;
  onClick: (src: string) => void;
}> = ({ src, index, category, priority, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      onClick={() => isLoaded && onClick(src)}
      className={`relative group overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-500 mb-8 ${isLoaded ? 'cursor-zoom-in hover:shadow-2xl hover:shadow-slate-200' : 'cursor-wait'}`}
    >
      {/* Loading Shimmer Overlay - Fixed aspect to prevent initial height jump */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 bg-[length:200%_100%] animate-[shimmer_2s_infinite] opacity-50 aspect-[3/4]" />
      )}
      
      <img 
        src={src} 
        alt={`${category} ${index + 1}`}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto block object-cover transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        loading={priority ? "eager" : "lazy"}
        // @ts-ignore - fetchpriority is a valid experimental attribute
        fetchpriority={priority ? "high" : "low"}
      />

      {/* Zoom Overlay - only visible when loaded */}
      {isLoaded && (
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-4 bg-white/90 backdrop-blur-md rounded-full scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
            <ZoomIn className="w-6 h-6 text-slate-900" />
          </div>
        </div>
      )}
    </div>
  );
};

const IllustrationPage: React.FC<IllustrationPageProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('colored');
  const [shuffleKey, setShuffleKey] = useState(0); // Key to trigger re-shuffle
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [columnCount, setColumnCount] = useState(3);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const updateColumns = () => {
      if (window.innerWidth < 768) setColumnCount(1);
      else if (window.innerWidth < 1024) setColumnCount(2);
      else setColumnCount(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Fisher-Yates shuffle
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const images = useMemo(() => {
    return shuffleArray(ILLUSTRATIONS[activeCategory]);
  }, [activeCategory, shuffleKey]);

  // To ensure top-to-bottom discovery order (0, 1, 2 load first), 
  // we distribute into columns based on modulo of column count.
  const columns = useMemo(() => {
    const cols: {src: string, originalIdx: number}[][] = Array.from({ length: columnCount }, () => []);
    images.forEach((src, idx) => {
      cols[idx % columnCount].push({ src, originalIdx: idx });
    });
    return cols;
  }, [images, columnCount]);

  // Reset zoom when image changes or closes
  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [selectedImage]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!selectedImage) return;
    
    const delta = -e.deltaY;
    const factor = scale * 0.1;
    const newScale = Math.min(Math.max(1, scale + (delta > 0 ? factor : -factor)), 8);
    
    if (newScale === 1) {
      setOffset({ x: 0, y: 0 });
    }
    
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setOffset({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleShuffle = () => {
    setShuffleKey(prev => prev + 1);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
      
      <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8 animate-slide-up">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all group shrink-0"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </button>

            <div className="flex items-center gap-3">
              {/* Category Switcher */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
                <button
                  onClick={() => setActiveCategory('colored')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeCategory === 'colored' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${activeCategory === 'colored' ? 'text-slate-900' : 'text-slate-400'}`} />
                  Colored
                </button>
                <button
                  onClick={() => setActiveCategory('sketches')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeCategory === 'sketches' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <PenTool className={`w-4 h-4 ${activeCategory === 'sketches' ? 'text-slate-900' : 'text-slate-400'}`} />
                  Sketches
                </button>
              </div>

              {/* Shuffle Button */}
              <button
                onClick={handleShuffle}
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-2xl transition-all active:scale-95 group"
                title="Shuffle Order"
              >
                <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>

          <header className="mb-10">
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              {activeCategory === 'colored' ? 'Digital Illustration' : 'Sketches'}
            </h1> 
            <p className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
              Sketches, Illustrations & Commissions
            </p>
          </header>

          {/* Masonry-style flex columns */}
          <div key={`${activeCategory}-${shuffleKey}`} className="flex flex-row gap-8 animate-fade-in">
            {columns.map((columnData, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col">
                {columnData.map((item, imgIdx) => (
                  <IllustrationItem 
                    key={`${activeCategory}-${shuffleKey}-${colIdx}-${imgIdx}`}
                    src={item.src}
                    index={item.originalIdx}
                    category={activeCategory}
                    // Priority for images in the initial viewport rows
                    priority={item.originalIdx < (columnCount * 2)}
                    onClick={setSelectedImage}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setSelectedImage(null)}
          onWheel={handleWheel}
        >
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/70 text-xs font-mono select-none pointer-events-none transition-opacity duration-300">
            <div className="flex items-center gap-1.5">
              <ZoomIn className="w-3 h-3" />
              <span>Scroll to zoom</span>
            </div>
            {scale > 1 && (
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-4 animate-fade-in">
                <Move className="w-3 h-3" />
                <span>Drag to pan</span>
              </div>
            )}
            <div className="border-l border-white/20 pl-4">
              {Math.round(scale * 100)}%
            </div>
          </div>

          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[1000]"
            aria-label="Close viewer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img 
              src={selectedImage} 
              alt="Full view" 
              className={`max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl pointer-events-auto select-none transition-none ${isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-default'}`}
              style={{
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                transformOrigin: 'center',
                willChange: 'transform'
              }}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default IllustrationPage;
