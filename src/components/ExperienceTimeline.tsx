import React from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Trophy,
  Building2,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2
            id="experience-section-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Work Experience & Industry Impact
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Demonstrated track record spanning enterprise software engineering at Cognizant, large-scale data analytics at Amazon, and high-impact curriculum instruction.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {exp.type}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                      <Building2 className="w-4 h-4" />
                      {exp.company}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1 text-slate-500 font-normal text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  {exp.metricsBadge && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      {exp.metricsBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* Achievements bullet list */}
              <div className="mt-5 space-y-3">
                {exp.achievements.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Technologies footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1">
                  Core Technologies:
                </span>
                {exp.keyTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
