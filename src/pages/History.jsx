import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, Trash2, ExternalLink, Bookmark, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const { history, deleteFromHistory, clearHistory, bookmarks, toggleBookmark, showToast, setActiveResult } = useAppContext();

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:row items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-display mb-2">Analysis History</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Your recent credibility checks, stored locally for your privacy.
            </p>
          </div>
          {history.length > 0 && (
            <button 
              onClick={() => {
                if (confirm('Clear all history?')) {
                  clearHistory();
                  showToast('History cleared', 'info');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors border border-red-100 dark:border-red-900/30"
            >
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="glass-card py-24 flex flex-col items-center justify-center text-center opacity-70">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
              <HistoryIcon size={48} className="text-slate-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">No History Yet</h2>
            <p className="text-slate-500 max-w-sm mb-8">
              Start analyzing articles and headlines to see your history appear here.
            </p>
            <Link to="/analyzer" className="btn-primary">
              Go to Analyzer
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 flex flex-col md:row items-center justify-between gap-6 group hover:border-primary-500/30 transition-all"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      item.credibility > 70 ? 'bg-trust-green/10 text-trust-green' : item.credibility > 40 ? 'bg-trust-yellow/10 text-trust-yellow' : 'bg-trust-red/10 text-trust-red'
                    }`}>
                      <span className="text-xl font-bold">{item.credibility}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`badge ${
                          item.riskLevel === 'Low' ? 'bg-trust-green/10 text-trust-green' : item.riskLevel === 'Medium' ? 'bg-trust-yellow/10 text-trust-yellow' : 'bg-trust-red/10 text-trust-red'
                        }`}>
                          {item.verdict}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 truncate pr-4">
                        {item.input}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.source ? `Source: ${item.source.name}` : 'Source: Unknown / Raw Text'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleBookmark(item.id)}
                      className={`p-2 rounded-lg transition-all ${
                        bookmarks.includes(item.id) ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-primary-600 hover:bg-slate-50'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark size={18} fill={bookmarks.includes(item.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => {
                        deleteFromHistory(item.id);
                        showToast('Entry deleted', 'error');
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    {/* In a real app, this would link back to the specific result state */}
                    <Link 
                      to="/analyzer" 
                      onClick={() => setActiveResult(item)}
                      className="p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-slate-50 transition-all"
                    >
                      <ExternalLink size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
