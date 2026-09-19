import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

function generateResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function checkPageBreak(requiredHeight) {
    if (y + requiredHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  }

  function addSectionHeader(title) {
    checkPageBreak(12);
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(24, 43, 73); // Deep navy
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(37, 99, 235); // Blue divider
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  }

  // --- Header ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text('PEEYUSH KANT MISRA', margin, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235);
  doc.text('Data Scientist & Machine Learning Engineer | Anthropic Claude Certified Developer', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const contactLine1 = 'Email: Pkmisra1999@gmail.com   |   Phone: +91 9889397735   |   Location: India (Open to Global & Remote)';
  doc.text(contactLine1, margin, y);
  y += 4;

  const contactLine2 = 'LinkedIn: linkedin.com/in/peeyushkmisra   |   GitHub: github.com/misrapk   |   YouTube: @peeyushkmisra';
  doc.text(contactLine2, margin, y);
  y += 5;

  // --- Executive Summary ---
  addSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryText = 'Results-driven Data Science and Machine Learning professional with 4+ years of hands-on experience in enterprise analytics, data validation automation, and technical education. Anthropic Claude Certified Developer with proven expertise in automating high-volume workflows (reduced data validation errors by 25% at Cognizant), conducting exploratory data analysis at Amazon, and mentoring 400+ students with 750+ published educational ML videos. 1st Place Winner at IIT BHU Technex 2020 Machine Learning Challenge (1st of 150+ teams).';
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 3.8 + 2;

  // --- Core Technical Skills ---
  addSectionHeader('Technical Skills');
  const skillItems = [
    { category: 'Programming Languages', skills: 'Python (NumPy, Pandas, Scikit-learn), C++, SQL (PostgreSQL, MySQL), JavaScript, TypeScript' },
    { category: 'Machine Learning & AI', skills: 'Supervised/Unsupervised Learning, Random Forest, XGBoost, LightGBM, Regression, Neural Networks' },
    { category: 'Generative AI & LLMs', skills: 'Anthropic Claude (Certified Developer), Claude API & Tool Calling, Prompt Architecture, Gemini, RAG' },
    { category: 'Data & Visualization', skills: 'Tableau, Matplotlib, Seaborn, Feature Engineering, EDA, Cross-Validation, Anomaly Detection' },
    { category: 'Tools & Platforms', skills: 'Git/GitHub, AWS (SageMaker concepts), Docker, Linux, REST APIs, Jupyter Notebooks' }
  ];

  skillItems.forEach(item => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(`•  ${item.category}: `, margin, y);
    const catWidth = doc.getTextWidth(`•  ${item.category}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(item.skills, margin + catWidth, y);
    y += 4;
  });
  y += 2;

  // --- Work Experience ---
  addSectionHeader('Professional Experience');

  // Cognizant
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Cognizant Technology Solutions', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Sep 2022 – Present  |  India', pageWidth - margin, y, { align: 'right' });
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.setFontSize(8.5);
  doc.text('Software Engineer (Associate) — Data Validation & Automation', margin, y);
  y += 4;

  const cogBullets = [
    'Engineered end-to-end data validation pipelines and automation rules, slashing verification error rates by 25% across high-throughput enterprise data streams.',
    'Built automated multi-system reconciliation scripts in Python & SQL, cutting report generation cycle times and improving data reliability for client deliverables.',
    'Selected for the final round of Cognizant’s global Vibe Coding Competition by architecting a full-stack AI application, directly contributing to a Guinness World Records achievement.'
  ];
  cogBullets.forEach(bullet => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const splitBullet = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 4);
    doc.text(splitBullet, margin + 2, y);
    y += splitBullet.length * 3.8 + 1;
  });
  y += 2;

  // Amazon
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Amazon', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Aug 2021 – Aug 2022  |  India', pageWidth - margin, y, { align: 'right' });
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.setFontSize(8.5);
  doc.text('Software Development Engineering (SDE) Intern — Business Analytics & Reporting', margin, y);
  y += 4;

  const amzBullets = [
    'Collaborated with central analytics teams to clean, transform, and analyze massive operational datasets, reducing manual data analysis overhead by over 40%.',
    'Conducted exploratory data analysis (EDA) and data wrangling utilizing Python (NumPy, Pandas) to extract trends and supply chain optimization insights.',
    'Built high-impact executive BI dashboards in Tableau to visualize delivery metrics and service level benchmarks for director-level leadership.'
  ];
  amzBullets.forEach(bullet => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const splitBullet = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 4);
    doc.text(splitBullet, margin + 2, y);
    y += splitBullet.length * 3.8 + 1;
  });
  y += 2;

  // Unacademy
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Unacademy', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('May 2020 – Nov 2020  |  Remote', pageWidth - margin, y, { align: 'right' });
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.setFontSize(8.5);
  doc.text('Coding & Machine Learning Educator (Emerging Educator Award Winner)', margin, y);
  y += 4;

  const unaBullets = [
    'Mentored and instructed 400+ students in Python, C++, Object-Oriented Design, and applied Machine Learning, elevating technical placement readiness.',
    'Designed and produced 400+ hours of structured video lessons and curriculum, breaking down complex data structures and algorithmic concepts.',
    'Awarded the Unacademy "Emerging Educator Award" for outstanding instructional clarity, learner satisfaction, and course completion rates.'
  ];
  unaBullets.forEach(bullet => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const splitBullet = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 4);
    doc.text(splitBullet, margin + 2, y);
    y += splitBullet.length * 3.8 + 1;
  });
  y += 2;

  // --- Key Projects ---
  addSectionHeader('Selected Machine Learning Projects');

  const projectItems = [
    {
      title: 'Clinical Heart Disease Risk Prediction System',
      tech: 'Python, Scikit-learn, Random Forest, XGBoost, Streamlit',
      desc: 'Engineered a diagnostic model evaluating 14 physiological biomarkers. Conducted multi-collinearity analysis and hyperparameter tuning to achieve 91.4% test accuracy with 0.94 ROC-AUC and calibrated risk probabilities.'
    },
    {
      title: 'FASTag Toll Anomaly & Fraud Detection Classifier',
      tech: 'Python, Neural Networks, Pandas, SMOTE, Scikit-learn',
      desc: 'Built an automated highway toll fraud detection system utilizing temporal transaction velocity features and synthetic minority oversampling. Attained 94.7% accuracy with <0.8% false alarm rate.'
    },
    {
      title: 'Student Academic Performance & Retention Modeling',
      tech: 'Python, Multivariate Linear/Ridge Regression, EDA',
      desc: 'Analyzed socio-demographic and behavioral attributes across 600+ students. Achieved R² = 0.842 with 1.74 MAE, isolating key dropout indicators for proactive intervention.'
    }
  ];

  projectItems.forEach(proj => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`[${proj.tech}]`, pageWidth - margin, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(`•  ${proj.desc}`, contentWidth - 4);
    doc.text(splitDesc, margin + 2, y);
    y += splitDesc.length * 3.8 + 2;
  });

  // --- Certifications & Honors ---
  addSectionHeader('Certifications & Honors');

  const certHonors = [
    'Claude Certified Developer - Foundations (Anthropic, 2024)',
    'Claude Certified Associate - Foundations (Anthropic, 2024)',
    '1st Prize Winner — Technex 2020 ML Challenge, IIT BHU Varanasi (Outperformed 150+ teams nationwide with 93% model accuracy)',
    'Cognizant Vibe Coding Finalist & Guinness World Record Hackathon Contributor',
    'Deep Learning Specialization (Coursera / deeplearning.ai — Andrew Ng)',
    'AWS Machine Learning (Amazon Web Services)',
    'HackerRank Gold Badge (5-Star in Problem Solving & Algorithms)',
    'SQL for Data Science (Coursera / UC Davis) & Python Programming (Univ. of Michigan)'
  ];

  certHonors.forEach(item => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`•  ${item}`, margin, y);
    y += 4;
  });
  y += 2;

  // --- Education ---
  addSectionHeader('Education');
  checkPageBreak(10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Bachelor of Technology (B.Tech) in Computer Science and Engineering', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('2017 – 2021', pageWidth - margin, y, { align: 'right' });
  y += 5;

  // Output to buffer
  const pdfOutput = doc.output('arraybuffer');
  const buffer = Buffer.from(pdfOutput);
  
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'Peeyush_Kant_Misra_Resume.pdf');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Resume PDF generated successfully at: ${outputPath} (${buffer.length} bytes)`);
}

generateResumePDF();
