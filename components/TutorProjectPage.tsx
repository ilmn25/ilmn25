import React, { useEffect, useState } from 'react';
import { ArrowLeft, Database, Layout, Shield, FileSpreadsheet, ZoomIn, X } from 'lucide-react';
import { TUTOR_FEATURES, TUTOR_GALLERY, TUTOR_HIGHLIGHTS, TUTOR_GALLERY_GROUPS } from '../data/tutorProject';

interface TutorProjectPageProps {
  onBack: () => void;
}

const TutorProjectPage: React.FC<TutorProjectPageProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIcon = (type: string) => {
    const props = { className: "w-4 h-4" };
    switch (type) {
      case 'database': return <Database {...props} />;
      case 'layout': return <Layout {...props} />;
      case 'shield': return <Shield {...props} />;
      case 'import': return <FileSpreadsheet {...props} />;
      default: return <Layout {...props} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto animate-slide-up">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-all group shrink-0"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <header className="mb-10">
            <div className="flex items-center gap-4 mb-2"> 
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Tutor Centre Management System</h1>
              <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-full uppercase tracking-widest">Web App</span>
            </div>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed mb-6">
              A custom ERP and CRM solution built to streamline Attendance, Client communication, and Financial bookkeeping for education centers.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {TUTOR_HIGHLIGHTS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700"> 
                  <div className="w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                  <span className="font-semibold text-xs">{item}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="mb-16">
            <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img 
                src={TUTOR_GALLERY[17]} 
                alt="Dashboard Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Technical Deep Dive */}
          <section className="mb-16">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              Technical Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {TUTOR_FEATURES.map((feature, idx) => (
                <div key={idx} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                  <div className="aspect-[21/9] overflow-hidden bg-slate-100">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        {getIcon(feature.iconType)}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Infrastructure Gallery with Subsections */}
          <section className="mb-16 pb-10">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              System Gallery
            </h2>
            
            <div className="space-y-12">
              {Object.entries(TUTOR_GALLERY_GROUPS).map(([sectionName, imageIndices]) => (
                <div key={sectionName} className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest pl-3 border-l-2 border-slate-900">
                    {sectionName}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
                    {imageIndices.map((idx) => {
                      const img = TUTOR_GALLERY[idx - 1];
                      if (!img) return null;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedImage(img)}
                          className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in group border border-slate-100 shadow-sm"
                        >
                          <img src={img} alt={`${sectionName} screenshot ${idx}`} className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125" loading="lazy" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="p-2 bg-white/90 backdrop-blur rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform">
                              <ZoomIn className="w-3.5 h-3.5 text-slate-900" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[110]"
          >
            <X className="w-5 h-5" />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default TutorProjectPage;