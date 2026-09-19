import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, Menu, X, FileText, Send, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  onOpenRecruiterSnapshot: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenRecruiterSnapshot,
  onOpenResume
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Visualizations', href: '#visualizations' },
    { name: 'Teaching Impact', href: '#teaching' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#about"
          id="nav-logo"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md group-hover:scale-105 transition-transform">
            PK
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              {personalInfo.name}
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" title="Active & Available" />
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Data Scientist & ML Educator
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/60"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side Actions: Snapshot, Resume, Dark Mode & CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Resume View & Download Button */}
          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-lg transition-all shadow-2xs"
            title="View & Download Peeyush's Official Resume"
          >
            <Download className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden xs:inline">Resume</span>
          </button>

          {/* Recruiter Quick Snapshot Button */}
          <button
            id="recruiter-quick-view-btn"
            onClick={onOpenRecruiterSnapshot}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/80 rounded-lg transition-all shadow-xs"
            title="Open 30-second recruiter brief"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Recruiter Quick-View</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle-btn"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Contact / Hire button */}
          <a
            href="#contact"
            id="nav-contact-cta"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 rounded-lg transition-all shadow-sm active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1 shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-4 h-4 text-blue-500" />
              <span>View & Download Resume (PDF)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterSnapshot();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 rounded-lg"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Recruiter Quick-View (30s Brief)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
