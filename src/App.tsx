/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { DataVisualizations } from './components/DataVisualizations';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TeachingAndCurriculum } from './components/TeachingAndCurriculum';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CertificationsAndAwards } from './components/CertificationsAndAwards';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RecruiterSnapshotModal } from './components/RecruiterSnapshotModal';
import { InteractiveModelModal } from './components/InteractiveModelModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  // Dark mode state: default to dark for data science aesthetic, or user system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [recruiterModalOpen, setRecruiterModalOpen] = useState<boolean>(false);
  const [modelModalOpen, setModelModalOpen] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [activeModelDemo, setActiveModelDemo] = useState<'heart' | 'grade' | 'fraud'>('heart');

  // Synchronize HTML element class with dark mode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleOpenModelDemo = (demoType: 'heart' | 'grade' | 'fraud') => {
    setActiveModelDemo(demoType);
    setModelModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenRecruiterSnapshot={() => setRecruiterModalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Avatar & Recruiter Highlights */}
        <Hero
          onOpenRecruiterSnapshot={() => setRecruiterModalOpen(true)}
          onOpenModelPlayground={() => handleOpenModelDemo('heart')}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* 2. Dedicated Project Showcase with Live Test CTAs */}
        <ProjectsShowcase onOpenModelDemo={handleOpenModelDemo} />

        {/* 3. Interactive Data Visualizations & Model Diagnostics */}
        <DataVisualizations />

        {/* 4. Industry Experience Timeline (Cognizant, Amazon, Unacademy) */}
        <ExperienceTimeline />

        {/* 5. Teaching Leadership & YouTube Impact (750+ Videos, 400+ Students) */}
        <TeachingAndCurriculum />

        {/* 6. Skills Matrix & Filterable Technology Stack */}
        <SkillsMatrix />

        {/* 7. Certifications & Recognized Honors */}
        <CertificationsAndAwards />

        {/* 8. Direct Contact & Collaboration Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Recruiter Quick Snapshot Modal */}
      <RecruiterSnapshotModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
        onOpenResume={() => {
          setRecruiterModalOpen(false);
          setResumeModalOpen(true);
        }}
      />

      {/* Full Resume Document Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Live Interactive Machine Learning Model Simulator Modal */}
      <InteractiveModelModal
        isOpen={modelModalOpen}
        onClose={() => setModelModalOpen(false)}
        initialProject={activeModelDemo}
      />
    </div>
  );
}
