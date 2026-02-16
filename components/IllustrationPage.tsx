
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ILLUSTRATIONS } from '../data/illustrations';
import { ASSETS_URL } from '../constants';
import { ArrowLeft, X, ZoomIn, Move, Sparkles, PenTool, Shuffle, Maximize2, Minimize2, MousePointer2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

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
    const [isClosing, setIsClosing] = useState(false);
    const [scale, setScale] = useState(0.95);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [columnCount, setColumnCount] = useState(3);
    const dragStart = useRef({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

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
            const ids = shuffled.map(url => getIdFromUrl(url as string));
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

    useEffect(() => {
        if (selectedImage && !isClosing) {
            setScale(0.95);
            setOffset({ x: 0, y: 0 });
            setIsDragging(false);
        }
    }, [selectedImage, isClosing]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
            setIsClosing(false);
        }, 400); // Matches animation duration
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [handleClose]);

    useEffect(() => {
        if (selectedImage) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    const handleWheel = (e: React.WheelEvent) => {
        if (!selectedImage || isClosing || !imageRef.current) return;

        const delta = -e.deltaY;
        const zoomIntensity = 0.001;
        const zoomChange = delta * zoomIntensity * scale;
        // Allow zooming out to 50% (0.5)
        const newScale = Math.min(Math.max(0.5, scale + zoomChange), 8);

        if (newScale === scale) return;

        const rect = imageRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const relativeX = (mouseX - rect.width / 2) / scale;
        const relativeY = (mouseY - rect.height / 2) / scale;

        const newOffsetX = offset.x - relativeX * (newScale - scale);
        const newOffsetY = offset.y - relativeY * (newScale - scale);

        setScale(newScale);
        // Snap to center if scale is 95% or less to keep image tidy
        setOffset(newScale <= 0.95 ? { x: 0, y: 0 } : { x: newOffsetX, y: newOffsetY });
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (!selectedImage || isClosing || !imageRef.current) return;

        if (scale > 0.95) {
            setScale(0.95);
            setOffset({ x: 0, y: 0 });
        } else {
            const targetScale = 2.5;
            const rect = imageRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const relativeX = (mouseX - rect.width / 2);
            const relativeY = (mouseY - rect.height / 2);

            setScale(targetScale);
            setOffset({
                x: -relativeX * (targetScale - 1),
                y: -relativeY * (targetScale - 1)
            });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!selectedImage || isClosing) return;
        setIsDragging(true);
        dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setOffset({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y
            });
        }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleShuffle = () => setShuffleKey(prev => prev + 1);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeOut {
          from { opacity: 1; filter: blur(0px); }
          to { opacity: 0; filter: blur(20px); }
        }
        .animate-fade-out {
          animation: fadeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
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

            {selectedImage && (
                <div
                    className={`fixed inset-0 z-[1000] bg-white w-screen h-screen flex items-center justify-center cursor-default overflow-hidden ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
                    onClick={handleClose}
                    onWheel={handleWheel}
                >
                    <button
                        onClick={(e) => { e.stopPropagation(); handleClose(); }}
                        className="absolute top-6 right-6 p-3 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-full transition-all z-[1010] border border-slate-200 hover:scale-110 active:scale-95"
                        aria-label="Close viewer"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div
                        className="relative w-screen h-screen flex items-center justify-center pointer-events-none"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <img
                            ref={imageRef}
                            src={selectedImage}
                            alt="Full view"
                            className={`max-w-full max-h-full object-contain pointer-events-auto select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                            style={{
                                transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                                transformOrigin: 'center',
                                willChange: 'transform',
                                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out'
                            }}
                            draggable={false}
                            onClick={(e) => e.stopPropagation()}
                            onDoubleClick={handleDoubleClick}
                        />
                    </div>

                    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 text-slate-900 transition-all duration-300 ${isClosing ? 'opacity-0 translate-y-4' : 'animate-slide-up'}`}>
                        <div className="flex items-center gap-3 px-4 py-2 border-r border-slate-100 mr-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                <MousePointer2 className="w-3.5 h-3.5" />
                                <span>Drag anywhere</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest whitespace-nowrap border-l border-slate-100 pl-3">
                                <ZoomIn className="w-3.5 h-3.5" />
                                <span>Scroll / Double tap</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 pr-1">
                            <div className="px-3 py-2 bg-slate-50 rounded-xl text-[10px] font-mono font-bold min-w-[3.5rem] text-center text-slate-900">
                                {Math.round(scale * 100)}%
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setScale(0.95); setOffset({x:0, y:0}); }}
                                className={`p-2 rounded-xl transition-all ${scale === 0.95 && offset.x === 0 && offset.y === 0 ? 'opacity-20 cursor-default' : 'hover:bg-slate-100 text-slate-600 active:scale-95'}`}
                                title="Reset View"
                            >
                                <Minimize2 className="w-4.5 h-4.5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setScale(Math.min(scale + 1, 8)); }}
                                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-all active:scale-95"
                                title="Zoom In"
                            >
                                <Maximize2 className="w-4.5 h-4.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IllustrationPage;
