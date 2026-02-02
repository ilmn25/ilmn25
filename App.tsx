import React from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from './constants';

const App: React.FC = () => {
  const heroBtnClass = "w-full md:w-64 px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-full font-bold transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg shadow-gray-700/30 text-center block";
  
  // Format WhatsApp number for the link
  const waLink = `https://wa.me/${PERSONAL_INFO.contact.whatsapp.replace(/\D/g, '')}`;

  return (
    <div className="min-h-screen text-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <header id="about" className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Personal Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-gray-700/20 p-1 shadow-2xl shadow-gray-700/10">
              <img src="/icon.png" alt="Avatar" className="w-full h-full object-cover rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-slate-900">
              illu <span className="text-slate-600 text-3xl md:text-4xl font-normal ml-2">@ilmn25</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-800 font-mono mb-4 leading-normal">
              {PERSONAL_INFO.title}
            </p>
            <p className="max-w-xl text-slate-700 text-lg mb-8 leading-relaxed">
              {PERSONAL_INFO.education}. A software engineer and technical artist passionate about Game Engine development, 
              Cloud infrastructures, and high-fidelity digital art.
            </p>
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.social.github} target="_blank" rel="noopener" aria-label="GitHub Profile" className="p-3 bg-black hover:bg-gray-800 rounded-full transition-all duration-200 border border-gray-700 text-white hover:text-gray-300 hover:-translate-y-0.5">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href={PERSONAL_INFO.social.twitter} target="_blank" rel="noopener" aria-label="Twitter Profile" className="p-3 bg-black hover:bg-gray-800 rounded-full transition-all duration-200 border border-gray-700 text-white hover:text-gray-300 hover:-translate-y-0.5">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href={waLink} target="_blank" rel="noopener" aria-label="Contact via WhatsApp" className="p-3 bg-black hover:bg-gray-800 rounded-full transition-all duration-200 border border-gray-700 text-white hover:text-gray-300 hover:-translate-y-0.5">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.3 1.592 5.548 0 10.061-4.512 10.063-10.062 0-2.69-1.048-5.219-2.953-7.124s-4.434-2.952-7.125-2.952c-5.549 0-10.062 4.513-10.064 10.063-.001 2.032.547 3.541 1.558 5.283l-.991 3.616 3.707-.972zm10.177-7.391c-.265-.134-1.57-.774-1.813-.863-.243-.089-.419-.133-.596.133-.177.266-.685.863-.84.1.044-.154.177-.311.371-.465.596-.266.134-.531.134-.818 0-.288-.133-1.152-.443-1.884-.31-.731-.624-.632-.863-.644-.21-.01-.453-.01-.696-.01-.242 0-.64.091-.973.465-.332.373-1.27 1.242-1.27 3.03s1.303 3.51 1.48 3.757c.177.247 2.566 3.918 6.215 5.495.868.375 1.545.599 2.072.766.872.277 1.666.238 2.294.145.699-.104 2.144-.876 2.441-1.724.298-.847.298-1.573.209-1.723-.089-.151-.332-.241-.597-.375z"/></svg>
              </a>
            </div>
          </div>

          {/* Right Column: Navigation and Actions */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4 w-full md:w-auto">
            <a href="#about" className={heroBtnClass} aria-label="Go to About Section">
              About
            </a>
            <a href="#projects" className={heroBtnClass} aria-label="Go to Projects Section">
              Personal projects
            </a>
            <a href="#experience" className={heroBtnClass} aria-label="Go to Experience Section">
              Work Experience
            </a>
            <a href="#projects" className={heroBtnClass} aria-label="Go to Digital Illustration Section">
              Digital illustration
            </a>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Core Competencies</h2>
            <div className="h-1 w-20 bg-violet-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILLS.map((group, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/5 hover:-translate-y-1">
                <h3 className="text-slate-900 font-bold text-lg mb-6 uppercase tracking-wider">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span key={j} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 border border-gray-300">
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
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Featured Work</h2>
              <p className="text-slate-700 leading-relaxed">A selection of my technical and creative ventures.</p>
            </div>
            <div className="flex gap-2">
               <span className="px-4 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700 uppercase tracking-widest bg-gray-50">
                 Curated Portfolio
               </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Journey</h2>
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-violet-700 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/5 hover:-translate-y-1">
                  <span className="text-gray-700 font-mono text-sm mb-2 block">{exp.period}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.role}</h3>
                  <p className="text-slate-700 font-semibold mb-4 leading-normal">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-gray-700 text-sm flex gap-2 leading-relaxed">
                        <span className="text-violet-600">•</span>
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
      <footer className="py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-700 text-sm font-mono mt-8 leading-relaxed">
            &copy; {new Date().getFullYear()} illu. Designed with React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;