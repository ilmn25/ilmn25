import React from 'react';
import { Project } from '../types';
import { Gamepad2, Monitor, Terminal, Palette, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getIcon = () => {
    const iconProps = { className: "w-6 h-6" };
    switch (project.category) {
      case 'game': return <Gamepad2 {...iconProps} />;
      case 'web': return <Monitor {...iconProps} />;
      case 'workflow': return <Terminal {...iconProps} />;
      case 'art': return <Palette {...iconProps} />;
      default: return <Monitor {...iconProps} />;
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 hover:border-slate-400 transition-all duration-300 p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-slate-500/5 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        <div className="p-4 rounded-2xl bg-slate-900 text-white group-hover:bg-black transition-all duration-200 group-hover:scale-110 shadow-lg shadow-slate-100">
          {getIcon()}
        </div>
        <div className="flex flex-1 flex-wrap justify-end gap-2 ml-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-700 transition-colors hyphens-auto">
        {project.title}
      </h3>
      <p className="text-slate-500 text-base mb-8 leading-relaxed">
        {project.description}
      </p>

      <div className="space-y-3 mb-8">
        {project.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
            <span className="text-slate-900 font-bold">›</span>
            <span>{h}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-slate-50">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.currentTarget.blur()}
            className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-slate-600 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;