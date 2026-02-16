
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Github, 
  Server, 
  ZoomIn, 
  X, 
  Play, 
  Cloud, 
  Zap, 
  Database, 
  Languages, 
  Layout 
} from 'lucide-react';
import { DISCORD_HIGHLIGHTS, DISCORD_GALLERY, DISCORD_STRUCTURED_STACK, DISCORD_FEATURES } from '../data/discordTool';
import RevealOnScroll from './RevealOnScroll';

interface DiscordProjectPageProps {
  onBack: () => void;
}

const DiscordProjectPage: React.FC<DiscordProjectPageProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videoId = "F0IlZSnug6Q";
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const getIcon = (type: string) => {
    const props = { className: "w-4 h-4" };
    switch (type) {
      case 'cloud': return <Cloud {...props} />;
      case 'zap': return <Zap {...props} />;
      case 'database': return <Database {...props} />;
      case 'languages': return <Languages {...props} />;
      case 'layout': return <Layout {...props} />;
      default: return <Server {...props} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-12 transition-all group shrink-0"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-start">
            <RevealOnScroll direction="left">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Discord Automation Tool
                  </h1>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-medium rounded-full uppercase tracking-widest">Cloud Tools</span>
                </div>
                
                <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                  A cloud-native web app for streamlining job posts across many channels on Discord.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                  {DISCORD_HIGHLIGHTS.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700"> 
                      <div className="w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                      <span className="font-semibold text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                
                {/* Stack Column */}
                <div className="flex flex-col gap-3.5 mb-10 border-l border-slate-100 pl-6">
                  {DISCORD_STRUCTURED_STACK.map((item, i) => (
                    <div key={i} className="flex items-baseline gap-4 group">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 w-24 shrink-0 group-hover:text-slate-900 transition-colors">
                        {item.category.replace('/', '')}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {item.tools.map((tool, idx) => {
                          const isDolfies = tool === 'dolfies/discord.py-self';
                          return (
                            <React.Fragment key={idx}>
                              {idx > 0 && ', '}
                              {isDolfies ? (
                                <a 
                                  href="https://github.com/dolfies/discord.py-self" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-slate-900 hover:text-slate-600 underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400 transition-all"
                                >
                                  {tool}
                                </a>
                              ) : (
                                tool
                              )}
                            </React.Fragment>
                          );
                        })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/ilmn25/251128" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all hover:scale-105 shadow-xl shadow-slate-200 flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View Repository
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="relative">
                <a 
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800 transition-transform duration-500 hover:scale-[1.02]"
                >
                  <img 
                    src={thumbnail} 
                    alt="Video Preview" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-5 bg-white/95 backdrop-blur-md rounded-full shadow-2xl scale-90 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-slate-900 fill-slate-900 ml-1" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-950/80 to-transparent">
                    <div className="flex items-center gap-3 text-white/70 font-mono text-sm">
                      <Server className="w-4 h-4" />
                      <span>Watch Demo</span>
                    </div>
                  </div>
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Technical Modules Section */}
          <section className="mb-16">
            <RevealOnScroll direction="up">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-200"></span>
                Technical Modules
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DISCORD_FEATURES.map((feature, idx) => (
                <RevealOnScroll 
                  key={idx} 
                  direction={idx % 2 === 0 ? 'left' : 'right'} 
                  delay={idx * 100}
                >
                  <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 h-full">
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
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section className="mb-16">
            <RevealOnScroll direction="up">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-200"></span>
                Project Gallery
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
              {DISCORD_GALLERY.map((img, i) => (
                <RevealOnScroll key={i} direction="up" delay={i * 50}>
                  <div 
                    onClick={() => setSelectedImage(img)}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in group border border-slate-100 shadow-sm"
                  >
                    <img 
                      src={img} 
                      alt={`Gallery screenshot ${i + 1}`} 
                      className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-3.5 h-3.5 text-slate-900" />
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Image Modal */}
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
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default DiscordProjectPage;
