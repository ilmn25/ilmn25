import React from 'react';
import { PERSONAL_INFO } from '../constants';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const whatsappNumber = PERSONAL_INFO.contact.whatsapp.replace(/\D/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const emailLink = `mailto:${PERSONAL_INFO.contact.email}`;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div 
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
          aria-label="Close contact modal"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>

        <h2 id="contact-modal-title" className="text-2xl font-bold text-slate-900 mb-2">Get in Touch</h2>
        <p className="text-slate-500 mb-8">Feel free to reach out through email or WhatsApp.</p>

        <div className="space-y-4">
          {/* Email */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Email</p>
            <p className="text-slate-800 font-semibold">{PERSONAL_INFO.contact.email}</p>
          </div>

          {/* Phone */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">WhatsApp</p>
            <p className="text-slate-800 font-semibold">{PERSONAL_INFO.contact.whatsapp}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href={emailLink} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
            Email Me
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;