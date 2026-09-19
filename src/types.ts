export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Machine Learning' | 'Predictive Modeling' | 'Fraud & Anomaly Detection';
  description: string;
  impact: string[];
  algorithms: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  demoType: 'grade' | 'heart' | 'fraud';
  highlights: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'Full-time' | 'Internship' | 'Educator';
  location: string;
  achievements: string[];
  keyTechnologies: string[];
  metricsBadge?: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  period: string;
  credentialUrl?: string;
  skillsGained: string[];
}

export interface TeachingMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
}
