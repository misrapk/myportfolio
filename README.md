# Peeyush Kant Misra | Data Scientist & Machine Learning Engineer Portfolio

An interactive, high-performance web portfolio highlighting the work, machine learning projects, enterprise experience, research, teaching curriculum, and certifications of **Peeyush Kant Misra** — Data Scientist, ML Engineer, Educator, and Anthropic Claude Certified Developer.

---

## 🌟 Executive Summary

- **Role:** Data Scientist & Machine Learning Engineer
- **Experience:** 4+ Years of Industry Experience (Cognizant Technology Solutions, Amazon, Unacademy)
- **Education & Credentials:**
  - **Claude Certified Developer - Foundations** (Anthropic)
  - **Claude Certified Associate - Foundations** (Anthropic)
  - **Deep Learning Specialization** (Coursera / deeplearning.ai — Andrew Ng)
  - **AWS Machine Learning** (Amazon Web Services)
  - **B.Tech in Computer Science & Engineering** (CGC-COE, PTU)
- **Key Distinctions:**
  - **1st Prize Winner — Technex '20 Machine Learning Challenge**, Indian Institute of Technology (IIT BHU), Varanasi (ranked 1st out of 150+ teams nationwide with 93% model accuracy).
  - **Cognizant Vibe Coding Finalist** & Contributor to a Guinness World Record tech initiative.
  - **Emerging Educator Award** (Unacademy) — Mentored 400+ students and published 750+ technical educational videos.
  - **HackerRank Gold Badge** (5-Star Problem Solving).

---

## 🚀 Interactive Application Features

1. **Interactive ML Model Playground**
   - **Heart Disease Risk Classifier:** Interactive clinical assessment simulation featuring age, cholesterol, systolic blood pressure, resting ECG, and calibrated probability outputs.
   - **FASTag Highway Toll Fraud Detection:** Transaction anomaly model using temporal velocity and transaction delta thresholds.
   - **Student Academic Performance Predictor:** Multivariable regression model analyzing study time, historical exam grades, and absence factors.

2. **Diagnostics & Data Visualizations**
   - **Model Trade-off Scatter Plot:** Benchmarking accuracy vs. inference latency across XGBoost, Random Forest, Logistic Regression, and Neural Networks.
   - **Confusion Matrix & ROC-AUC:** Interactive visual matrix displaying true positives, false positives, sensitivity, specificity, and PR-AUC.
   - **Feature Importance Diagnostics:** Quantified permutation and Gini impurity feature contributions.

3. **Recruiter 30-Second Snapshot Modal**
   - Built specifically for technical recruiters and hiring managers to review verified competencies, tech stack radar, core metrics, and one-click contact channels in under 30 seconds.

4. **Teaching Leadership & Curriculum Hub**
   - Showcases 750+ educational videos covering Machine Learning, Python, C++, and Data Structures & Algorithms.
   - Direct integration with YouTube playlists and curated student feedback.

5. **Theme Engine & Responsive Craft**
   - System-adaptive and user-toggled Light / Dark mode with high contrast ratios.
   - Responsive design tailored for mobile, tablet, laptop, and ultra-wide displays.
   - Accessible, high-fidelity micro-interactions powered by `motion/react`.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Motion](https://motion.dev/) (`motion/react`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting & Validation:** TypeScript compiler (`tsc --noEmit`)

---

## 📂 Project Structure

```text
├── public/
│   ├── peeyush-profile.jpg           # Verified high-resolution profile portrait
│   └── assets/                       # Static assets
├── src/
│   ├── components/
│   │   ├── Avatar.tsx                # Dynamic profile portrait with ambient glow & verified badge
│   │   ├── CertificationsAndAwards.tsx # Claude certifications, IIT BHU prize, & credentials
│   │   ├── ContactSection.tsx        # Direct contact form, mailto trigger, and quick copy
│   │   ├── DataVisualizations.tsx    # Interactive model accuracy, latency, and ROC-AUC charts
│   │   ├── ExperienceTimeline.tsx    # Professional career milestones (Cognizant, Amazon, Unacademy)
│   │   ├── Footer.tsx                # Site map, social profiles, and copyright notice
│   │   ├── Hero.tsx                  # Headline, summary statistics, primary CTAs, & avatar
│   │   ├── InteractiveModelModal.tsx # In-browser interactive ML inference simulators
│   │   ├── Navbar.tsx                # Responsive navigation with dark mode switch & quick links
│   │   ├── ProjectsShowcase.tsx      # Production ML project cards with GitHub and demo links
│   │   ├── RecruiterSnapshotModal.tsx# Fast 30-second recruitment brief
│   │   ├── SkillsMatrix.tsx          # Categorized, filterable technical skill proficiencies
│   │   └── TeachingAndCurriculum.tsx # Unacademy & YouTube curriculum statistics
│   ├── data/
│   │   └── portfolioData.ts          # Central source of truth for portfolio content & metrics
│   ├── types.ts                      # Shared TypeScript interfaces and data models
│   ├── App.tsx                       # Main application component and modal state handlers
│   ├── main.tsx                      # React root rendering entry point
│   └── index.css                     # Tailwind CSS global styles
├── index.html                        # HTML entry point with metadata, SEO, and OpenGraph tags
├── metadata.json                     # Application manifest & capabilities
├── package.json                      # Project dependencies and npm scripts
├── tsconfig.json                     # TypeScript compiler configuration
└── vite.config.ts                    # Vite build configuration
```

---

## 💻 Local Setup & Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### 1. Clone the repository
```bash
git clone https://github.com/misrapk/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 4. Run type check and lint
```bash
npm run lint
```

### 5. Build for production
```bash
npm run build
```
The compiled, production-ready static assets (including the automatically generated `Peeyush_Kant_Misra_Resume.pdf`) will be output to the `dist/` directory.

---

## 📄 Resume Download & Verification

The portfolio includes multiple options to access and download the official resume:
- **Direct PDF Download:** Generates and serves a clean, ATS-compliant 2-page vector PDF (`Peeyush_Kant_Misra_Resume.pdf`).
- **Interactive Document Modal:** Allows recruiters to preview the full document in-browser, copy formatted plain text directly to their clipboard for ATS entry, or print.
- **Access Points:** Located on the **Top Navbar**, the **Hero action buttons**, the **30-Second Recruiter Brief Modal**, and the **Footer**.

---

## 🌐 How to Publish to Vercel (100% Free)

This project has been pre-configured with `vercel.json` for seamless zero-configuration deployment on [Vercel's Free Hobby Tier](https://vercel.com).

### Method 1: Deploy via GitHub (Recommended — Continuous Deployment)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add resume download and Vercel configuration"
   git push origin main
   ```

2. **Sign up / Log in to Vercel:**
   - Go to [https://vercel.com/signup](https://vercel.com/signup) and choose **Continue with GitHub** (Free forever for personal portfolios).

3. **Import your GitHub Repository:**
   - Click **"Add New..."** → **"Project"**.
   - Select your repository (e.g. `portfolio`).
   - Vercel automatically detects the framework as **Vite** and pre-fills:
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`
   - You do **not** need any environment variables for the portfolio frontend.

4. **Click "Deploy":**
   - In less than 60 seconds, your site will be deployed at a live URL such as:
     `https://peeyush-kant-misra-portfolio.vercel.app`
   - Every time you push changes to your `main` branch, Vercel will automatically re-build and deploy your site!

5. **(Optional) Add a Free Custom Domain:**
   - In Vercel Project Settings → **Domains**, add your custom domain (e.g., `peeyushmisra.com` or `peeyush.dev`).
   - Vercel automatically provisions free SSL/TLS certificates and global CDN edge routing.

---

### Method 2: Deploy directly via Vercel CLI

If you prefer deploying from your terminal without opening the web browser:

1. Install the Vercel CLI (or use `npx`):
   ```bash
   npx vercel
   ```
2. Follow the terminal prompts:
   - Log in with your email or GitHub account.
   - Set up and deploy: press `Enter` to accept default project settings.
3. For the production URL:
   ```bash
   npx vercel --prod
   ```

---

## 📬 Connect with Peeyush Kant Misra

- **LinkedIn:** [linkedin.com/in/peeyushkmisra](https://www.linkedin.com/in/peeyushkmisra/)
- **GitHub:** [github.com/misrapk](https://github.com/misrapk)
- **YouTube:** [youtube.com/@peeyushkmisra](https://www.youtube.com/channel/UCgmk1KXmrHXt_DO0kScyVmQ/)
- **Stack Overflow:** [stackoverflow.com/users/13936991/peeyush-kant-misra](https://stackoverflow.com/users/13936991/peeyush-kant-misra)
- **Email:** [Pkmisra1999@gmail.com](mailto:Pkmisra1999@gmail.com)
- **Phone:** +91 9889397735

---

## 📄 License

This project is licensed under the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
