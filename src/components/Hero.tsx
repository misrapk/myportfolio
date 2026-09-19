import React from 'react';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Youtube,
  Mail,
  CheckCircle2,
  Terminal,
  Trophy,
  BarChart3,
  Flame,
  Award,
  Download
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Avatar } from './Avatar';
import { downloadResumePDF } from '../utils/resumeDownload';

interface HeroProps {
  onOpenRecruiterSnapshot: () => void;
  onOpenModelPlayground: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRecruiterSnapshot,
  onOpenModelPlayground,
  onOpenResume
}) => {
  return (
    <section
      id="about"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Dynamic Background Data Grid & Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-400/20 dark:bg-teal-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
            opacity: 0.08
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bio, Badges, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Recruiter Alert Pill */}
            <div
              id="hero-recruiter-badge"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-5 shadow-xs"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Claude Certified Developer • IIT BHU ML Winner • Guinness Record Contributor</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-300">Peeyush Kant Misra</span>
            </h1>

            {/* Sub-headline */}
            <p
              id="hero-role-title"
              className="mt-3 text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 flex flex-wrap items-center gap-2"
            >
              <span>Machine Learning Engineer</span>
              <span className="text-slate-400">•</span>
              <span>Data Scientist</span>
              <span className="text-slate-400">•</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Educator (750+ Videos)</span>
            </p>

            {/* Narrative Bio */}
            <p
              id="hero-narrative-bio"
              className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              Software Engineer at <strong className="text-slate-900 dark:text-slate-200 font-semibold">Cognizant</strong> (enhanced validation pipelines, reducing errors by 25%) and former <strong className="text-slate-900 dark:text-slate-200 font-semibold">Amazon SDE Intern</strong> (automated large-scale Python analytics & Tableau leadership dashboards). Proven educator with <strong className="text-slate-900 dark:text-slate-200 font-semibold">4+ years</strong> of experience, 400+ trained students, and 750+ published YouTube DS/ML videos.
            </p>

            {/* Key Value Proposition Chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Scikit-Learn, TensorFlow, Keras & XGBoost
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Tableau, PowerBI & Exploratory Data Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Python, SQL, C++, Node.js & React
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                id="hero-explore-projects-cta"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Projects & Code</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Download / View Resume CTA */}
              <div className="inline-flex items-stretch rounded-xl shadow-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:-translate-y-0.5 transition-transform">
                <button
                  id="hero-download-resume-cta"
                  onClick={() => downloadResumePDF()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Direct Download Peeyush's Official PDF Resume"
                >
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Download Resume</span>
                </button>
                <button
                  id="hero-preview-resume-cta"
                  onClick={onOpenResume}
                  className="px-2.5 py-2.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border-l border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Preview full resume document"
                >
                  Preview
                </button>
              </div>

              <button
                id="hero-test-models-cta"
                onClick={onOpenModelPlayground}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-teal-500" />
                <span>Test Live ML Models</span>
              </button>

              <button
                id="hero-quick-brief-cta"
                onClick={onOpenRecruiterSnapshot}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Recruiter 30s Brief</span>
              </button>
            </div>

            {/* Social Links & Direct Contacts */}
            <div className="mt-7 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">
                  Connect:
                </span>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-linkedin"
                  aria-label="Peeyush Kant Misra on LinkedIn"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-github"
                  aria-label="Peeyush Kant Misra on GitHub"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-youtube"
                  aria-label="Peeyush Kant Misra on YouTube"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.email}
                  id="hero-social-email"
                  aria-label="Email Peeyush Kant Misra"
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>Location: India (Remote Ready)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Avatar + Quick Highlights Bento Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Avatar with attached photo */}
            <div className="relative mb-8">
              <Avatar size="lg" showBadge={true} />
            </div>

            {/* Recruiter Quick Snapshot Card */}
            <div
              id="hero-metrics-bento-card"
              className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Track Record At A Glance
                  </span>
                </div>
                <button
                  onClick={onOpenResume}
                  className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 px-2.5 py-0.5 rounded-full font-medium transition-colors cursor-pointer border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1"
                  title="Click to view Peeyush's verified resume"
                >
                  <FileText className="w-3 h-3 text-emerald-500" />
                  <span>Verified Resume</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                    4+
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                    Years Teaching
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    750+
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                    YouTube ML Videos
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-600 dark:text-teal-400">
                    400+
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                    Students Mentored
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    25%
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                    Cognizant Error Red.
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                    400+
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                    Hours Courseware
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-500">
                    Award
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                    Unacademy Emerging
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
