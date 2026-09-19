import React from 'react';
import {
  Award,
  CheckCircle,
  Trophy,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { certifications } from '../data/portfolioData';

export const CertificationsAndAwards: React.FC = () => {
  return (
    <section
      id="certifications"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Honors & Accredited Certifications</span>
          </div>
          <h2
            id="certifications-section-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Certifications & Industry Recognitions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Verified formal certifications and hackathon distinctions backing applied machine learning and cloud proficiency.
          </p>
        </div>

        {/* Highlight Honors Banners (Technex IIT BHU, Guinness/Cognizant & Unacademy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 text-white shadow-md border border-amber-800/80 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/30">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                National 1st Prize • Technex '20
              </div>
              <h3 className="text-xl font-bold text-white">
                IIT BHU Machine Learning Winner
              </h3>
              <p className="mt-2 text-xs text-amber-100/80 leading-relaxed">
                Secured 1st Prize out of 150+ teams across India in the premier annual technical fest at IIT Varanasi (BHU) by developing a Machine Learning solution achieving 93% efficiency.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-800/60 flex items-center justify-between text-xs font-mono text-amber-200">
              <span>IIT BHU Varanasi</span>
              <span>1st / 150 Teams</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 text-white shadow-md border border-blue-800/80 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-3 border border-blue-400/30">
                <Trophy className="w-3.5 h-3.5 text-blue-300" />
                Guinness World Record & Cognizant
              </div>
              <h3 className="text-xl font-bold text-white">
                Cognizant Vibe Coding Finalist
              </h3>
              <p className="mt-2 text-xs text-blue-100/80 leading-relaxed">
                Selected for the final round of Cognizant’s Vibe Coding Competition by developing an AI-driven full-stack application, contributing directly to a Guinness World Records achievement.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-800/80 flex items-center justify-between text-xs font-mono text-blue-200">
              <span>Cognizant Tech Solutions</span>
              <span>Finalist</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white shadow-md border border-emerald-800/80 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
                <Award className="w-3.5 h-3.5 text-emerald-300" />
                Instructional Excellence Award
              </div>
              <h3 className="text-xl font-bold text-white">
                Unacademy Emerging Educator
              </h3>
              <p className="mt-2 text-xs text-emerald-100/80 leading-relaxed">
                Awarded top recognition for student satisfaction, pedagogical clarity, and producing over 400 hours of curriculum materials that guided 400+ students toward technical mastery.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs font-mono text-emerald-200">
              <span>Unacademy Education</span>
              <span>Top Educator</span>
            </div>
          </div>
        </div>

        {/* Accredited Certifications Grid (Including Claude Certified Developer & Associate) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {cert.period}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {cert.name}
                </h3>

                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {cert.issuer}
                </div>

                {/* Skills gained */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Curriculum Scope:
                  </span>
                  {cert.skillsGained.map((skill, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={cert.credentialUrl || 'https://www.linkedin.com/in/peeyushkmisra/'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-between group/link"
              >
                <span>Verified Credential</span>
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
