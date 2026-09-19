import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  Printer,
  Trophy,
  Briefcase
} from 'lucide-react';
import { personalInfo, experiences, certifications } from '../data/portfolioData';

interface RecruiterSnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterSnapshotModal: React.FC<RecruiterSnapshotModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      id="recruiter-snapshot-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/15">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Recruiter 30-Second Candidate Brief
              </h2>
              <p className="text-xs text-blue-100">
                Key metrics, verified track record, and interview readiness
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Recruiter Brief"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200">
          {/* Candidate Overview Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {personalInfo.name}
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Active" />
              </div>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                Data Scientist & ML Engineer • 4+ Yrs Teaching
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Cognizant Software Engineer (Associate) • Ex-Amazon SDE Intern
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 shadow-xs"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied Email' : 'Copy Email'}</span>
              </button>

              <button
                onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 shadow-xs"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Phone className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? 'Copied Phone' : 'Copy Phone'}</span>
              </button>
            </div>
          </div>

          {/* 5 Quantifiable Impact Bullets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              Top 5 High-Impact Differentiators
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>25% Error Reduction at Cognizant:</strong> Automated complex data validation processes, elevating reporting precision across enterprise pipelines.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Anthropic Claude Certified Developer:</strong> Certified in Claude Foundations & Developer tool use, prompt architecture, and agentic workflows.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>IIT BHU Technex ML Winner:</strong> 1st Prize across 150+ teams nationwide with 93% model accuracy in Machine Learning.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Amazon SDE Internship:</strong> Conducted large-scale Python (NumPy) analytics and built executive Tableau dashboards for leadership teams.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Educator & Content Creator:</strong> Published 750+ YouTube educational videos and produced 400+ curriculum hours covering Python, C++, Data Science, and Machine Learning.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Unacademy Emerging Educator Award:</strong> Trained over 400 students in ML and algorithmic problem-solving with top instructional ratings.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Cognizant Vibe Coding Finalist:</strong> Designed full-stack AI-powered application and contributed directly to Guinness World Records initiative.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Technical Stack Pillbox */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Primary Technical Arsenal
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {[
                'Python',
                'SQL',
                'Scikit-Learn',
                'TensorFlow',
                'Keras',
                'XGBoost',
                'Random Forest',
                'Pandas',
                'NumPy',
                'Tableau',
                'Power BI',
                'EDA',
                'MySQL',
                'MongoDB',
                'Node.js',
                'React',
                'C++',
                'Hugging Face',
                'Gemini AI'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrintResume}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Resume</span>
          </button>

          <a
            href={personalInfo.socials.email}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Invite to Interview / Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
