import { jsPDF } from 'jspdf';
import { personalInfo, experiences, projects, certifications, honorsAndAwards } from '../data/portfolioData';

/**
 * Triggers direct download of the official pre-rendered Peeyush Kant Misra Resume PDF.
 * Falls back to dynamic client-side jsPDF generation if network fetch is blocked.
 */
export async function downloadResumePDF(): Promise<void> {
  const fileName = 'Peeyush_Kant_Misra_Resume.pdf';
  const filePath = `/${fileName}`;

  try {
    // Try fetching the pre-built PDF file from /public
    const res = await fetch(filePath, { method: 'HEAD' });
    if (res.ok) {
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  } catch {
    // Network or sandboxed environment error, proceed with dynamic client-side generation
  }

  // Dynamic fallback using client-side jsPDF
  generateAndDownloadClientPDF();
}

/**
 * Dynamically builds and downloads the resume PDF in the client's browser using jsPDF
 */
export function generateAndDownloadClientPDF(): void {
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

  function checkPageBreak(requiredHeight: number): boolean {
    if (y + requiredHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  }

  function addSectionHeader(title: string): void {
    checkPageBreak(12);
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(24, 43, 73);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  }

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text(personalInfo.name.toUpperCase(), margin, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235);
  doc.text('Data Scientist & Machine Learning Engineer | Anthropic Claude Certified Developer', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${personalInfo.email}   |   Phone: ${personalInfo.phone}   |   Location: ${personalInfo.location}`, margin, y);
  y += 4;
  doc.text('LinkedIn: linkedin.com/in/peeyushkmisra   |   GitHub: github.com/misrapk   |   YouTube: @peeyushkmisra', margin, y);
  y += 5;

  // Professional Summary
  addSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryText = 'Results-driven Data Science and Machine Learning professional with 4+ years of hands-on experience in enterprise analytics, data validation automation, and technical education. Anthropic Claude Certified Developer with proven expertise in automating high-volume workflows (reduced data validation errors by 25% at Cognizant), conducting exploratory data analysis at Amazon, and mentoring 400+ students with 750+ published educational ML videos. 1st Place Winner at IIT BHU Technex 2020 Machine Learning Challenge (1st of 150+ teams).';
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 3.8 + 2;

  // Technical Skills
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

  // Professional Experience
  addSectionHeader('Professional Experience');
  experiences.forEach(exp => {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.company, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`${exp.period}  |  ${exp.location}`, pageWidth - margin, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(8.5);
    doc.text(`${exp.role} (${exp.metricsBadge})`, margin, y);
    y += 4;

    exp.achievements.forEach(ach => {
      checkPageBreak(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const splitBullet = doc.splitTextToSize(`•  ${ach}`, contentWidth - 4);
      doc.text(splitBullet, margin + 2, y);
      y += splitBullet.length * 3.8 + 1;
    });
    y += 2;
  });

  // Selected Projects
  addSectionHeader('Selected Machine Learning Projects');
  projects.forEach(proj => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(`•  ${proj.description}`, contentWidth - 4);
    doc.text(splitDesc, margin + 2, y);
    y += splitDesc.length * 3.8 + 2;
  });

  // Certifications & Honors
  addSectionHeader('Certifications & Honors');
  const allHonors = [
    ...certifications.map(c => `${c.name} (${c.issuer}, ${c.period})`),
    ...honorsAndAwards.map(h => `${h.title} — ${h.organization} (${h.year})`)
  ];

  allHonors.forEach(item => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`•  ${item}`, margin, y);
    y += 4;
  });
  y += 2;

  // Education
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

  doc.save('Peeyush_Kant_Misra_Resume.pdf');
}

/**
 * Returns plain text representation of the resume for quick copy-pasting to job portals / ATS
 */
export function getPlainTextResume(): string {
  return `===============================================================
PEEYUSH KANT MISRA
Data Scientist & Machine Learning Engineer
Anthropic Claude Certified Developer
===============================================================

CONTACT
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Location: ${personalInfo.location}
- LinkedIn: https://www.linkedin.com/in/peeyushkmisra/
- GitHub: https://github.com/misrapk
- YouTube: https://www.youtube.com/channel/UCgmk1KXmrHXt_DO0kScyVmQ/

SUMMARY
Results-driven Data Science and Machine Learning professional with 4+ years of hands-on experience in enterprise analytics, data validation automation, and technical education. Anthropic Claude Certified Developer with proven expertise in automating high-volume workflows (reduced data validation errors by 25% at Cognizant), conducting exploratory data analysis at Amazon, and mentoring 400+ students with 750+ published educational ML videos. 1st Place Winner at IIT BHU Technex 2020 Machine Learning Challenge (1st of 150+ teams).

CORE TECHNICAL SKILLS
- Programming Languages: Python (NumPy, Pandas, Scikit-learn), C++, SQL (PostgreSQL, MySQL), JavaScript, TypeScript
- Machine Learning & AI: Supervised & Unsupervised Learning, Random Forest, XGBoost, LightGBM, Neural Networks
- Generative AI & LLMs: Anthropic Claude (Certified Developer), Claude API & Tool Calling, Prompt Architecture, Gemini, RAG
- Data & Visualization: Tableau, Matplotlib, Seaborn, Feature Engineering, EDA, Cross-Validation, Anomaly Detection
- Tools & Platforms: Git, GitHub, AWS (SageMaker concepts), Docker, Linux, REST APIs, Jupyter Notebooks

PROFESSIONAL EXPERIENCE
1. Cognizant Technology Solutions — Software Engineer (Associate) (Sep 2022 – Present)
   - Engineered end-to-end data validation pipelines and automation rules, slashing verification error rates by 25% across high-throughput enterprise data streams.
   - Built automated multi-system reconciliation scripts in Python & SQL, cutting report generation cycle times and improving data reliability for client deliverables.
   - Selected for the final round of Cognizant’s global Vibe Coding Competition by architecting a full-stack AI application, directly contributing to a Guinness World Records achievement.

2. Amazon — SDE Intern (Aug 2021 – Aug 2022)
   - Collaborated with central analytics teams to clean, transform, and analyze massive operational datasets, reducing manual data analysis overhead by over 40%.
   - Conducted exploratory data analysis (EDA) and data wrangling utilizing Python (NumPy, Pandas) to extract trends and supply chain optimization insights.
   - Built high-impact executive BI dashboards in Tableau to visualize delivery metrics and service level benchmarks for director-level leadership.

3. Unacademy — Coding & Machine Learning Educator (May 2020 – Nov 2020)
   - Mentored and instructed 400+ students in Python, C++, Object-Oriented Design, and applied Machine Learning, elevating technical placement readiness.
   - Designed and produced 400+ hours of structured video lessons and curriculum, breaking down complex data structures and algorithmic concepts.
   - Awarded the Unacademy "Emerging Educator Award" for outstanding instructional clarity, learner satisfaction, and course completion rates.

KEY MACHINE LEARNING PROJECTS
- Clinical Heart Disease Risk Prediction System (Python, Scikit-learn, Random Forest, XGBoost): Achieved 91.4% test accuracy with 0.94 ROC-AUC on clinical validation holdouts with calibrated risk probabilities.
- FASTag Toll Anomaly & Fraud Detection Classifier (Python, Neural Networks, SMOTE): Attained 94.7% accuracy with <0.8% false alarm rate using temporal transaction velocity features.
- Student Academic Performance & Retention Modeling (Python, Multivariate Regression): Isolated key dropout indicators with R² = 0.842 and 1.74 MAE across 600+ student profiles.

ACCREDITED CERTIFICATIONS & HONORS
- Claude Certified Developer - Foundations (Anthropic, 2024)
- Claude Certified Associate - Foundations (Anthropic, 2024)
- 1st Prize Winner — Technex 2020 Machine Learning Challenge, IIT (BHU) Varanasi (Ranked 1st of 150+ teams, 93% accuracy)
- Cognizant Vibe Coding Finalist & Guinness World Records Hackathon Contributor
- Deep Learning Specialization (Coursera / deeplearning.ai — Andrew Ng)
- AWS Machine Learning (Amazon Web Services)
- HackerRank Gold Badge (5-Star in Problem Solving & Algorithms)
- Emerging Educator Award (Unacademy)

EDUCATION
- Bachelor of Technology (B.Tech) in Computer Science and Engineering (2017 – 2021)
===============================================================`;
}
