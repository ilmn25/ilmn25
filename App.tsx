import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ContactModal from './components/ContactModal';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from './constants';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Palette
} from 'lucide-react';

const App: React.FC = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const heroBtnClass = "w-64 px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 hover:-translate-y-0.5 shadow-lg shadow-slate-200 text-center block cursor-pointer outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";
  const socialIconClass = "relative p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-200 border border-slate-200 text-slate-900 hover:shadow-md active:scale-95 group";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = e.currentTarget;
    const element = document.getElementById(id);
    
    if (element) {
      const offset = 80; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
      
      // Reset focus to ensure button returns to base state
      target.blur();
    }
  };

  return (
    <div className="min-h-screen text-slate-900">
      <Navbar scrollToSection={scrollToSection} onContactClick={() => setContactModalOpen(true)} />
      
      {/* Hero Section */}
      <header id="hero" className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Personal Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-40 h-40 rounded-full mb-8 shadow-2xl shadow-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden">
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
      <section id="skills" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Skills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((group, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/5 hover:-translate-y-1">
                <h3 className="text-slate-900 font-bold text-lg mb-6 uppercase tracking-wider border-b border-slate-100 pb-2">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span key={j} className="px-3 py-1.5 bg-slate-50 rounded-lg text-sm text-slate-700 border border-slate-100 font-medium">
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
      <section id="experience" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Work Experience</h2>
          </div>
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-4 border-white"></div>
                <div className="relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/5 hover:-translate-y-1">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="text-slate-400 font-mono text-sm">
                      {exp.period.includes('Present') ? (
                        <>
                          {exp.period.split('Present')[0]}
                          <span className="text-green-500 font-bold animate-pulse">Present</span>
                        </>
                      ) : (
                        exp.period
                      )}
                    </span>
                    {exp.type && (
                      <span className="shrink-0 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200">
                        {exp.type}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.role}</h3>
                  <p className="text-slate-600 font-semibold mb-4 leading-normal">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-slate-600 text-sm flex gap-2 leading-relaxed">
                        <span className="text-slate-900 font-bold">•</span>
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
      <section id="projects" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Featured Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-mono mt-8 leading-relaxed">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;