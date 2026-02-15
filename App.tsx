
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import IllustrationPage from './components/IllustrationPage';
import UnityProjectPage from './components/UnityProjectPage';
import TutorProjectPage from './components/TutorProjectPage';
import DiscordProjectPage from './components/DiscordProjectPage';
import SpaTreeProjectPage from './components/SpaTreeProjectPage';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES, PROJECT_NAV } from './constants';
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Palette,
    Gamepad2,
    Database,
    Monitor,
    Terminal,
    ChevronRight
} from 'lucide-react';

type PortfolioView = 'portfolio' | 'illustrations' | 'unity-game' | 'tutor-db' | 'discord-tool' | 'spa-tree';

// Hash routing makes BASE_PATH less relevant for the JS logic, but we keep it for asset compatibility
const BASE_PATH = window.location.pathname.startsWith('/ilmn25') ? '/ilmn25' : '';

const App: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [view, setView] = useState<PortfolioView>('portfolio');
    const scrollTimeoutRef = useRef<number | null>(null);

    const socialIconClass = "relative p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-200 border border-slate-200 text-slate-900 hover:shadow-md active:scale-95 group";

    /**
     * Safe navigation wrapper using Hash Routing
     */
    const navigate = useCallback((path: string, targetView: PortfolioView = 'portfolio') => {
        // Path should be like "/unity-game" or "/skills"
        // We set the hash which browser-side routing can detect
        const hash = path.startsWith('/') ? path : `/${path}`;
        window.location.hash = hash;
        setView(targetView);
    }, []);

    const getCleanPath = useCallback(() => {
        // Extract route from hash instead of pathname
        const hash = window.location.hash; // e.g., "#/unity-game"
        return hash.replace(/^#\/?/, '').split('?')[0];
    }, []);

    const handleRouting = useCallback(() => {
        const path = getCleanPath();

        // Project Route Mapping
        const projectPages: Record<string, PortfolioView> = {
            'illustrations': 'illustrations',
            'digital-art': 'illustrations',
            'unity-game': 'unity-game',
            'tutor-db': 'tutor-db',
            'discord-tool': 'discord-tool',
            'spa-tree': 'spa-tree',
            'ai-studio-migration-workflow': 'spa-tree'
        };

        // Section Route List
        const sections = ['hero', 'skills', 'experience', 'projects'];

        if (projectPages[path]) {
            setView(projectPages[path]);
            window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
            setView('portfolio');

            // Handle scrolling to sections
            const targetId = sections.includes(path) ? path : (path === '' || !path ? 'hero' : null);

            if (targetId) {
                if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

                scrollTimeoutRef.current = window.setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - offset;
                        window.scrollTo({
                            top: targetId === 'hero' ? 0 : offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 150);
            }
        }
    }, [getCleanPath]);

    // Initial path sync
    useEffect(() => {
        if (isLoaded) {
            handleRouting();
        }
    }, [isLoaded, handleRouting]);

    // Handle hash change for browser back/forward buttons
    useEffect(() => {
        const onHashChange = () => handleRouting();
        window.addEventListener('hashchange', onHashChange);
        return () => {
            window.removeEventListener('hashchange', onHashChange);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [handleRouting]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const cleanId = id === 'hero' ? '' : id;

        // Update the hash
        navigate(`/${cleanId}`, 'portfolio');

        if (e.currentTarget) e.currentTarget.blur();
    };

    const handleProjectClick = (projectId: string) => {
        const projectPages: Record<string, PortfolioView> = {
            'illustrations': 'illustrations',
            'digital-art': 'illustrations',
            'unity-game': 'unity-game',
            'tutor-db': 'tutor-db',
            'discord-tool': 'discord-tool',
            'spa-tree': 'spa-tree',
            'ai-studio-migration-workflow': 'spa-tree'
        };

        const targetView = projectPages[projectId] || 'portfolio';
        navigate(`/${projectId}`, targetView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderView = () => {
        const backAction = () => {
            navigate('/', 'portfolio');
        };

        switch(view) {
            case 'illustrations': return <IllustrationPage onBack={backAction} />;
            case 'unity-game': return <UnityProjectPage onBack={backAction} />;
            case 'tutor-db': return <TutorProjectPage onBack={backAction} />;
            case 'discord-tool': return <DiscordProjectPage onBack={backAction} />;
            case 'spa-tree': return <SpaTreeProjectPage onBack={backAction} />;
            default: return null;
        }
    };

    const getProjectIcon = (id: string) => {
        const iconProps = { className: "w-4 h-4" };
        switch (id) {
            case 'unity-game': return <Gamepad2 {...iconProps} />;
            case 'tutor-db': return <Database {...iconProps} />;
            case 'discord-tool': return <Monitor {...iconProps} />;
            case 'spa-tree': return <Terminal {...iconProps} />;
            case 'illustrations': return <Palette {...iconProps} />;
            default: return <Monitor {...iconProps} />;
        }
    };

    if (!isLoaded) {
        return <Preloader onComplete={() => setIsLoaded(true)} />;
    }

    if (view !== 'portfolio') {
        return (
            <div className="min-h-screen text-slate-900 animate-fade-in">
                <Navbar
                    scrollToSection={scrollToSection}
                    onProjectClick={handleProjectClick}
                    basePath={BASE_PATH}
                />
                {renderView()}
                <ScrollToTop className={view === 'illustrations' ? 'hidden md:block' : ''} />
                <footer className="py-12 border-t border-slate-200 bg-white">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-slate-400 text-sm font-mono mt-8 leading-relaxed">
                            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}.
                        </p>
                    </div>
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-slate-900 animate-fade-in">
            <Navbar
                scrollToSection={scrollToSection}
                onProjectClick={handleProjectClick}
                basePath={BASE_PATH}
            />

            {/* Hero Section */}
            <header id="hero" className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100/30">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="w-40 h-40 rounded-full mb-8 shadow-2xl shadow-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden animate-zoom-in-soft">
                            <img
                                src={(PERSONAL_INFO as any).avatar}
                                alt={PERSONAL_INFO.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-slate-900">
                            {PERSONAL_INFO.name} <span className="text-slate-500 text-lg md:text-xl font-mono font-normal ml-2">@ilmn25</span>
                        </h1>

                        <div className="text-slate-400 font-mono mb-4 text-xs md:text-sm tracking-widest overflow-hidden whitespace-nowrap">
                            {PERSONAL_INFO.decoration}
                        </div>

                        <div className="max-w-xl text-slate-600 text-base mb-8 space-y-1 leading-relaxed font-mono">
                            <p>{PERSONAL_INFO.birthday}</p>
                            <p>
                                Full stack developer | <br className="md:hidden" />
                                Game developer | <br className="md:hidden" />
                                Digital illustrator
                            </p>
                            <div>
                                <p>
                                    BSc (Hons) in Computer Science <br className="md:hidden" />
                                    + Minor in Japanese
                                </p>
                                <p>
                                    @ The Hong Kong Polytechnic University <br className="md:hidden" />
                                    Sep 2023 – Jul 2027
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
                            <a href={PERSONAL_INFO.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={socialIconClass}>
                                <Github className="w-6 h-6" />
                            </a>
                            <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={socialIconClass}>
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href={PERSONAL_INFO.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className={socialIconClass}>
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href={PERSONAL_INFO.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className={socialIconClass}>
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href={PERSONAL_INFO.social.vgen} target="_blank" rel="noopener noreferrer" aria-label="VGen Portfolio" className={socialIconClass}>
                                <Palette className="w-6 h-6" />
                            </a>
                        </div>

                        <div className="hidden md:flex flex-col items-start gap-3 w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1">Projects</p>
                            <div className="flex flex-wrap gap-3">
                                {PROJECT_NAV.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleProjectClick(item.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-md transition-all group"
                                    >
                                        <span className="text-slate-400 group-hover:text-slate-900 transition-colors">{getProjectIcon(item.id)}</span>
                                        {item.label}
                                        <ChevronRight className="w-3 h-3 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Skills Section */}
            <section id="skills" className="py-12 bg-slate-50 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Skills</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {SKILLS.map((group, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5">
                                <h3 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider border-b border-slate-50 pb-1.5">{group.category}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.skills.map((skill, j) => (
                                        <span key={j} className="px-2.5 py-1 bg-slate-50 rounded text-xs text-slate-600 border border-slate-100 font-medium">
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work Experience Section */}
            <section id="experience" className="py-12 bg-white scroll-mt-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-8 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Work Experience</h2>
                    </div>
                    <div className="relative border-l-2 border-slate-100 ml-4 space-y-6">
                        {EXPERIENCES.map((exp, i) => (
                            <div key={i} className="relative pl-10">
                                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-4 border-white"></div>
                                <div className="relative bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5">
                                    <div className="flex justify-between items-start gap-4 mb-1.5">
                    <span className="text-slate-400 font-mono text-xs">
                      {exp.period.includes('Present') ? (
                          <>
                              {exp.period.split('Present')[0]}
                              <span className="text-green-500 font-bold">Present</span>
                          </>
                      ) : (
                          exp.period
                      )}
                    </span>
                                        {exp.type && (
                                            <span className="shrink-0 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-slate-100">
                        {exp.type}
                      </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-0.5">{exp.role}</h3>
                                    <p className="text-slate-600 font-semibold text-sm mb-3 leading-normal">{exp.company}</p>
                                    <ul className="space-y-1.5">
                                        {exp.description.map((item, j) => (
                                            <li key={j} className="text-slate-600 text-xs flex gap-2 leading-relaxed">
                                                <span className="text-slate-300 font-bold">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-12 px-4 scroll-mt-20 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Featured Projects</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROJECTS.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => handleProjectClick(project.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <ScrollToTop />

            <footer className="py-10 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-400 text-xs font-mono tracking-widest">
                        &copy; {new Date().getFullYear()} {PERSONAL_INFO.name.toUpperCase()}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;
