
import React, { useEffect, useState, useMemo } from 'react';
import { ILLUSTRATIONS } from '../data/illustrations';
import { ASSETS_URL } from '../constants';
import { ArrowLeft, Sparkles, PenTool, Shuffle, ZoomIn } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import ImageViewer from './ImageViewer';

interface IllustrationPageProps {
  onBack: () => void;
  activeCategory: 'colored' | 'sketches';
  onCategoryChange: (category: 'colored' | 'sketches') => void;
}

type Category = 'colored' | 'sketches';

const getUrlFromId = (id: number, cat: Category): string => {
  const subPath = cat === 'colored' ? 'colored' : 'sketch';
  return `${ASSETS_URL}/art/${subPath}/${id}.png`;
};

const getIdFromUrl = (url: string): number => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  return parseInt(filename.replace('.png', ''), 10);
};

const PRESET_ORDERS: Record<Category, number[] | null> = {
  colored: [2, 12, 1, 3, 4, 10, 7, 13, 9, 6, 11, 5, 8],
  sketches: [30, 21, 33, 9, 22, 32, 13, 56, 54, 43, 24, 45, 35, 37, 16, 4, 23, 25, 42, 51, 50, 10, 36, 7, 38, 5, 1, 52, 8, 46, 26, 18, 14, 11, 39, 53, 29, 15, 19, 12, 27, 31, 47, 17, 2, 6, 34, 55, 44, 49, 41, 3, 48, 40, 20, 28]
};

const IllustrationItem: React.FC<{ 
  src: string; 
  index: number; 
  category: string;
  priority?: boolean;
  onClick: (src: string) => void;
}> = ({ src, index, category, priority, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <RevealOnScroll direction="up" delay={(index % 4) * 50}>
      <div 
        onClick={() => isLoaded && onClick(src)}
        className={`relative group overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-500 mb-8 ${isLoaded ? 'cursor-zoom-in hover:shadow-2xl hover:shadow-slate-200' : 'cursor-wait'}`}
      >
        {!isLoaded && (
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 bg-[length:200%_100%] animate-[shimmer_2s_infinite] opacity-50 aspect-[3/4]" />
        )}
        
        <img 
          src={src} 
          alt={`${category} ${index + 1}`}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto block object-cover transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
          loading={priority ? "eager" : "lazy"}
        />

        {isLoaded && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="p-4 bg-white/90 backdrop-blur-md rounded-full scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
              <ZoomIn className="w-6 h-6 text-slate-900" />
            </div>
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
};

const IllustrationPage: React.FC<IllustrationPageProps> = ({ onBack, activeCategory, onCategoryChange }) => {
  const [shuffleKey, setShuffleKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    setShuffleKey(0);
  }, [activeCategory]);

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

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const images = useMemo(() => {
    if (shuffleKey === 0 && PRESET_ORDERS[activeCategory]) {
      return PRESET_ORDERS[activeCategory]!.map(id => getUrlFromId(id, activeCategory));
    }
    const shuffled = shuffleArray(ILLUSTRATIONS[activeCategory]);
    if (shuffleKey > 0) {
      const ids = shuffled.map(url => getIdFromUrl(url));
      console.log(`%c[${activeCategory.toUpperCase()} SHUFFLE ORDER]`, 'color: #0ea5e9; font-weight: bold;', JSON.stringify(ids));
    }
    return shuffled;
  }, [activeCategory, shuffleKey]);

  const columns = useMemo(() => {
    const cols: {src: string, originalIdx: number}[][] = Array.from({ length: columnCount }, () => []);
    images.forEach((src, idx) => {
      cols[idx % columnCount].push({ src, originalIdx: idx });
    });
    return cols;
  }, [images, columnCount]);

  const handleShuffle = () => setShuffleKey(prev => prev + 1);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
      
      <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll direction="up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all group shrink-0"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Portfolio
              </button>

              <div className="flex items-center gap-3">
                <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
                  <button
                    onClick={() => onCategoryChange('colored')}
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
                    onClick={() => onCategoryChange('sketches')}
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

                <button
                  onClick={handleShuffle}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-2xl transition-all active:scale-95 group"
                  title="Shuffle Order"
                >
                  <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <header className="mb-10">
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {activeCategory === 'colored' ? 'Digital Illustration' : 'Sketches'}
              </h1> 
              <p className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
                Sketches, Illustrations & Commissions
              </p>
            </header>
          </RevealOnScroll>

          <div key={`${activeCategory}-${shuffleKey}`} className="flex flex-row gap-8">
            {columns.map((columnData, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col">
                {columnData.map((item, imgIdx) => (
                  <IllustrationItem 
                    key={`${activeCategory}-${shuffleKey}-${colIdx}-${imgIdx}`}
                    src={item.src}
                    index={item.originalIdx}
                    category={activeCategory}
                    priority={item.originalIdx < (columnCount * 2)}
                    onClick={setSelectedImage}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageViewer src={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
};

export default IllustrationPage;
