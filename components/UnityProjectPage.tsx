
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Code2, ExternalLink, Gamepad2, Layers, Cpu, Code, ZoomIn, Play, Video } from 'lucide-react';
import { GAME_FEATURES, GAME_GALLERY, EXTRA_VIDEOS } from '../data/unityProject';
import RevealOnScroll from './RevealOnScroll';
import ImageViewer from './ImageViewer';

interface UnityProjectPageProps {
    onBack: () => void;
}

const UnityProjectPage: React.FC<UnityProjectPageProps> = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getFeatureIcon = (index: number) => {
        const icons = [Layers, Cpu, Code, Gamepad2];
        const Icon = icons[index % icons.length];
        return <Icon className="w-3.5 h-3.5" />;
    };

    const getYouTubeDetails = (url: string) => {
        let videoId = '';
        if (url.includes('v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        } else if (url.includes('/embed/')) {
            videoId = url.split('/embed/')[1]?.split('?')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        }

        return {
            autoThumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '',
            watchUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#'
        };
    };

    return (
        <>
            <div className="min-h-screen bg-white pt-24 pb-20 px-8 md:px-12 lg:px-16 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-all group shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </button>

                    <RevealOnScroll direction="up">
                        <header className="mb-10">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">3D Unity Game</h1>
                                <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-full uppercase tracking-widest">Game Dev</span>
                            </div>
                            <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
                                A technical showcase focusing on procedural systems, pathfinding algorithms, and optimization within the Unity engine.
                            </p>
                        </header>
                    </RevealOnScroll>

                    {/* Feature Cards Section */}
                    <section className="mb-16">
                        <RevealOnScroll direction="up">
                            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-5 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-slate-200"></span>
                                Technical Modules
                            </h2>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                            {GAME_FEATURES.map((feature, idx) => {
                                const yt = getYouTubeDetails(feature.media.url);
                                const displayThumbnail = feature.media.thumbnailUrl || yt.autoThumbnail;

                                return (
                                    <RevealOnScroll
                                        key={idx}
                                        direction="scale"
                                        delay={idx * 100}
                                    >
                                        <a
                                            href={yt.watchUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-500 overflow-hidden group outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 h-full"
                                        >
                                            <div className="w-full aspect-[21/9] bg-slate-900 relative overflow-hidden">
                                                <img
                                                    src={displayThumbnail}
                                                    alt={feature.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <div className="p-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                                                        <Play className="w-4 h-4 text-slate-900 fill-slate-900 ml-0.5" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 md:p-5 flex flex-col bg-white relative flex-1">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <div className="p-1.5 bg-slate-50 rounded-md text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                                                        {getFeatureIcon(idx)}
                                                    </div>
                                                    <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                                                        {feature.title}
                                                    </h3>
                                                </div>
                                                <p className="text-slate-500 leading-snug text-xs mb-3 line-clamp-2">
                                                    {feature.description}
                                                </p>
                                                <div className="mt-auto flex items-center gap-1.5 text-[8px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors tracking-[0.15em] uppercase">
                                                    <ExternalLink className="w-2.5 h-2.5" />
                                                    Watch Video
                                                </div>
                                            </div>
                                        </a>
                                    </RevealOnScroll>
                                );
                            })}
                        </div>
                    </section>

                    {/* Extra Videos Section */}
                    <section className="mb-16">
                        <RevealOnScroll direction="up">
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Additional clips</p>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {EXTRA_VIDEOS.map((video, idx) => {
                                const yt = getYouTubeDetails(video.url);
                                return (
                                    <RevealOnScroll key={idx} direction="up" delay={idx * 50}>
                                        <a
                                            href={yt.watchUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col bg-slate-50/50 rounded-2xl p-3 border border-slate-100 hover:border-slate-300 transition-all duration-300 h-full"
                                        >
                                            <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                                                <img
                                                    src={yt.autoThumbnail}
                                                    alt={video.description}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                                                    <Video className="w-6 h-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" />
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-slate-500 leading-tight line-clamp-2 italic px-1">{video.description}</p>
                                        </a>
                                    </RevealOnScroll>
                                );
                            })}
                        </div>
                    </section>

                    {/* Gallery Section */}
                    <section className="mb-16">
                        <RevealOnScroll direction="up">
                            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-5 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-slate-200"></span>
                                Project Gallery
                            </h2>
                        </RevealOnScroll>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
                            {GAME_GALLERY.map((img, i) => (
                                <RevealOnScroll key={i} direction="up" delay={(i % 6) * 50}>
                                    <div
                                        onClick={() => setSelectedImage(img)}
                                        className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in group border border-slate-100 shadow-sm"
                                    >
                                        <img
                                            src={img}
                                            alt={`Gallery screenshot ${i + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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

                    {/* Footer Actions */}
                    <RevealOnScroll direction="up">
                        <div className="flex flex-col items-center justify-center py-10 border-t border-slate-100">
                            <p className="text-slate-400 font-mono text-[9px] mb-5 tracking-widest uppercase">Source Code & Prototype</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a
                                    href="https://github.com/ilmn25/240809"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-black transition-all hover:scale-105 shadow-md shadow-slate-200"
                                >
                                    <Code2 className="w-3.5 h-3.5" />
                                    View Source
                                </a>
                                <a
                                    href="https://github.com/ilmn25/240809/releases"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-full text-xs font-bold hover:bg-slate-50 transition-all hover:scale-105"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Download Build
                                </a>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            <ImageViewer src={selectedImage} onClose={() => setSelectedImage(null)} />
        </>
    );
};

export default UnityProjectPage;
