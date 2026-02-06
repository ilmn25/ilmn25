import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { X, Mail, MessageCircle } from 'lucide-react';

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
          <X className="w-6 h-6" />
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
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;