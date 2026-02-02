import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-slate-900">
              illu
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-slate-900 hover:text-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5">About</a>
              <a href="#projects" className="text-slate-900 hover:text-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5">Projects</a>
              <a href="#experience" className="text-slate-900 hover:text-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5">Experience</a>
              <a href="#skills" className="text-slate-900 hover:text-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5">Skills</a>
              <a href="mailto:kilmn025@gmail.com" className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-gray-700/20 hover:scale-105 hover:-translate-y-0.5">
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