import React from 'react';
import { ArrowUp, Github, Linkedin, Youtube, Mail, Heart, Sparkles, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { downloadResumePDF } from '../utils/resumeDownload';

interface FooterProps {
  onOpenResume?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 py-12 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
              <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">
                PK
              </span>
              <span>{personalInfo.name}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
              Machine Learning Engineer • Data Scientist • 750+ DS/ML Videos
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.email}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Email Peeyush Kant Misra"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Peeyush Kant Misra. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={() => (onOpenResume ? onOpenResume() : downloadResumePDF())}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Download Resume (PDF)</span>
            </button>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span>Cognizant Tech Solutions</span>
            <span>•</span>
            <span>Ex-Amazon</span>
            <span>•</span>
            <span>Unacademy Awardee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
