import React, { useEffect } from 'react';
import { ArrowLeft, FileJson, Layers, CheckCircle2, ExternalLink, FileCode } from 'lucide-react';
import { WORKFLOW_STEPS, WORKFLOW_HIGHLIGHTS, CODE_EXAMPLES, PROJECT_LINKS } from '../data/spaTree';

interface SpaTreeProjectPageProps {
  onBack: () => void;
}

const SpaTreeProjectPage: React.FC<SpaTreeProjectPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-8">
      <style dangerouslySetInnerHTML={{ __html: `
        .code-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .code-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .code-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .code-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
      
      <div className="max-w-4xl mx-auto animate-slide-up">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-8 transition-all group shrink-0"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-4 mb-2"> 
            <h1 className="text-2xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              SPA HTML Tree Specification Generator
            </h1>
            <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-medium rounded-full uppercase tracking-widest">Workflow</span>
          </div>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
            A prompt driven workflow to speed up the migration of legacy SPAs to AI-driven IDEs such as Google AI Studio.
          </p>
        </header>

        {/* Key Outcomes Section - Compact and Less Prominent */}
        <section className="mb-12">
          <div className="py-6 border-y border-slate-200">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" />
              Key Outcomes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {WORKFLOW_HIGHLIGHTS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-slate-500" />
                  </div>
                  <span className="text-slate-600 text-xs leading-relaxed font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Diagram */}
        <section className="mb-16">
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
            
            <h2 className="text-xl font-semibold text-slate-900 mb-10 flex items-center gap-3">
              <Layers className="w-5 h-5" />
              The Pipeline
            </h2>

            <div className="space-y-10">
              {WORKFLOW_STEPS.map((step, i) => (
                <div key={i} className="flex gap-6 md:gap-8 relative group">
                  {i !== WORKFLOW_STEPS.length - 1 && (
                    <div className="absolute left-5 md:left-6 top-12 bottom-[-2.5rem] w-px bg-slate-100"></div>
                  )}
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-semibold shadow-md shadow-slate-200 relative z-10 text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-xs md:text-sm">
                        {step.description}
                      </p>
                    </div>
                    {step.imageUrl && (
                      <div className="shrink-0 w-full md:w-72 aspect-video rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                        <img 
                          src={step.imageUrl} 
                          alt={step.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <FileCode className="w-5 h-5" />
            Process Examples
          </h2>
          <div className="space-y-6">
            {CODE_EXAMPLES.map((example, i) => (
              <div key={i} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between px-5 py-3 bg-slate-800/50 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {example.filename.endsWith('.md') || example.filename.endsWith('.txt') ? <FileJson className="w-3.5 h-3.5 text-blue-400" /> : <FileCode className="w-3.5 h-3.5 text-green-400" />}
                    <span className="text-[10px] font-mono text-slate-400">{example.filename}</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                  </div>
                </div>
                <div className="p-6 overflow-x-auto code-scrollbar">
                  <pre className="text-[10px] md:text-xs font-mono text-slate-400 leading-relaxed whitespace-pre">
                    {example.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col items-center justify-center py-10 border-t border-slate-100">
          <p className="text-slate-400 font-mono text-[9px] mb-5 tracking-widest uppercase">Project Links & Specification</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href={PROJECT_LINKS.before} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-full text-xs font-semibold hover:bg-slate-50 transition-all hover:scale-105 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Original Site
            </a>
            <a 
              href={PROJECT_LINKS.after} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-black transition-all hover:scale-105 shadow-md shadow-slate-200"
            >
              <FileJson className="w-3.5 h-3.5" />
              Sample Result
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaTreeProjectPage;