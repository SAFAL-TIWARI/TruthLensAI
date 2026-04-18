import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Trash2, Share2, ClipboardCheck, AlertCircle } from 'lucide-react';
import InputPanel from '../components/InputPanel';
import ResultCard from '../components/ResultCard';
import ClaimList from '../components/ClaimList';
import { useAppContext } from '../context/AppContext';
import { useAnalyze } from '../hooks/useAnalyze';

const Analyzer = () => {
  const { analyze, loading, result: currentResult, error, clearResult } = useAnalyze();
  const { showToast, activeResult, setActiveResult } = useAppContext();
  const [localError, setLocalError] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent "ghosting" by not falling back to activeResult while a new analysis is loading
  const result = (loading || isProcessing) ? null : (currentResult || activeResult);

  const handleClear = () => {
    clearResult();
    setActiveResult(null);
    showToast('Workspace cleared', 'info');
  };

  const handleAnalyze = async (input) => {
    if (!input || input.trim().length < 15) {
      setLocalError("Please provide a longer headline or article for meaningful analysis (min 15 chars).");
      return;
    }
    // Clear previous results immediately to signal start of new work
    setLocalError(null);
    setIsProcessing(true);
    setActiveResult(null);
    clearResult();
    setLoadingStep(0);

    const steps = ["Initializing context...", "Analyzing language patterns...", "Consulting Gemini AI...", "Verifying claims...", "Finalizing verdict..."];
    const timer = setInterval(() => {
      setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    try {
      await analyze(input);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setIsProcessing(false);
      clearInterval(timer);
    }
  };

  const handleShare = () => {
    if (result) {
      const text = `Credibility analysis for: ${result.input}\nScore: ${result.credibility}/100\nVerdict: ${result.verdict}\nAnalyzed by TruthLens AI`;
      navigator.clipboard.writeText(text);
      showToast('Analysis summary copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-display mb-4">Media Credibility Workspace</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Paste an article, headline, or URL to begin your deep credibility analysis.
          </p>
        </div>

        <div className="space-y-8">
          <InputPanel onAnalyze={handleAnalyze} isLoading={loading} />

          {(localError || error) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm font-medium"
            >
              <AlertCircle size={18} />
              {localError || error}
            </motion.div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h2 className="text-2xl font-bold font-display">Deep Analysis Results</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleShare}
                      className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary-600 transition-all flex items-center gap-2 text-sm font-medium"
                    >
                      <Share2 size={16} /> Share Result
                    </button>
                    <button 
                      onClick={handleClear}
                      className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-600 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <ResultCard result={result} />
                <ClaimList claims={result.claims} />

                {/* Next Steps */}
                <div className="glass-card p-6 bg-primary-600 text-white">
                  <h3 className="text-lg font-bold mb-4 font-display flex items-center gap-2">
                    <ClipboardCheck size={20} /> Recommended Verification Steps
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Cross-reference key claims with Reuters or Associated Press.",
                      "Check if other reputable outlets are reporting the same story.",
                      "Verify the author's background and past reporting history.",
                      "Look for the original source of any quoted data or studies."
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/10 p-3 rounded-lg border border-white/10">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs font-bold">{i+1}</div>
                        <p className="text-sm opacity-90">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center opacity-50 grayscale">
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
                <LayoutDashboard size={48} className="text-slate-400" />
              </div>
              <p className="text-lg font-medium text-slate-500">
                Ready for input. Analysis results will appear here.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-lg font-bold font-display animate-pulse">
                {["Initializing context...", "Analyzing language patterns...", "Consulting Gemini AI...", "Verifying claims...", "Finalizing verdict..."][loadingStep]}
              </p>
              <p className="text-sm text-slate-500 mt-2">Our AI models are performing a deep search & consistency check.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
