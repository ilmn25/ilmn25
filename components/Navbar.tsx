import React from 'react';

interface NavbarProps {
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
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
            <div className="ml-10 flex items-baseline space-x-8">
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')} 
                className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                About
              </a>
              <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')} 
                className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Featured Work
              </a>
              <a 
                href="#experience" 
                onClick={(e) => scrollToSection(e, 'experience')} 
                className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Work Experience
              </a>
              <a 
                href="mailto:kilmn025@gmail.com" 
                onClick={(e) => e.currentTarget.blur()}
                className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;