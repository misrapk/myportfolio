import React from 'react';
import {
  Video,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  Lightbulb,
  Youtube,
  ExternalLink,
  Presentation,
  Compass
} from 'lucide-react';
import { teachingExpertise, personalInfo } from '../data/portfolioData';

export const TeachingAndCurriculum: React.FC = () => {
  const pedagogicalPillars = [
    {
      title: 'Curriculum Design & Course Structuring',
      desc: 'Architecting modular, outcome-oriented learning progressions from mathematical fundamentals to production deployment.'
    },
    {
      title: 'Live Interactive Coding Sessions',
      desc: 'Conducting real-time problem-solving workshops and code-alongs with live debugging in Python and C++.'
    },
    {
      title: 'Concept Simplification & Visual Intuition',
      desc: 'Translating rigorous mathematical concepts (backprop, loss gradients, eigenvalues) into visual, intuitive mental models.'
    },
    {
      title: 'Hands-on Project-Based Learning',
      desc: 'Guiding students to build end-to-end data pipelines, exploratory dashboards, and deployed ML microservices.'
    },
    {
      title: 'Industry-Oriented ML Training',
      desc: 'Focusing on clean code standards, test validation, edge-case analysis, and reproducible experimentation.'
    },
    {
      title: 'Student Mentorship & Career Guidance',
      desc: 'Personalized resume audits, technical mock interviews, and personalized career trajectories for 400+ learners.'
    }
  ];

  return (
    <section
      id="teaching"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
              <Presentation className="w-3.5 h-3.5" />
              <span>Pedagogy & Community Impact</span>
            </div>
            <h2
              id="teaching-section-title"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Teaching & Curriculum Leadership
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Simplifying complex mathematical theories into intuitive explanations. 4+ years of online education, 750+ published videos, and hundreds of upskilled students.
            </p>
          </div>

          <a
            href={personalInfo.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors self-start md:self-auto"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit YouTube Channel (750+ Videos)</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

        {/* 4 Main Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {teachingExpertise.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  {idx === 0 && <Video className="w-5 h-5" />}
                  {idx === 1 && <Users className="w-5 h-5" />}
                  {idx === 2 && <BookOpen className="w-5 h-5" />}
                  {idx === 3 && <Award className="w-5 h-5" />}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {metric.value}
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  {metric.label}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Teaching Methodology Pillars */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Instructional Pillars & Curricular Competencies
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Unacademy & YouTube Methodologies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedagogicalPillars.map((pillar, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex flex-col justify-start"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
