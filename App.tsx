
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ContactModal from './components/ContactModal';
import IllustrationPage from './components/IllustrationPage';
import UnityProjectPage from './components/UnityProjectPage';
import TutorProjectPage from './components/TutorProjectPage';
import DiscordProjectPage from './components/DiscordProjectPage';
import SpaTreeProjectPage from './components/SpaTreeProjectPage';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from './constants';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Palette
} from 'lucide-react';

type PortfolioView = 'portfolio' | 'illustrations' | 'unity-game' | 'tutor-db' | 'discord-tool' | 'spa-tree';

const App: React.FC = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<PortfolioView>('portfolio');

  const heroBtnClass = "w-64 px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 hover:-translate-y-0.5 shadow-lg shadow-slate-200 text-center block cursor-pointer outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";
  const socialIconClass = "relative p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-200 border border-slate-200 text-slate-900 hover:shadow-md active:scale-95 group";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (view !== 'portfolio') {
      setView('portfolio');
      // Delay scroll until component re-renders
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const target = e.currentTarget;
    const element = document.getElementById(id);
    
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${id}`);
      target.blur();
    }
  };

  const handleProjectClick = (projectId: string) => {
    if (projectId === 'digital-art') {
      setView('illustrations');
    } else if (projectId === 'unity-game') {
      setView('unity-game');
    } else if (projectId === 'tutor-db') {
      setView('tutor-db');
    } else if (projectId === 'discord-tool') {
      setView('discord-tool');
    } else if (projectId === 'ai-studio-migration-workflow') {
      setView('spa-tree');
    }
  };

  const renderView = () => {
    switch(view) {
      case 'illustrations':
        return <IllustrationPage onBack={() => setView('portfolio')} />;
      case 'unity-game':
        return <UnityProjectPage onBack={() => setView('portfolio')} />;
      case 'tutor-db':
        return <TutorProjectPage onBack={() => setView('portfolio')} />;
      case 'discord-tool':
        return <DiscordProjectPage onBack={() => setView('portfolio')} />;
      case 'spa-tree':
        return <SpaTreeProjectPage onBack={() => setView('portfolio')} />;
      default:
        return null;
    }
  };

  if (!isLoaded) {
    return <Preloader onComplete={() => setIsLoaded(true)} />;
  }

  if (view !== 'portfolio') {
    return (
      <div className="min-h-screen text-slate-900 animate-fade-in">
        <Navbar scrollToSection={scrollToSection} onContactClick={() => setContactModalOpen(true)} />
        {renderView()}
        <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
        <ScrollToTop />
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
      <Navbar scrollToSection={scrollToSection} onContactClick={() => setContactModalOpen(true)} />
      
      {/* Hero Section */}
      <header id="hero" className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Personal Info */}
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
              <p>{PERSONAL_INFO.title}</p>
              {(() => {
                const parts = PERSONAL_INFO.education.split(' @ ');
                return (
                  <div>
                    <p>{parts[0]}</p>
                    {parts[1] && <p>@ {parts[1]}</p>}
                  </div>
                )
              })()}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
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
          </div>

          {/* Right Column: Navigation and Actions */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-5 w-full md:w-auto">
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className={heroBtnClass} aria-label="Go to Skills Section">
              Skills
            </a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className={heroBtnClass} aria-label="Go to Work Experience Section">
              Work Experience
            </a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={heroBtnClass} aria-label="Go to Projects Section">
              Projects
            </a>
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

      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
      <ScrollToTop />

      {/* Footer */}
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
