import React, { useState } from 'react';
import {
  Code,
  Github,
  Play,
  Layers,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Sparkles,
  Database,
  Cpu,
  Activity,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsShowcaseProps {
  onOpenModelDemo: (demoType: 'heart' | 'grade' | 'fraud') => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onOpenModelDemo
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Predictive Modeling',
    'Machine Learning',
    'Fraud & Anomaly Detection'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const getProjectIcon = (demoType: string) => {
    switch (demoType) {
      case 'heart':
        return <Activity className="w-5 h-5 text-rose-500" />;
      case 'grade':
        return <GraduationCap className="w-5 h-5 text-emerald-500" />;
      case 'fraud':
        return <ShieldCheck className="w-5 h-5 text-amber-500" />;
      default:
        return <Cpu className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Applied Machine Learning Projects</span>
            </div>
            <h2
              id="projects-section-title"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Dedicated Project Showcase
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Production-grade machine learning pipelines, rigorous Exploratory Data Analysis (EDA), feature engineering, and cross-validated model ensembles with live interactive simulators.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              {/* Card Header & Badge */}
              <div className="p-6 pb-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                        {getProjectIcon(project.demoType)}
                      </div>
                      <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {project.category}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenModelDemo(project.demoType)}
                      id={`btn-live-test-${project.id}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/80 dark:border-blue-800/80 transition-colors"
                      title="Launch live interactive simulator"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Live Test</span>
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                    {project.subtitle}
                  </p>

                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact Highlights */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Key Outcomes & Findings:
                    </span>
                    {project.impact.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics Badges Grid */}
                <div className="mt-5 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 flex flex-col"
                    >
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                        {metric.label}
                      </span>
                      <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips & Action Footer */}
              <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-950/50 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>

                  <button
                    onClick={() => onOpenModelDemo(project.demoType)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Interactive Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
