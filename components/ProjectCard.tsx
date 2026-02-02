import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-gray-700/50 transition-all duration-300 p-6 flex flex-col h-full hover:shadow-xl hover:shadow-gray-700/10 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-black text-white group-hover:text-gray-300 transition-all duration-200 group-hover:scale-105">
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
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-gray-100 border border-gray-300 text-gray-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-gray-800 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-700 text-sm mb-6 flex-grow leading-relaxed">
        {project.description}
      </p>

      <div className="space-y-2 mb-6">
        {project.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
            <span className="text-violet-600 mt-1">•</span>
            <span>{h}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-slate-200">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-gray-700 transition-colors hover:-translate-y-0.5"
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