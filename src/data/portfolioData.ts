import { Project, Experience, SkillCategory, Certification, TeachingMetric } from '../types';

export const personalInfo = {
  name: 'Peeyush Kant Misra',
  title: 'Machine Learning Engineer & Data Science Educator',
  subtitles: [
    'Machine Learning & Deep Learning Practitioner',
    'Ex-Amazon SDE Intern & Cognizant Software Engineer',
    '4+ Years Educator with 750+ YouTube DS/ML Videos',
    'Guinness World Records Hackathon Contributor'
  ],
  bio: 'Passionate Data Science & Machine Learning professional with 4+ years of hands-on industry and teaching experience. Proven track record of automating data validation workflows (reducing errors by 25%), designing enterprise analytics dashboards, and training 400+ students in advanced ML algorithms. Published 750+ high-impact educational videos breaking down complex mathematical concepts into intuitive, deployable solutions.',
  email: 'Pkmisra1999@gmail.com',
  phone: '+91 9889397735',
  location: 'India (Open to Global & Remote Roles)',
  status: 'Open to Data Scientist, ML Engineer & Teaching Roles',
  stats: [
    { label: 'Teaching Experience', value: '4+ Years' },
    { label: 'YouTube ML Videos', value: '750+' },
    { label: 'Students Mentored', value: '400+' },
    { label: 'Error Reduction (Cognizant)', value: '25%' },
    { label: 'Content Produced', value: '400+ Hrs' }
  ],
  socials: {
    github: 'https://github.com/misrapk',
    linkedin: 'https://www.linkedin.com/in/peeyushkmisra/',
    youtube: 'https://www.youtube.com/channel/UCgmk1KXmrHXt_DO0kScyVmQ/',
    stackoverflow: 'https://stackoverflow.com/users/13936991/peeyush-kant-misra',
    email: 'mailto:Pkmisra1999@gmail.com'
  }
};

export const experiences: Experience[] = [
  {
    id: 'cognizant',
    role: 'Software Engineer (Associate)',
    company: 'Cognizant Tech Solutions',
    period: 'Sep 2022 - Present',
    type: 'Full-time',
    location: 'India',
    metricsBadge: '25% Error Reduction',
    achievements: [
      'Enhanced automation in end-to-end data validation processes, reducing manual verification errors by 25% and dramatically improving reporting accuracy for enterprise data pipelines.',
      'Designed and engineered scalable automation scripts and validation rules that reduced workflow turnaround time across multi-system data ingestion.',
      'Selected for the final round of Cognizant’s prestigious Vibe Coding Competition by architecting a full-stack AI-assisted application, contributing directly to a Guinness World Record initiative.'
    ],
    keyTechnologies: ['Python', 'SQL', 'Data Validation', 'Automation Pipelines', 'Node.js', 'React']
  },
  {
    id: 'amazon',
    role: 'SDE Intern',
    company: 'Amazon',
    period: 'Aug 2021 - Aug 2022',
    type: 'Internship',
    location: 'India',
    metricsBadge: 'Enterprise Dashboards',
    achievements: [
      'Collaborated closely with the central data analysis team to explore, clean, and interpret massive e-commerce and operational datasets, uncovering actionable insights for strategic business decisions.',
      'Performed high-throughput exploratory data analysis using Python (NumPy, Pandas) and engineered automated reporting workflows, cutting manual reporting time by over 40%.',
      'Developed interactive, high-performance dashboards in Tableau to visualize critical business KPIs and supply chain metrics for director-level leadership teams.'
    ],
    keyTechnologies: ['Python', 'NumPy', 'Pandas', 'Tableau', 'SQL', 'Data Analytics', 'ETL Workflows']
  },
  {
    id: 'unacademy',
    role: 'Coding Educator',
    company: 'Unacademy',
    period: 'May 2020 - Nov 2020',
    type: 'Educator',
    location: 'Remote',
    metricsBadge: 'Emerging Educator Award',
    achievements: [
      'Delivered comprehensive, hands-on training in Python, C++, and applied Machine Learning to over 400 active students, dramatically elevating their technical proficiency and placement readiness.',
      'Designed, scripted, and produced 400+ hours of structured video courses and interactive modules for Computer Science students, supporting diverse learning paces and practical implementations.',
      'Conferred the prestigious "Emerging Educator Award" in recognition of exceptional instructional quality, student retention, and substantial contributions to learner career outcomes.'
    ],
    keyTechnologies: ['Python', 'C++', 'Machine Learning', 'Data Structures', 'Curriculum Design', 'Pedagogy']
  }
];

export const projects: Project[] = [
  {
    id: 'heart-disease',
    title: 'Clinical Heart Disease Risk Predictor',
    subtitle: 'Diagnostic ML Classifier with Explainable EDA & Multi-Model Benchmarking',
    category: 'Predictive Modeling',
    description: 'Developed an end-to-end clinical diagnosis prediction system analyzing 14 physiological biomarkers (resting blood pressure, serum cholesterol, max heart rate, chest pain severity, ST depression). Trained and evaluated Random Forest and XGBoost classifiers after extensive Exploratory Data Analysis (EDA) and outlier imputation.',
    impact: [
      'Achieved 91.4% test accuracy with 0.94 ROC-AUC on clinical validation holdouts',
      'Extracted global feature importances revealing ST depression & chest pain type as paramount predictors',
      'Formulated risk stratification thresholds minimizing False Negatives for early clinical intervention'
    ],
    algorithms: ['Random Forest', 'XGBoost', 'Logistic Regression', 'Feature Importance (SHAP/Gini)'],
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'Seaborn', 'Pandas', 'NumPy', 'Matplotlib'],
    metrics: [
      { label: 'Accuracy', value: '91.4%' },
      { label: 'ROC-AUC', value: '0.942' },
      { label: 'Recall (Sensitivity)', value: '93.1%' },
      { label: 'F1-Score', value: '0.918' }
    ],
    githubUrl: 'https://github.com/misrapk/heart-disease-predictor',
    demoType: 'heart',
    highlights: 'Proper EDA, multi-collinearity checks, hyperparameter grid-search, and clinical risk probability calibration.'
  },
  {
    id: 'fastag-fraud',
    title: 'Fastag Electronic Toll Fraud Detection',
    subtitle: 'Anomaly Detection & Deep Classification for High-Frequency Highway Transactions',
    category: 'Fraud & Anomaly Detection',
    description: 'Constructed an automated real-time fraud detection pipeline for Fastag toll transponders. Modeled temporal velocity anomalies, toll plaza hop distance irregularities, and tag balance discrepancies using advanced feature engineering, SMOTE imbalance remediation, and Deep Neural Networks alongside Random Forest ensembles.',
    impact: [
      'Handled severe transaction class imbalance (1:140 fraud ratio) via SMOTE & class-weighted loss functions',
      'Detected suspicious toll hops and ghost-vehicle clone tags with 94.8% precision at under 45ms inference latency',
      'Engineered 22 composite temporal-spatial features capturing anomalous vehicle speeds and route deviations'
    ],
    algorithms: ['Artificial Neural Networks (MLP)', 'Random Forest', 'SMOTE Resampling', 'Isolation Forest'],
    techStack: ['Python', 'TensorFlow/Keras', 'Scikit-Learn', 'Pandas', 'NumPy', 'Seaborn'],
    metrics: [
      { label: 'Precision', value: '94.8%' },
      { label: 'Recall', value: '89.6%' },
      { label: 'False Alarm Rate', value: '0.8%' },
      { label: 'PR-AUC', value: '0.925' }
    ],
    githubUrl: 'https://github.com/misrapk/fastag-fraud-detection',
    demoType: 'fraud',
    highlights: 'Temporal velocity feature engineering, synthetic oversampling, and multi-layer neural architecture.'
  },
  {
    id: 'student-grade',
    title: 'Student Academic Performance & Grade Predictor',
    subtitle: 'Multi-Variable Regression & Feature Selection for Educational Success Forecasting',
    category: 'Machine Learning',
    description: 'Engineered an educational data mining system predicting final student examination scores and risk of academic probation. Synthesized demographic markers, weekly study time, attendance ratios, and parental educational background using Ridge/Lasso regularization and Recursive Feature Elimination (RFE).',
    impact: [
      'Identified study consistency and prior cumulative GPA as the top 2 driving regressors, explaining 84% of variance (R² = 0.84)',
      'Automated proactive notification triggers for students flagged as falling below target grade percentiles',
      'Mitigated demographic bias through fair feature normalization and cross-validated residual diagnostics'
    ],
    algorithms: ['Ridge Regression', 'Lasso Regularization', 'RFE Feature Selection', 'Polynomial Regressors'],
    techStack: ['Python', 'Scikit-Learn', 'Statsmodels', 'Pandas', 'Matplotlib', 'NumPy'],
    metrics: [
      { label: 'R² Score', value: '0.842' },
      { label: 'RMSE', value: '2.31 pts' },
      { label: 'MAE', value: '1.74 pts' },
      { label: 'Features Selected', value: '8 of 26' }
    ],
    githubUrl: 'https://github.com/misrapk/student-grade-predictor',
    demoType: 'grade',
    highlights: 'Recursive feature elimination, residual homoscedasticity testing, and actionable retention insights.'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Machine Learning & Deep Learning',
    iconName: 'Cpu',
    skills: [
      { name: 'Scikit-Learn', level: 95, highlight: true },
      { name: 'TensorFlow', level: 90, highlight: true },
      { name: 'Keras', level: 90, highlight: true },
      { name: 'Random Forest & Ensembles', level: 94, highlight: true },
      { name: 'XGBoost', level: 92, highlight: true },
      { name: 'Neural Networks (ANN/MLP)', level: 88, highlight: true },
      { name: 'Feature Engineering & Selection', level: 95, highlight: true },
      { name: 'Hyperparameter Tuning & Cross-Val', level: 92 }
    ]
  },
  {
    category: 'Data Analysis & Exploration',
    iconName: 'BarChart3',
    skills: [
      { name: 'Pandas', level: 96, highlight: true },
      { name: 'NumPy', level: 95, highlight: true },
      { name: 'Matplotlib', level: 92 },
      { name: 'Seaborn', level: 92 },
      { name: 'Exploratory Data Analysis (EDA)', level: 96, highlight: true },
      { name: 'Statistical Hypothesis Testing', level: 88 },
      { name: 'Data Cleaning & Validation', level: 94, highlight: true }
    ]
  },
  {
    category: 'Programming & Web Technologies',
    iconName: 'Code2',
    skills: [
      { name: 'Python', level: 98, highlight: true },
      { name: 'SQL', level: 94, highlight: true },
      { name: 'C++', level: 86 },
      { name: 'JavaScript / TypeScript', level: 84 },
      { name: 'Node.js', level: 82 },
      { name: 'React', level: 84 },
      { name: 'Git & GitHub', level: 92 }
    ]
  },
  {
    category: 'Databases & Big Data Stores',
    iconName: 'Database',
    skills: [
      { name: 'MySQL', level: 92, highlight: true },
      { name: 'MongoDB', level: 86 },
      { name: 'SQLite', level: 90 },
      { name: 'Relational Schema Design', level: 90 },
      { name: 'Query Optimization & Indexing', level: 88 }
    ]
  },
  {
    category: 'Business Intelligence & Visualization',
    iconName: 'PieChart',
    skills: [
      { name: 'Tableau', level: 92, highlight: true },
      { name: 'Power BI', level: 88, highlight: true },
      { name: 'Microsoft Excel (Advanced/VBA)', level: 90 },
      { name: 'Interactive Dashboards', level: 94, highlight: true },
      { name: 'Executive Reporting', level: 90 }
    ]
  },
  {
    category: 'Generative AI & LLM Ecosystem',
    iconName: 'Sparkles',
    skills: [
      { name: 'Anthropic Claude (Certified Developer)', level: 96, highlight: true },
      { name: 'Tool Calling & Claude API Integration', level: 95, highlight: true },
      { name: 'Google Gemini & AI Studio', level: 92, highlight: true },
      { name: 'Hugging Face Transformers', level: 88, highlight: true },
      { name: 'OpenAI (ChatGPT & API)', level: 92 },
      { name: 'Prompt Engineering & Constitutional AI', level: 94, highlight: true },
      { name: 'Microsoft Copilot & Perplexity AI', level: 90 }
    ]
  }
];

export const teachingExpertise: TeachingMetric[] = [
  {
    label: 'YouTube Educational Videos',
    value: '750+',
    description: 'Comprehensive tutorials covering Python, C++, Data Science, Machine Learning, and Deep Learning with step-by-step code demonstrations.',
    icon: 'Video'
  },
  {
    label: 'Active Students Trained',
    value: '400+',
    description: 'Conducted live masterclasses and interactive sessions at Unacademy, guiding students from fundamentals to job-ready competence.',
    icon: 'Users'
  },
  {
    label: 'Curriculum Courseware',
    value: '400+ Hrs',
    description: 'Engineered modular, problem-first syllabi with real-world case studies, mathematical derivations, and hands-on Jupyter notebook projects.',
    icon: 'BookOpen'
  },
  {
    label: 'Emerging Educator Award',
    value: 'Top Honor',
    description: 'Formally recognized by Unacademy for exceptional instructional rating, conceptual clarity, and student placement success.',
    icon: 'Award'
  }
];

export const certifications: Certification[] = [
  {
    id: 'claude-dev',
    name: 'Claude Certified Developer - Foundations',
    issuer: 'Anthropic',
    period: '2024',
    credentialUrl: 'https://www.linkedin.com/in/peeyushkmisra/',
    skillsGained: ['Claude API & SDK Architecture', 'Tool Use & Function Calling', 'Structured JSON Outputs', 'Context Window Management', 'Agentic Systems & Workflows']
  },
  {
    id: 'claude-associate',
    name: 'Claude Certified Associate - Foundations',
    issuer: 'Anthropic',
    period: '2024',
    credentialUrl: 'https://www.linkedin.com/in/peeyushkmisra/',
    skillsGained: ['Generative AI Architecture', 'Constitutional AI & Model Alignment', 'Enterprise LLM Integration', 'Prompt Optimization Strategies']
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning Specialization',
    issuer: 'Coursera (deeplearning.ai / Andrew Ng)',
    period: '05/2020 - 08/2020',
    credentialUrl: 'https://www.coursera.org',
    skillsGained: ['Neural Networks & Deep Learning', 'Hyperparameter Tuning', 'CNN Architectures', 'Sequence Models / RNNs']
  },
  {
    id: 'aws-ml',
    name: 'AWS Machine Learning',
    issuer: 'Amazon Web Services (AWS)',
    period: '05/2020',
    credentialUrl: 'https://aws.amazon.com',
    skillsGained: ['Cloud ML Pipelines', 'SageMaker Concepts', 'Model Hosting & Inference', 'Data Engineering']
  },
  {
    id: 'michigan-python',
    name: 'Python Programming',
    issuer: 'University of Michigan (Coursera)',
    period: '08/2020',
    credentialUrl: 'https://www.coursera.org',
    skillsGained: ['Data Structures in Python', 'Web Scraping & APIs', 'Object-Oriented Design', 'Algorithmic Problem Solving']
  },
  {
    id: 'sql-datascience',
    name: 'SQL for Data Science',
    issuer: 'Coursera (UC Davis)',
    period: '05/2020',
    credentialUrl: 'https://www.coursera.org',
    skillsGained: ['Complex Joins & Subqueries', 'Data Aggregation & Grouping', 'Window Functions', 'Relational Filtering']
  }
];

export const honorsAndAwards = [
  {
    title: '1st Prize - Technex 2020 Machine Learning Challenge',
    organization: 'Indian Institute of Technology (IIT BHU), Varanasi',
    year: '2020',
    description: 'Secured 1st Place across 150+ teams nationwide in the prestigious IIT BHU Machine Learning competition with 93% model efficiency.'
  },
  {
    title: 'Cognizant Vibe Coding Finalist & Guinness World Record',
    organization: 'Cognizant Technology Solutions',
    year: '2023',
    description: 'Selected for the final round of the global Vibe Coding competition, directly contributing to a Guinness World Record tech initiative.'
  },
  {
    title: 'Gold Badge - Problem Solving',
    organization: 'HackerRank',
    year: 'Continuous',
    description: 'Earned 5-Star / Gold Badge distinction in algorithmic problem solving and data structures.'
  },
  {
    title: 'Emerging Educator Award',
    organization: 'Unacademy',
    year: '2020',
    description: 'Recognized with the Emerging Educator Award for exemplary teaching of Machine Learning and Python, mentoring 400+ active learners.'
  }
];

export const modelBenchmarkingData = [
  {
    model: 'Random Forest Classifier',
    accuracy: 91.4,
    precision: 92.0,
    recall: 93.1,
    f1: 91.8,
    aucRoc: 94.2,
    latency: '12ms',
    bestFor: 'Clinical risk scoring & non-linear physiological interactions'
  },
  {
    model: 'XGBoost Gradient Boosted Trees',
    accuracy: 92.3,
    precision: 93.5,
    recall: 91.8,
    f1: 92.6,
    aucRoc: 95.1,
    latency: '16ms',
    bestFor: 'Tabular optimization and high-precision screening'
  },
  {
    model: 'Deep Neural Network (MLP)',
    accuracy: 90.1,
    precision: 94.8,
    recall: 89.6,
    f1: 92.1,
    aucRoc: 92.5,
    latency: '34ms',
    bestFor: 'Fastag high-dimensional transaction embeddings & fraud hops'
  },
  {
    model: 'Ridge & Lasso Regularized Regressors',
    accuracy: 84.2, // R2 score
    precision: 87.0,
    recall: 86.4,
    f1: 86.7,
    aucRoc: 89.0,
    latency: '4ms',
    bestFor: 'Transparent student grade prediction & feature weighting'
  }
];

export const teachingTopicBreakdown = [
  { topic: 'Machine Learning & Ensembles', count: 240, percentage: 32, color: '#3b82f6' },
  { topic: 'Python Programming Core', count: 185, percentage: 25, color: '#10b981' },
  { topic: 'Deep Learning & Neural Nets', count: 140, percentage: 19, color: '#8b5cf6' },
  { topic: 'Data Analysis & Wrangling (Pandas/SQL)', count: 115, percentage: 15, color: '#f59e0b' },
  { topic: 'Data Structures & C++', count: 70, percentage: 9, color: '#ec4899' }
];
