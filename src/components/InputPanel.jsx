import React, { useState } from 'react';
import { Search, Link as LinkIcon, FileText, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InputPanel = ({ onAnalyze, isLoading }) => {
  const [inputType, setInputType] = useState('text'); // 'text' or 'url'
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleClear = () => {
    setValue('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Please provide some content to analyze.');
      return;
    }
    if (inputType === 'url' && !value.startsWith('http')) {
      setError('Please provide a valid URL starting with http:// or https://');
      return;
    }
    setError('');
    onAnalyze(value);
  };

  const loadSample = () => {
    const samples = {
      text: "SHOCKING: Scientists have discovered a secret fruit that cures all diseases instantly! Big Pharma is trying to hide it from you. CLICK NOW to see the truth before it's deleted forever!!!",
      url: "https://www.reuters.com/world/europe/ukraine-says-it-hit-russian-oil-refinery-krasnodar-region-2024-02-09/"
    };
    setValue(samples[inputType]);
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-4 mb-8 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setInputType('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            inputType === 'text' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText size={16} /> Raw Text / Headline
        </button>
        <button
          onClick={() => setInputType('url')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            inputType === 'url' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <LinkIcon size={16} /> News URL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={inputType === 'text' ? "Paste headline or full article text here..." : "Paste the news article URL here..."}
            className={`input-field min-h-[160px] max-h-[400px] pr-12 custom-scrollbar transition-all ${
              error ? 'border-red-500 ring-red-500/20' : 'group-hover:border-primary-400'
            }`}
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Clear input"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-red-500 text-sm font-medium"
            >
              <AlertCircle size={14} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={loadSample}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Try a sample
            </button>
            <span className="text-xs text-slate-400">{value.length} characters</span>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={20} className="group-hover:scale-110 transition-transform" />
                Analyze Now
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputPanel;
