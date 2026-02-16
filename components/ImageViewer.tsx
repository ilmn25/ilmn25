
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, ZoomIn, Maximize2, Minimize2, MousePointer2 } from 'lucide-react';

interface ImageViewerProps {
  src: string | null;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [scale, setScale] = useState(0.95);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400);
  }, [onClose]);

  useEffect(() => {
    if (src) {
      setScale(0.95);
      setOffset({ x: 0, y: 0 });
      setIsDragging(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [src]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!src || isClosing || !imageRef.current) return;

    const delta = -e.deltaY;
    const zoomIntensity = 0.001;
    const zoomChange = delta * zoomIntensity * scale;
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
    setOffset(newScale <= 0.95 ? { x: 0, y: 0 } : { x: newOffsetX, y: newOffsetY });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!src || isClosing || !imageRef.current) return;

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
    if (!src || isClosing) return;
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

  if (!src) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] bg-white w-screen h-screen flex items-center justify-center cursor-default overflow-hidden ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
      onClick={handleClose}
      onWheel={handleWheel}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeOut {
          from { opacity: 1; filter: blur(0px); }
          to { opacity: 0; filter: blur(20px); }
        }
        .animate-fade-out {
          animation: fadeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}} />
      
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
          src={src} 
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
  );
};

export default ImageViewer;
