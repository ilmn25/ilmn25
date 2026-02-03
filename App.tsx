import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ContactModal from './components/ContactModal';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from './constants';

const App: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const heroBtnClass = "w-full md:w-64 px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 hover:-translate-y-0.5 shadow-lg shadow-slate-200 text-center block cursor-pointer outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";
  const socialIconClass = "relative p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-200 border border-slate-200 text-slate-900 hover:shadow-md active:scale-95 group";


  const handleCopy = (text: string, type: string) => {
    if (copied) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
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
            <div className="w-40 h-40 rounded-full mb-8 shadow-2xl shadow-slate-200 bg-slate-100 border-4 border-white flex items-center justify-center overflow-hidden">
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-slate-900">
              illu <span className="text-slate-500 text-xl md:text-2xl font-mono font-normal ml-2">@ilmn25</span>
            </h1>

            <div className="text-slate-400 font-mono mb-4 text-sm md:text-base tracking-widest overflow-hidden whitespace-nowrap">
              {(PERSONAL_INFO as any).decoration}
            </div>

            <div className="max-w-xl text-slate-600 text-lg mb-8 space-y-1 leading-relaxed font-mono">
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
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={socialIconClass}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={PERSONAL_INFO.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className={socialIconClass}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href={PERSONAL_INFO.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className={socialIconClass}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
              </a>
              <a href={PERSONAL_INFO.social.vgen} target="_blank" rel="noopener noreferrer" aria-label="VGen Portfolio" className={socialIconClass}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3.5 3h3L12 15l5.5-12h3l-7 18-7-18z"/></svg>
              </a>
              
              <div className="hidden md:block w-px h-6 bg-slate-200 mx-2"></div>

              <button onClick={() => handleCopy(PERSONAL_INFO.contact.email, 'email')} aria-label="Copy Email" className={socialIconClass}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                {copied === 'email' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md shadow-lg transition-opacity duration-300">Copied!</div>}
              </button>
              <button onClick={() => handleCopy(PERSONAL_INFO.contact.whatsapp, 'whatsapp')} aria-label="Copy WhatsApp Number" className={socialIconClass}>
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.05 20.2c-1.48 0-2.91-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.41 0-4.54 3.68-8.21 8.24-8.21 2.25 0 4.35.88 5.89 2.42s2.41 3.64 2.41 5.88c.02 4.54-3.66 8.23-8.21 8.23zm4.45-6.49c-.25-.12-1.47-.72-1.7-.82-.22-.09-.38-.12-.54.12s-.64.82-.79 1c-.14.17-.29.19-.54.07-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.76-.15-.25-.02-.38.11-.5.12-.11.25-.29.38-.43s.17-.2.25-.34.04-.25-.02-.37c-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.55-.42h-.48c-.15 0-.38.04-.58.25-.2.2-.76.75-.76 1.82s.78 2.11.89 2.27c.11.17 1.54 2.34 3.73 3.3 2.19.95.73.5.54.34.2-.17.64.12.79.07.2-.12.64-.72.73-.82.09-.1.06-.19-.03-.25z"/></svg>
                {copied === 'whatsapp' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md shadow-lg transition-opacity duration-300">Copied!</div>}
              </button>
              <button onClick={() => handleCopy(PERSONAL_INFO.contact.discord, 'discord')} aria-label="Copy Discord Username" className={socialIconClass}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.36982C18.6992 3.65219 16.9242 3.125 15 2.79982V2.79982C14.9998 2.79975 14.9996 2.79969 14.9993 2.79962C13.899 2.60548 12.7753 2.5 11.625 2.5C11.5 2.5 11.375 2.5 11.25 2.5C9.74996 2.5 8.24996 2.69982 6.87496 3.04982C5.07496 3.44982 3.37496 4.09982 1.87496 4.94982C1.87503 4.94982 1.8751 4.94982 1.87516 4.94982C0.499955 6.64982 -0.0000451408 8.64982 -0.0000451408 10.65C-0.0000451408 15.65 3.34996 19.85 7.74996 21.5C7.74996 21.5 7.74996 21.5 7.75003 21.5C8.37503 21.7 8.99996 21.8 9.62496 21.85C9.62496 21.85 9.62496 21.85 9.62503 21.85C10.125 21.95 10.625 22 11.125 22C11.375 22 11.625 22 11.875 22C12.875 22 13.875 21.9 14.75 21.65C14.75 21.65 14.75 21.65 14.7501 21.65C19.1501 20.35 22.25 16.35 22.45 11.6C22.5165 9.29987 21.8219 7.04231 20.317 4.36982ZM8.12496 16.1C7.12496 16.1 6.37496 15.25 6.37496 14.25C6.37496 13.25 7.12496 12.4 8.12496 12.4C9.12496 12.4 9.87496 13.25 9.87496 14.25C9.87496 15.25 9.12496 16.1 8.12496 16.1ZM14.125 16.1C13.125 16.1 12.375 15.25 12.375 14.25C12.375 13.25 13.125 12.4 14.125 12.4C15.125 12.4 15.875 13.25 15.875 14.25C15.875 15.25 15.125 16.1 14.125 16.1Z"/></svg>
                {copied === 'discord' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md shadow-lg transition-opacity duration-300">Copied!</div>}
              </button>
            </div>
          </div>

          {/* Right Column: Navigation and Actions */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4 w-full md:w-auto">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={heroBtnClass} aria-label="Go to About Section">
              About
            </a>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className={heroBtnClass} aria-label="Go to Skills Section">
              Skills
            </a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={heroBtnClass} aria-label="Go to Projects Section">
              Projects
            </a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className={heroBtnClass} aria-label="Go to Work Experience Section">
              Work Experience
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 uppercase tracking-widest">About Me</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
            <p>
              I'm a 3rd year computer science student in PolyU, who has experience in full-stack web development, game development, and graphic design. I am fluent in both Chinese and English.
            </p>
            <p>
              I’m a person who is eager to learn, open minded, and has high aspirations. I have a broad and strong set of skills, and is always working hard to improve and expand them.
            </p>
            <p>
              I have multiple full stack SaaS projects with complex database schemas, cloud-hosted backend, and robust features. One of which, a student attendance and bookings system, is actively used by a tutor centre in Hung Hom.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 uppercase tracking-widest">Skills</h2>
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900 uppercase tracking-widest">Projects</h2>
              <p className="text-slate-500 leading-relaxed font-medium">Featured Software, Game and Illustration Projects</p>
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
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-mono mt-8 leading-relaxed">
            &copy; {new Date().getFullYear()} illu.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;