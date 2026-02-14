import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Gamepad2, Monitor, Terminal, Palette, Database } from 'lucide-react';
import { PROJECT_NAV } from '../constants';

interface NavbarProps {
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  onContactClick: () => void;
  onProjectClick: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, onContactClick, onProjectClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              onClick={(e) => scrollToSection(e, 'hero')} 
              className="text-2xl font-bold text-slate-900 hover:text-black transition-colors"
            >
              illu
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <a 
                href="#skills" 
                onClick={(e) => scrollToSection(e, 'skills')} 
                className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Skills
              </a>
              <a 
                href="#experience" 
                onClick={(e) => scrollToSection(e, 'experience')} 
                className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Experience
              </a>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  Projects
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div 
                    className="absolute top-full right-0 mt-1 w-72 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 py-2 animate-fade-in overflow-hidden"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Studies</p>
                    </div>
                    {PROJECT_NAV.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          onProjectClick(link.id);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                          {getProjectIcon(link.id)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{link.label}</p>
                          <p className="text-[10px] text-slate-400 group-hover:text-slate-500 font-medium">{link.category}</p>
                        </div>
                      </button>
                    ))}
                    <div className="mt-1 border-t border-slate-50 px-4 py-3">
                      <a 
                        href="#projects" 
                        onClick={(e) => {
                          scrollToSection(e, 'projects');
                          setIsDropdownOpen(false);
                        }}
                        className="text-[10px] font-bold text-slate-900 hover:text-slate-600 uppercase tracking-widest flex items-center justify-between"
                      >
                        View All Projects
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  onContactClick();
                  e.currentTarget.blur();
                }}
                className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;