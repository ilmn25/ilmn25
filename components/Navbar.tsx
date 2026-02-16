import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronDown,
    Gamepad2,
    Monitor,
    Terminal,
    Palette,
    Database,
    Mail,
    MessageCircle,
    Copy,
    Check,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { PROJECT_NAV, PERSONAL_INFO } from '../constants';

interface NavbarProps {
    scrollToSection: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => void;
    onProjectClick: (id: string) => void;
    basePath: string;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, onProjectClick, basePath }) => {
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [copiedType, setCopiedType] = useState<string | null>(null);

    const projectRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (projectRef.current && !projectRef.current.contains(target)) {
                setIsProjectDropdownOpen(false);
            }
            if (contactRef.current && !contactRef.current.contains(target)) {
                setIsContactDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedType(type);
            setTimeout(() => setCopiedType(null), 2000);
        });
    };

    const getProjectIcon = (id: string, className = "w-4 h-4") => {
        switch (id) {
            case 'unity-game': return <Gamepad2 className={className} />;
            case 'tutor-db': return <Database className={className} />;
            case 'discord-tool': return <Monitor className={className} />;
            case 'spa-tree': return <Terminal className={className} />;
            case 'illustrations': return <Palette className={className} />;
            default: return <Monitor className={className} />;
        }
    };

    return (
        <>
            {/* Desktop Navbar - Fixed with smooth border transition */}
            <nav className={`hidden md:block fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-md border-slate-200 shadow-sm py-0' : 'bg-transparent border-transparent py-2 shadow-none'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <a
                                href="#/"
                                onClick={(e) => scrollToSection(e as any, 'hero')}
                                className="text-2xl font-bold text-slate-900 hover:text-black transition-colors"
                            >
                                illu
                            </a>
                        </div>

                        <div className="flex items-center space-x-2">
                            <a
                                href="#/skills"
                                onClick={(e) => scrollToSection(e as any, 'skills')}
                                className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-xl hover:bg-slate-50 active:scale-95"
                            >
                                Skills
                            </a>
                            <a
                                href="#/experience"
                                onClick={(e) => scrollToSection(e as any, 'experience')}
                                className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-xl hover:bg-slate-50 active:scale-95"
                            >
                                Experience
                            </a>

                            <div
                                className="relative"
                                ref={projectRef}
                                onMouseEnter={() => setIsProjectDropdownOpen(true)}
                                onMouseLeave={() => setIsProjectDropdownOpen(false)}
                            >
                                <button
                                    onClick={(e) => {
                                        scrollToSection(e as any, 'projects');
                                        setIsProjectDropdownOpen(false);
                                    }}
                                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-xl hover:bg-slate-50 active:scale-95"
                                >
                                    Projects
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProjectDropdownOpen && (
                                    <div className="absolute top-full right-0 w-72 pt-2 animate-fade-in z-50">
                                        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 py-2 overflow-hidden">
                                            <div className="px-4 py-2 mb-1 flex justify-between items-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case Studies</p>
                                                <button
                                                    onClick={(e) => {
                                                        scrollToSection(e as any, 'projects');
                                                        setIsProjectDropdownOpen(false);
                                                    }}
                                                    className="text-[9px] font-bold text-slate-900 hover:underline px-1"
                                                >
                                                    View All
                                                </button>
                                            </div>
                                            {PROJECT_NAV.map((link) => (
                                                <button
                                                    key={link.id}
                                                    onClick={() => {
                                                        onProjectClick(link.id);
                                                        setIsProjectDropdownOpen(false);
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
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className="relative"
                                ref={contactRef}
                                onMouseEnter={() => setIsContactDropdownOpen(true)}
                                onMouseLeave={() => setIsContactDropdownOpen(false)}
                            >
                                <button
                                    onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                                    className="bg-slate-900 hover:bg-black text-white ml-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-slate-200/40 hover:scale-105 active:scale-95 hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    Contact
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isContactDropdownOpen && (
                                    <div className="absolute top-full right-0 w-72 pt-2 animate-fade-in z-50">
                                        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/60 p-2 overflow-hidden">
                                            <div className="px-3 py-2 mb-1">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Get in touch</p>
                                            </div>

                                            <button
                                                onClick={() => handleCopy(PERSONAL_INFO.contact.email, 'email')}
                                                className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                        <Mail className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Email</p>
                                                        <p className="text-xs font-bold text-slate-900">{PERSONAL_INFO.contact.email}</p>
                                                    </div>
                                                </div>
                                                {copiedType === 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />}
                                            </button>

                                            <button
                                                onClick={() => handleCopy(PERSONAL_INFO.contact.whatsapp, 'whatsapp')}
                                                className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left mt-1"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                        <MessageCircle className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">WhatsApp</p>
                                                        <p className="text-xs font-bold text-slate-900">{PERSONAL_INFO.contact.whatsapp}</p>
                                                    </div>
                                                </div>
                                                {copiedType === 'whatsapp' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />}
                                            </button>

                                            <div className="mt-2 border-t border-slate-50 pt-3 flex gap-2 px-1 pb-1">
                                                <a
                                                    href="https://mail.google.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 text-center py-2.5 text-[10px] font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    Open Gmail
                                                </a>
                                                <a
                                                    href="https://outlook.office.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 text-center py-2.5 text-[10px] font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    Open Outlook
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar Logo Header - Fixed with smooth border transition */}
            <div className={`md:hidden fixed top-0 left-0 w-full h-16 flex items-center px-4 z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-md border-slate-200' : 'bg-transparent border-transparent'}`}>
                <a
                    href="#/"
                    onClick={(e) => scrollToSection(e as any, 'hero')}
                    className="text-2xl font-bold text-slate-900 active:scale-95 transition-transform block"
                >
                    illu
                </a>
            </div>

            {/* Mobile Menu Backdrop & Container */}
            <div className="md:hidden">
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-[55] bg-slate-900/10 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                <div className="fixed top-3 right-3 z-[60]">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-xl shadow-lg active:scale-90 transition-all hover:bg-black"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5 animate-fade-in" />
                        ) : (
                            <Menu className="w-5 h-5 animate-fade-in" />
                        )}
                    </button>

                    {isMobileMenuOpen && (
                        <div className="absolute top-12 right-0 mt-2 w-[85vw] max-w-[320px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-zoom-in-soft max-h-[80vh] overflow-y-auto">
                            <div className="p-5 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Projects</p>
                                    </div>
                                    <div className="space-y-2">
                                        {PROJECT_NAV.map((link) => (
                                            <button
                                                key={link.id}
                                                onClick={() => {
                                                    onProjectClick(link.id);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 p-2 bg-slate-50 rounded-xl active:bg-slate-100 transition-colors text-left"
                                            >
                                                <div className="p-1.5 rounded-lg bg-white text-slate-900 shadow-sm border border-slate-100">
                                                    {getProjectIcon(link.id, "w-4 h-4")}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-xs font-bold text-slate-900 truncate">{link.label}</p>
                                                    <p className="text-[8px] text-slate-400 uppercase tracking-tighter">{link.category}</p>
                                                </div>
                                                <ChevronRight className="w-3 h-3 text-slate-300" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Contact</p>
                                    <div className="space-y-2">
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                                <p className="text-xs font-bold text-slate-900 truncate">{PERSONAL_INFO.contact.email}</p>
                                            </div>
                                            <button onClick={() => handleCopy(PERSONAL_INFO.contact.email, 'email')} className="p-1.5 text-slate-400 active:scale-90 transition-all shrink-0">
                                                {copiedType === 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <MessageCircle className="w-4 h-4 text-slate-400 shrink-0" />
                                                <p className="text-xs font-bold text-slate-900 truncate">{PERSONAL_INFO.contact.whatsapp}</p>
                                            </div>
                                            <button onClick={() => handleCopy(PERSONAL_INFO.contact.whatsapp, 'whatsapp')} className="p-1.5 text-slate-400 active:scale-90 transition-all shrink-0">
                                                {copiedType === 'whatsapp' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <div className="flex gap-2 pt-2 border-t border-slate-100 mt-2">
                                            <a
                                                href="https://mail.google.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center py-2.5 text-[10px] font-bold text-slate-900 bg-slate-50 border border-slate-100 rounded-xl active:bg-slate-100 transition-colors"
                                            >
                                                Open Gmail
                                            </a>
                                            <a
                                                href="https://outlook.office.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center py-2.5 text-[10px] font-bold text-slate-900 bg-slate-50 border border-slate-100 rounded-xl active:bg-slate-100 transition-colors"
                                            >
                                                Open Outlook
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;