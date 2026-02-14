
import React from 'react';
import { Project } from '../types';
import { Gamepad2, Monitor, Terminal, Palette, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getIcon = () => {
    const iconProps = { className: "w-5 h-5" };
    switch (project.category) {
      case 'game': return <Gamepad2 {...iconProps} />;
      case 'web': return <Monitor {...iconProps} />;
      case 'workflow': return <Terminal {...iconProps} />;
      case 'art': return <Palette {...iconProps} />;
      default: return <Monitor {...iconProps} />;
    }
  };

  const isClickable = !!onClick;

  return (
    <div 
      onClick={onClick}
      className={`group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 p-6 flex flex-col h-full hover:shadow-xl hover:shadow-slate-500/5 hover:-translate-y-0.5 ${isClickable ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-slate-900 text-white group-hover:bg-black transition-all duration-200 group-hover:scale-105 shadow-md shadow-slate-100">
          {getIcon()}
        </div>
        <div className="flex flex-1 flex-wrap justify-end gap-1.5 ml-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <h3 className="text-base md:text-lg font-bold mb-1.5 text-slate-900 group-hover:text-slate-700 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-500 text-sm mb-5 leading-relaxed">
        {project.description}
      </p>

      <div className="space-y-1.5 mb-6">
        {project.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
            <span className="text-slate-400 font-bold">›</span>
            <span>{h}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-slate-50">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card onClick from firing
              e.currentTarget.blur();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-600 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {link.label}
          </a>
        ))}
        {isClickable && (
          <span className="ml-auto text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors flex items-center gap-1 uppercase tracking-widest">
            View Details →
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
