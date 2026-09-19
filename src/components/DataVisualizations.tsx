import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Activity,
  CheckCircle2,
  PieChart,
  HelpCircle,
  Cpu,
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';
import { modelBenchmarkingData, teachingTopicBreakdown } from '../data/portfolioData';

export const DataVisualizations: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'precision' | 'recall' | 'f1' | 'aucRoc'>('aucRoc');
  const [activeModelIdx, setActiveModelIdx] = useState<number>(0);
  const [decisionThreshold, setDecisionThreshold] = useState<number>(0.50);

  const activeModel = modelBenchmarkingData[activeModelIdx];

  // Dynamically compute confusion matrix based on model and threshold slider
  // High threshold = higher precision, lower recall (fewer false positives, more false negatives)
  // Low threshold = higher recall, lower precision
  const confusionData = React.useMemo(() => {
    const totalSamples = 1000;
    const prevalence = 0.25; // 250 positive cases, 750 negative cases
    const totalActualPositives = 250;
    const totalActualNegatives = 750;

    // Shift sensitivity and specificity based on threshold deviation from 0.50
    const thresholdShift = (decisionThreshold - 0.5) * 1.8;
    const baseSensitivity = (activeModel.recall / 100);
    const baseSpecificity = (activeModel.precision / 100) * 0.96;

    const actualSensitivity = Math.min(Math.max(baseSensitivity - thresholdShift * 0.35, 0.40), 0.99);
    const actualSpecificity = Math.min(Math.max(baseSpecificity + thresholdShift * 0.35, 0.40), 0.99);

    const truePositives = Math.round(totalActualPositives * actualSensitivity);
    const falseNegatives = totalActualPositives - truePositives;

    const trueNegatives = Math.round(totalActualNegatives * actualSpecificity);
    const falsePositives = totalActualNegatives - trueNegatives;

    const precisionCalc = ((truePositives / (truePositives + falsePositives || 1)) * 100).toFixed(1);
    const recallCalc = ((truePositives / (totalActualPositives || 1)) * 100).toFixed(1);
    const f1Calc = ((2 * (Number(precisionCalc) * Number(recallCalc))) / ((Number(precisionCalc) + Number(recallCalc)) || 1)).toFixed(1);

    return {
      tp: truePositives,
      fp: falsePositives,
      tn: trueNegatives,
      fn: falseNegatives,
      precision: precisionCalc,
      recall: recallCalc,
      f1: f1Calc,
      total: totalSamples
    };
  }, [activeModel, decisionThreshold]);

  // Generate SVG ROC curve points
  const rocCurvePoints = React.useMemo(() => {
    // Generate smooth curve based on AUC
    const auc = activeModel.aucRoc / 100;
    const points: [number, number][] = [];
    for (let x = 0; x <= 1.0; x += 0.05) {
      // Curve formula: y = x^( (1 - auc) / auc )
      const power = Math.max(0.12, (1 - auc) / (auc * 1.5));
      const y = Math.min(Math.pow(x, power), 1.0);
      points.push([x, y]);
    }
    return points;
  }, [activeModel]);

  return (
    <section
      id="visualizations"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Interactive Data Science Lab</span>
          </div>
          <h2
            id="visualizations-section-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Model Diagnostics & Interactive Visualizations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Explore live model performance tradeoffs, interactive confusion matrices, receiver operating characteristic (ROC) curves, and educational content distribution metrics.
          </p>
        </div>

        {/* Visualizer Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Visualizer 1: Model Benchmarking & Metric Selector */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Algorithmic Benchmark Suite
                    <span className="text-xs font-mono font-normal text-slate-500">Cross-Validated</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Comparative evaluation across deployed models on 5-fold cross-validation holdout sets
                  </p>
                </div>

                {/* Metric Selector Buttons */}
                <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {(['aucRoc', 'accuracy', 'precision', 'recall', 'f1'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMetric(m)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                        selectedMetric === m
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {m === 'aucRoc' ? 'ROC-AUC' : m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar Comparison Chart */}
              <div className="space-y-4 mb-6">
                {modelBenchmarkingData.map((item, idx) => {
                  const val = item[selectedMetric];
                  const isSelected = activeModelIdx === idx;

                  return (
                    <div
                      key={item.model}
                      onClick={() => setActiveModelIdx(idx)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-xs'
                          : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {item.model}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-semibold">
                              Inspecting
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-500 text-[11px]">
                            Latency: {item.latency}
                          </span>
                          <span className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                            {val}%
                          </span>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue-600 to-teal-400'
                              : 'bg-slate-400 dark:bg-slate-600'
                          }`}
                          style={{ width: `${val}%` }}
                        />
                      </div>

                      <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {item.bestFor}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick takeaway note */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                Click any model to feed its parameters into the real-time threshold & confusion matrix analyzer on the right.
              </span>
            </div>
          </div>

          {/* Interactive Visualizer 2: Dynamic Confusion Matrix & Threshold Tuning */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    Interactive Confusion Matrix
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    N=1,000 cases
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Active model: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{activeModel.model}</strong>
                </p>
              </div>

              {/* Threshold Slider */}
              <div className="mb-6 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-500" />
                    Probability Decision Threshold (τ)
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                    {decisionThreshold.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.15}
                  max={0.85}
                  step={0.01}
                  value={decisionThreshold}
                  onChange={(e) => setDecisionThreshold(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>τ = 0.15 (High Recall / Catch All)</span>
                  <span>τ = 0.85 (High Precision / Low FP)</span>
                </div>
              </div>

              {/* 2x2 Matrix */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-center text-slate-400 dark:text-slate-500 mb-1">
                  Predicted Class (Negative vs Positive)
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* True Negatives */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      True Negative (TN)
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-emerald-800 dark:text-emerald-200 my-1">
                      {confusionData.tn}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                      Correctly identified normal cases
                    </div>
                  </div>

                  {/* False Positives */}
                  <div className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                      False Positive (FP - Type I)
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-rose-800 dark:text-rose-200 my-1">
                      {confusionData.fp}
                    </div>
                    <div className="text-[10px] text-rose-600 dark:text-rose-400">
                      False alarms (Cost of verification)
                    </div>
                  </div>

                  {/* False Negatives */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      False Negative (FN - Type II)
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-amber-800 dark:text-amber-200 my-1">
                      {confusionData.fn}
                    </div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400">
                      Missed anomalies (High risk)
                    </div>
                  </div>

                  {/* True Positives */}
                  <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                      True Positive (TP)
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-blue-800 dark:text-blue-200 my-1">
                      {confusionData.tp}
                    </div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400">
                      Accurately detected conditions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matrix Derived Calculations */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                <div className="text-[10px] text-slate-500">Precision</div>
                <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                  {confusionData.precision}%
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                <div className="text-[10px] text-slate-500">Recall</div>
                <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                  {confusionData.recall}%
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                <div className="text-[10px] text-slate-500">F1-Score</div>
                <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                  {confusionData.f1}%
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Visualizer: Teaching & Video Content Distribution */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-500" />
                  Educational Courseware & 750+ Video Distribution
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pedagogical taxonomy across 400+ hours of structured video tutorials and live student lectures
                </p>
              </div>
              <div className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                750+ Total Episodes
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {teachingTopicBreakdown.map((item) => (
                <div
                  key={item.topic}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.topic}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-500">Videos</span>
                    <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                      {item.count}+
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
