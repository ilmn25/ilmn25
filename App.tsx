import React from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ChatAssistant from './components/ChatAssistant';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from './constants';

const App: React.FC = () => {
  const heroBtnClass = "w-full md:w-64 px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 hover:-translate-y-0.5 shadow-lg shadow-slate-200 text-center block cursor-pointer outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";

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
      <Navbar scrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <header id="hero" className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Personal Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-40 h-40 rounded-full mb-8 shadow-2xl shadow-slate-200 bg-slate-100 border-4 border-white flex items-center justify-center overflow-hidden">
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-slate-900">
              illu <span className="text-slate-500 text-xl md:text-2xl font-mono font-normal ml-2">@ilmn25</span>
            </h1>

            <div className="text-slate-400 font-mono mb-4 text-sm md:text-base tracking-widest overflow-hidden whitespace-nowrap">
              {(PERSONAL_INFO as any).decoration}
            </div>

            <div className="max-w-xl text-slate-600 text-lg mb-8 space-y-1 leading-relaxed font-mono">
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

            <div className="flex items-center gap-4">
              <a href={PERSONAL_INFO.social.github} target="_blank" rel="noopener" aria-label="GitHub Profile" className="p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-200 border border-slate-200 text-slate-900 hover:shadow-md active:scale-95">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href={PERSONAL_INFO.social.twitter} target="_blank" rel="noopener" aria-label="Twitter Profile" className="p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-200 border border-slate-200 text-slate-900 hover:shadow-md active:scale-95">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href={`mailto:${PERSONAL_INFO.contact.email}`} aria-label="Email" className="p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-200 border border-slate-200 text-slate-900 hover:shadow-md active:scale-95">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>

          {/* Right Column: Navigation and Actions */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4 w-full md:w-auto">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={heroBtnClass} aria-label="Go to About Section">
              About
            </a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={heroBtnClass} aria-label="Go to Featured Work Section">
              Featured work
            </a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className={heroBtnClass} aria-label="Go to Work Experience Section">
              Work Experience
            </a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={heroBtnClass} aria-label="Go to Digital Illustration Section">
              Digital illustration
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 uppercase tracking-widest">About</h2>
            <div className="h-1 w-20 bg-slate-900 mx-auto rounded-full"></div>
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

      {/* Featured Work Section */}
      <section id="projects" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900 uppercase tracking-widest">Featured Work</h2>
              <p className="text-slate-500 leading-relaxed font-medium">A selection of my technical and creative ventures.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 uppercase tracking-widest">Work Experience</h2>
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-4 border-white"></div>
                <div className="relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/5 hover:-translate-y-1">
                  {exp.type && (
                    <span className="absolute top-6 right-6 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200">
                      {exp.type}
                    </span>
                  )}
                  <span className="text-slate-400 font-mono text-sm mb-2 block">
                    {exp.period.includes('Present') ? (
                      <>
                        {exp.period.split('Present')[0]}
                        <span className="text-green-500 font-bold animate-pulse">Present</span>
                      </>
                    ) : (
                      exp.period
                    )}
                  </span>
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

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-mono mt-8 leading-relaxed">
            {/* Fix: Use new Date() instead of new Year() to get the current year. */}
            &copy; {new Date().getFullYear()} illu. Built with <span className="text-slate-900 font-bold">React</span> & <span className="text-slate-900 font-bold">Tailwind</span>.
          </p>
        </div>
      </footer>
      <ChatAssistant />
    </div>
  );
};

export default App;