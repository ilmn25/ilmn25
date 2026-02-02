import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200 hover:border-slate-400 transition-all duration-300 p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-slate-500/5 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        <div className="p-4 rounded-2xl bg-slate-900 text-white group-hover:bg-black transition-all duration-200 group-hover:scale-110 shadow-lg shadow-slate-100">
          {project.category === 'game' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
          ) : project.category === 'web' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          )}
        </div>
        <div className="flex gap-2">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-700 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-500 text-base mb-8 flex-grow leading-relaxed">
        {project.description}
      </p>

      <div className="space-y-3 mb-8">
        {project.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
            <span className="text-slate-900 mt-1 font-bold">›</span>
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;