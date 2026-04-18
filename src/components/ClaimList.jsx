import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, AlertTriangle } from 'lucide-react';

const ClaimList = ({ claims }) => {
  if (!claims || claims.length === 0) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle2 className="text-trust-green" size={20} />;
      case 'disputed': return <XCircle className="text-trust-red" size={20} />;
      case 'partially verified': return <AlertTriangle className="text-trust-yellow" size={20} />;
      default: return <HelpCircle className="text-slate-400" size={20} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'verified': return 'border-l-trust-green bg-trust-green/5';
      case 'disputed': return 'border-l-trust-red bg-trust-red/5';
      case 'partially verified': return 'border-l-trust-yellow bg-trust-yellow/5';
      default: return 'border-l-slate-300 dark:border-l-slate-700 bg-slate-50 dark:bg-slate-800/30';
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-6 font-display">Claim Inspector</h3>
      <div className="space-y-4">
        {claims.map((claim, index) => (
          <motion.div
            key={claim.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-md ${getStatusClass(claim.status)}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2 leading-relaxed">
                  "{claim.text}"
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Confidence: {claim.confidence}%
                  </span>
                  <p className="text-xs text-slate-500 italic">
                    {claim.reason}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 min-w-[80px]">
                {getStatusIcon(claim.status)}
                <span className="text-[10px] font-bold uppercase text-slate-500 text-center">
                  {claim.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 flex items-start gap-4">
        <HelpCircle size={20} className="text-primary-600 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-primary-900 dark:text-primary-100 mb-1">How are claims verified?</h4>
          <p className="text-xs text-primary-700 dark:text-primary-300 leading-relaxed">
            Our AI scans for factual assertions and compares them against a database of known fact-checks and news patterns. 
            Claims marked as 'unverified' haven't been cross-referenced yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClaimList;
