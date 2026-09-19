import React, { useState, useMemo } from 'react';
import {
  X,
  Sliders,
  Activity,
  GraduationCap,
  ShieldAlert,
  BarChart2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers
} from 'lucide-react';
import { projects } from '../data/portfolioData';

interface InteractiveModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: 'heart' | 'grade' | 'fraud';
}

export const InteractiveModelModal: React.FC<InteractiveModelModalProps> = ({
  isOpen,
  onClose,
  initialProject = 'heart'
}) => {
  const [activeTab, setActiveTab] = useState<'heart' | 'grade' | 'fraud'>(initialProject);

  // Heart Disease Model Inputs
  const [heartAge, setHeartAge] = useState<number>(54);
  const [heartBps, setHeartBps] = useState<number>(130);
  const [heartChol, setHeartChol] = useState<number>(245);
  const [heartMaxHr, setHeartMaxHr] = useState<number>(150);
  const [heartCp, setHeartCp] = useState<number>(2); // 0: typical, 1: atypical, 2: non-anginal, 3: asymptomatic
  const [heartOldpeak, setHeartOldpeak] = useState<number>(1.2);
  const [heartModel, setHeartModel] = useState<'rf' | 'xgb'>('rf');

  // Grade Predictor Inputs
  const [studyHours, setStudyHours] = useState<number>(18);
  const [attendance, setAttendance] = useState<number>(88);
  const [priorGpa, setPriorGpa] = useState<number>(3.4);
  const [hwCompletion, setHwCompletion] = useState<number>(92);
  const [sleepHours, setSleepHours] = useState<number>(7);

  // Fastag Fraud Detection Inputs
  const [travelSpeed, setTravelSpeed] = useState<number>(95); // km/h
  const [tollFrequency, setTollFrequency] = useState<number>(2); // tolls in past 2 hrs
  const [amountRatio, setAmountRatio] = useState<number>(1.1); // normal = 1.0
  const [balance, setBalance] = useState<number>(180);

  // Calculations for Heart Disease Risk
  const heartResult = useMemo(() => {
    // Model weight approximation based on clinical datasets
    let rawScore = 0;
    rawScore += (heartAge - 40) * 0.45;
    rawScore += (heartBps - 120) * 0.28;
    rawScore += (heartChol - 200) * 0.18;
    rawScore += (160 - heartMaxHr) * 0.35;
    rawScore += heartCp * 8.5;
    rawScore += heartOldpeak * 12.0;

    if (heartModel === 'xgb') {
      rawScore *= 1.04; // slight non-linear tree divergence
    }

    // Sigmoid mapping
    const probability = Math.min(Math.max(1 / (1 + Math.exp(-rawScore / 18)), 0.04), 0.96);
    const percent = Math.round(probability * 100);

    let level: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
    let color = 'text-emerald-600 dark:text-emerald-400';
    let bgColor = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';

    if (percent > 70) {
      level = 'Critical';
      color = 'text-rose-600 dark:text-rose-400';
      bgColor = 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
    } else if (percent > 45) {
      level = 'High';
      color = 'text-amber-600 dark:text-amber-400';
      bgColor = 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    } else if (percent > 25) {
      level = 'Moderate';
      color = 'text-blue-600 dark:text-blue-400';
      bgColor = 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800';
    }

    return { percent, level, color, bgColor };
  }, [heartAge, heartBps, heartChol, heartMaxHr, heartCp, heartOldpeak, heartModel]);

  // Calculations for Student Grade Predictor
  const gradeResult = useMemo(() => {
    // Ridge/Lasso normalized regression formula
    let predictedScore = 42.0;
    predictedScore += (studyHours / 30) * 22.0;
    predictedScore += ((attendance - 50) / 50) * 16.0;
    predictedScore += ((priorGpa - 2.0) / 2.0) * 18.0;
    predictedScore += (hwCompletion / 100) * 12.0;
    predictedScore += Math.max(0, (sleepHours - 5) * 1.5);

    const boundedScore = Math.min(Math.max(predictedScore, 35), 98.5);
    const scoreVal = Number(boundedScore.toFixed(1));

    let letter = 'A';
    if (scoreVal < 60) letter = 'F';
    else if (scoreVal < 70) letter = 'D';
    else if (scoreVal < 80) letter = 'C';
    else if (scoreVal < 90) letter = 'B+';
    else letter = 'A';

    return {
      score: scoreVal,
      letter,
      ciLow: Math.max(30, Number((scoreVal - 2.8).toFixed(1))),
      ciHigh: Math.min(100, Number((scoreVal + 2.8).toFixed(1)))
    };
  }, [studyHours, attendance, priorGpa, hwCompletion, sleepHours]);

  // Calculations for Fastag Toll Fraud
  const fraudResult = useMemo(() => {
    let anomalyScore = 5;
    // Speed anomaly (if vehicle travels > 130 km/h between toll booths, strong clone/ghost tag signal)
    if (travelSpeed > 140) anomalyScore += 55;
    else if (travelSpeed > 115) anomalyScore += 25;

    // Toll frequency anomaly (e.g. 5+ tolls in 2 hrs is physically suspicious)
    if (tollFrequency >= 5) anomalyScore += 45;
    else if (tollFrequency >= 3) anomalyScore += 18;

    // Amount deviation
    if (amountRatio > 2.0) anomalyScore += 30;
    else if (amountRatio > 1.4) anomalyScore += 12;

    // Low balance with high frequency
    if (balance < 50 && tollFrequency >= 2) anomalyScore += 15;

    const finalScore = Math.min(Math.max(anomalyScore, 3), 99);

    let status = 'Legitimate Transaction';
    let badgeColor = 'bg-emerald-500 text-white';
    if (finalScore >= 75) {
      status = 'HIGH FRAUD RISK - Clone Tag / Speed Anomaly Detected';
      badgeColor = 'bg-rose-600 text-white';
    } else if (finalScore >= 40) {
      status = 'SUSPICIOUS - Flagged for Automated Audit';
      badgeColor = 'bg-amber-500 text-white';
    }

    return { score: finalScore, status, badgeColor };
  }, [travelSpeed, tollFrequency, amountRatio, balance]);

  if (!isOpen) return null;

  return (
    <div
      id="interactive-model-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Live Machine Learning Model Simulator
                <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  Interactive Sandbox
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust features in real-time to observe decision boundary calculations and model inference
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Model Simulator Modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Tabs Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-100/50 dark:bg-slate-900/50 overflow-x-auto gap-2 py-2">
          <button
            onClick={() => setActiveTab('heart')}
            id="tab-btn-heart"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'heart'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-rose-500" />
            <span>Heart Disease Classifier</span>
          </button>

          <button
            onClick={() => setActiveTab('grade')}
            id="tab-btn-grade"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'grade'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span>Student Grade Predictor</span>
          </button>

          <button
            onClick={() => setActiveTab('fraud')}
            id="tab-btn-fraud"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'fraud'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Fastag Fraud Detection</span>
          </button>
        </div>

        {/* Modal Body: Active Model Interactive Workspace */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: Heart Disease Predictor */}
          {activeTab === 'heart' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60">
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <strong className="font-semibold text-blue-700 dark:text-blue-300">Clinical Focus:</strong>{' '}
                  Trained on multi-biomarker cohort data using Scikit-Learn & XGBoost. Outperformed single tree baseline with 91.4% test accuracy.
                </div>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className="text-slate-500">Model Engine:</span>
                  <button
                    onClick={() => setHeartModel('rf')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      heartModel === 'rf'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Random Forest (100 Trees)
                  </button>
                  <button
                    onClick={() => setHeartModel('xgb')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      heartModel === 'xgb'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    XGBoost Booster
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sliders Input Panel */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Patient Physiological Parameters
                  </h3>

                  {/* Age */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Patient Age</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{heartAge} years</span>
                    </div>
                    <input
                      type="range"
                      min={28}
                      max={78}
                      value={heartAge}
                      onChange={(e) => setHeartAge(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Resting Blood Pressure */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Resting Blood Pressure</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{heartBps} mm Hg</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={200}
                      value={heartBps}
                      onChange={(e) => setHeartBps(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Serum Cholesterol */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Serum Cholesterol</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{heartChol} mg/dl</span>
                    </div>
                    <input
                      type="range"
                      min={130}
                      max={420}
                      value={heartChol}
                      onChange={(e) => setHeartChol(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Max Heart Rate */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Max Heart Rate Achieved (thalach)</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{heartMaxHr} bpm</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={210}
                      value={heartMaxHr}
                      onChange={(e) => setHeartMaxHr(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* ST Depression (oldpeak) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">ST Depression Induced by Exercise</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{heartOldpeak}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={4.5}
                      step={0.1}
                      value={heartOldpeak}
                      onChange={(e) => setHeartOldpeak(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Chest Pain Select */}
                  <div className="space-y-1 pt-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Chest Pain Type (cp)
                    </label>
                    <select
                      value={heartCp}
                      onChange={(e) => setHeartCp(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <option value={0}>Typical Angina (Low CAD Risk Marker)</option>
                      <option value={1}>Atypical Angina</option>
                      <option value={2}>Non-Anginal Pain</option>
                      <option value={3}>Asymptomatic (Highest CAD Risk Indicator)</option>
                    </select>
                  </div>
                </div>

                {/* Live Model Output Display */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className={`p-5 rounded-2xl border ${heartResult.bgColor} flex flex-col items-center text-center`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Predicted Disease Probability
                    </span>

                    {/* Circular visual score */}
                    <div className="my-3 relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-200 dark:text-slate-800" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 * (1 - heartResult.percent / 100)}
                          strokeLinecap="round"
                          className={heartResult.percent > 50 ? 'text-rose-500' : 'text-emerald-500'}
                          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className={`text-3xl font-extrabold ${heartResult.color}`}>
                          {heartResult.percent}%
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {heartModel.toUpperCase()} Score
                        </span>
                      </div>
                    </div>

                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      Risk Stratification: <span className={heartResult.color}>{heartResult.level}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                      {heartResult.percent > 60
                        ? 'High likelihood of coronary artery narrowing. Immediate clinical cardiology review & angiography advised.'
                        : heartResult.percent > 30
                        ? 'Borderline cardiac markers detected. Recommend lifestyle modification and regular ambulatory monitoring.'
                        : 'Normal cardiac profile within safe non-pathological variance baseline.'}
                    </p>
                  </div>

                  {/* Feature Importance Insight */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                      <span>Top Feature Impact</span>
                      <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">SHAP Val</span>
                    </div>
                    <div className="space-y-1.5">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>ST Depression (oldpeak)</span>
                          <span>+32% weight</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.min(heartOldpeak * 22, 100)}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>Chest Pain Category</span>
                          <span>+28% weight</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${((heartCp + 1) / 4) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>Max Heart Rate Drop</span>
                          <span>+21% weight</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.max(10, (200 - heartMaxHr) * 0.8)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Student Grade Predictor */}
          {activeTab === 'grade' && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-emerald-700 dark:text-emerald-300">Regression Methodology:</strong>{' '}
                Predicted student academic outcomes using Ridge & Lasso Regularization with Recursive Feature Elimination (RFE) to eliminate confounding demographic factors and prevent overfitting.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sliders Input Panel */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Academic & Study Habits Inputs
                  </h3>

                  {/* Weekly Study Hours */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Weekly Self-Study Time</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{studyHours} hrs/week</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={35}
                      value={studyHours}
                      onChange={(e) => setStudyHours(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Attendance Rate */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Class Attendance Rate</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{attendance}%</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={attendance}
                      onChange={(e) => setAttendance(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Prior GPA */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Prior Cumulative GPA</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{priorGpa.toFixed(1)} / 4.0</span>
                    </div>
                    <input
                      type="range"
                      min={2.0}
                      max={4.0}
                      step={0.1}
                      value={priorGpa}
                      onChange={(e) => setPriorGpa(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Homework completion */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Assignment & Lab Completion</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{hwCompletion}%</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={hwCompletion}
                      onChange={(e) => setHwCompletion(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Sleep Duration */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Average Daily Sleep</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{sleepHours} hours</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={10}
                      value={sleepHours}
                      onChange={(e) => setSleepHours(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Grade Output */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="p-5 rounded-2xl border bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 flex flex-col items-center text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Forecasted Exam Result
                    </span>

                    <div className="my-3 flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {gradeResult.score}%
                      </span>
                      <span className="text-2xl font-bold text-slate-700 dark:text-slate-300 font-mono">
                        (Grade {gradeResult.letter})
                      </span>
                    </div>

                    {/* Confidence Interval band */}
                    <div className="w-full bg-white dark:bg-slate-800 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 text-xs">
                      <div className="flex justify-between font-mono text-slate-600 dark:text-slate-300">
                        <span>95% CI Lower: <strong>{gradeResult.ciLow}%</strong></span>
                        <span>Upper: <strong>{gradeResult.ciHigh}%</strong></span>
                      </div>
                      <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full relative overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{
                            marginLeft: `${gradeResult.ciLow}%`,
                            width: `${gradeResult.ciHigh - gradeResult.ciLow}%`
                          }}
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-3 leading-normal">
                      {gradeResult.score >= 85
                        ? 'High academic standing. On pace for Dean\'s Honor Roll distinction.'
                        : gradeResult.score >= 70
                        ? 'Consistent passing progress. Minor boost in study hours recommended.'
                        : 'At-risk threshold. Academic coaching and intervention recommended.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      Model Goodness of Fit
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono mt-2">
                      <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <div className="text-slate-500">R² Score</div>
                        <div className="font-bold text-blue-600">0.842</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <div className="text-slate-500">RMSE</div>
                        <div className="font-bold text-emerald-600">2.31 pts</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <div className="text-slate-500">MAE</div>
                        <div className="font-bold text-purple-600">1.74 pts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Fastag Fraud Detection */}
          {activeTab === 'fraud' && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-amber-700 dark:text-amber-300">Fastag Highway Telemetry:</strong>{' '}
                Evaluates spatial-temporal impossible velocities (e.g. tag scanned at Plaza A and Plaza B 80km away in 20 minutes indicates RFID cloning fraud) using SMOTE-balanced Neural Networks.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sliders Input Panel */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Toll Telemetry Parameters
                  </h3>

                  {/* Travel Speed between Toll Plazas */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Implied Inter-Plaza Speed</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{travelSpeed} km/h</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={180}
                      value={travelSpeed}
                      onChange={(e) => setTravelSpeed(Number(e.target.value))}
                      className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500 flex justify-between">
                      <span>Normal traffic (&lt;100 km/h)</span>
                      <span className="text-rose-500 font-medium">&gt;130 km/h: Physically impossible clone</span>
                    </div>
                  </div>

                  {/* Toll Frequency in last 2 hrs */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Toll Transactions in Past 2 Hours</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{tollFrequency} swipes</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      value={tollFrequency}
                      onChange={(e) => setTollFrequency(Number(e.target.value))}
                      className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Transaction Amount vs Vehicle Class baseline */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Fee Ratio vs Vehicle Class</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{amountRatio.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0.8}
                      max={3.0}
                      step={0.1}
                      value={amountRatio}
                      onChange={(e) => setAmountRatio(Number(e.target.value))}
                      className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Tag Balance */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300">Current Prepaid Tag Balance</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">${balance}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      value={balance}
                      onChange={(e) => setBalance(Number(e.target.value))}
                      className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Fraud Result */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="p-5 rounded-2xl border bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Neural Anomaly Probability
                    </span>

                    <div className="my-3 flex items-center justify-center">
                      <div className="text-4xl font-extrabold font-mono">
                        <span className={fraudResult.score > 50 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                          {fraudResult.score}%
                        </span>
                      </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs ${fraudResult.badgeColor}`}>
                      {fraudResult.status}
                    </div>

                    {/* Simulated Neural Network Weight Matrix */}
                    <div className="w-full mt-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-left">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between mb-2">
                        <span>MLP Hidden Layers: [64, 32, 8, 1]</span>
                        <span className="text-emerald-500">Latency: 38ms</span>
                      </div>
                      <div className="flex items-center justify-between gap-1 py-1">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-6 flex-1 rounded-sm transition-all duration-300 ${
                              i < Math.round((fraudResult.score / 100) * 8)
                                ? 'bg-rose-500 opacity-90'
                                : 'bg-slate-200 dark:bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      Fraud Mitigation Impact
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      High precision classifier (94.8%) prevents false blacklisting of commuters while catching unauthorized cloned transponders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Interactive AI Model Simulation v2.4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 rounded-lg transition-colors"
          >
            Done Testing
          </button>
        </div>
      </div>
    </div>
  );
};
