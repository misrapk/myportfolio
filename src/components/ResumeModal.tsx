import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles,
  Trophy
} from 'lucide-react';
import { personalInfo, experiences, projects, certifications, honorsAndAwards } from '../data/portfolioData';
import { downloadResumePDF, getPlainTextResume } from '../utils/resumeDownload';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadResumePDF();
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleCopyText = async () => {
    const text = getPlainTextResume();
    await navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="resume-modal-backdrop" 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div 
        id="resume-modal-container"
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                Peeyush Kant Misra — Official Resume
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified PDF
                </span>
              </h2>
              <p className="text-xs text-slate-300 font-mono">
                Anthropic Claude Certified Developer • Ex-Amazon & Cognizant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Primary Download Button */}
            <button
              id="resume-modal-download-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer disabled:opacity-50"
              title="Download official PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            {/* Print Button */}
            <button
              id="resume-modal-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700"
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Copy Plain Text */}
            <button
              id="resume-modal-copy-text-btn"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700"
              title="Copy plain text formatted for job portals"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              id="resume-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Resume Document Sheet */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950 flex justify-center">
          <article 
            id="printable-resume-sheet"
            className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-6 sm:p-10 space-y-7 text-slate-800 dark:text-slate-100 font-sans"
          >
            {/* Document Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  {personalInfo.name.toUpperCase()}
                </h1>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono">
                  Claude Certified Developer
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mt-1">
                Data Scientist & Machine Learning Engineer
              </p>

              <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-600 dark:text-slate-300 font-mono mt-3">
                <span><strong>Email:</strong> {personalInfo.email}</span>
                <span><strong>Phone:</strong> {personalInfo.phone}</span>
                <span><strong>Location:</strong> {personalInfo.location}</span>
              </div>
              <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 dark:text-slate-400 font-mono mt-1.5">
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">
                  linkedin.com/in/peeyushkmisra
                </a>
                <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">
                  github.com/misrapk
                </a>
                <a href={personalInfo.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">
                  youtube.com/@peeyushkmisra
                </a>
              </div>
            </header>

            {/* Professional Summary */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-900/60 pb-1 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {personalInfo.bio} Winner of <strong>IIT BHU Technex 2020 Machine Learning Challenge</strong> (ranked 1st out of 150+ national teams with 93% model accuracy). Selected as <strong>Cognizant Vibe Coding Finalist</strong> contributing to a Guinness World Record. Conferred the <strong>Unacademy Emerging Educator Award</strong> for mentoring 400+ students with 750+ published educational ML tutorials.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-900/60 pb-1 mb-2.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Core Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">Languages & Frameworks: </span>
                  <span className="text-slate-600 dark:text-slate-300">Python (NumPy, Pandas, Scikit-learn), C++, SQL (PostgreSQL, MySQL), JavaScript, TypeScript, React</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">Machine Learning & AI: </span>
                  <span className="text-slate-600 dark:text-slate-300">Supervised & Unsupervised Learning, Random Forest, XGBoost, LightGBM, Regression, Deep Learning, CNNs</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">Generative AI & LLMs: </span>
                  <span className="text-slate-600 dark:text-slate-300">Anthropic Claude (Certified Developer), Claude API & Tool Use, Prompt Optimization, Gemini, RAG Architecture</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">Data & Analytics Tools: </span>
                  <span className="text-slate-600 dark:text-slate-300">Tableau, Matplotlib, Seaborn, AWS (SageMaker concepts), Docker, Git/GitHub, Linux, REST APIs</span>
                </div>
              </div>
            </section>

            {/* Work Experience */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-900/60 pb-1 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Professional Work Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="text-xs space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{exp.company}</span>
                        <span className="text-slate-400 mx-2">•</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{exp.role}</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">{exp.period} | {exp.location}</span>
                    </div>

                    <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="leading-relaxed">{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Key ML Projects */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-900/60 pb-1 mb-3 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Featured Machine Learning Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{proj.title}</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {proj.metrics.map(m => `${m.label}: ${m.value}`).slice(0, 2).join(' | ')}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications & Honors */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-900/60 pb-1 mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Accredited Certifications & Key Honors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                      <span className="text-[11px] text-slate-500 block">{c.issuer} ({c.period})</span>
                    </div>
                  </div>
                ))}
                {honorsAndAwards.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{h.title}</span>
                      <span className="text-[11px] text-slate-500 block">{h.organization} ({h.year})</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-900/60 pb-1 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Education
              </h2>
              <div className="text-xs flex flex-wrap justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Bachelor of Technology (B.Tech) in Computer Science and Engineering
                  </span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">2017 – 2021</span>
              </div>
            </section>
          </article>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>ATS-Friendly 2-Page Vector PDF (15.6 KB)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/Peeyush_Kant_Misra_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
