import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  BarChart3,
  Database,
  PieChart,
  Sparkles,
  Search,
  Check,
  Zap
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-blue-500" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-emerald-500" />;
      case 'Code2':
        return <Code2 className="w-4 h-4 text-indigo-500" />;
      case 'Database':
        return <Database className="w-4 h-4 text-amber-500" />;
      case 'PieChart':
        return <PieChart className="w-4 h-4 text-purple-500" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-teal-500" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-500" />;
    }
  };

  const filteredCategories = skillCategories
    .filter((cat) => activeTab === 'All' || cat.category === activeTab)
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <section
      id="skills"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Technical Competencies</span>
            </div>
            <h2
              id="skills-section-title"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Skills & Technology Stack
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Grounded in rigorous statistical foundations, scalable machine learning frameworks, data engineering, and modern GenAI developer toolchains.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g., Python, Tableau, Scikit)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((c) => (
            <button
              key={c.category}
              onClick={() => setActiveTab(c.category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === c.category
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {getCategoryIcon(c.iconName)}
              <span>{c.category}</span>
            </button>
          ))}
        </div>

        {/* Responsive Grid of Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.category}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {cat.category}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {cat.skills.length} skills listed
                    </span>
                  </div>
                </div>

                {/* Skills with bars */}
                <div className="space-y-3.5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                          {skill.name}
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Primary Industry Strength" />
                          )}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            skill.highlight
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-500'
                              : 'bg-slate-400 dark:bg-slate-600'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Production & Teaching Proven</span>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
