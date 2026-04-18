import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, ExternalLink, ShieldAlert } from 'lucide-react';
import ScoreGauge from './ScoreGauge';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-trust-green bg-trust-green/10';
      case 'Medium': return 'text-trust-yellow bg-trust-yellow/10';
      case 'High': return 'text-trust-red bg-trust-red/10';
      default: return 'text-slate-500 bg-slate-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score & Verdict */}
        <div className="lg:col-span-1 glass-card p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold mb-4 font-display self-start">Analysis Verdict</h3>
          <ScoreGauge score={result.credibility} />
          <div className={`mt-4 px-4 py-2 rounded-xl flex items-center gap-2 font-bold ${getRiskColor(result.riskLevel)}`}>
            {result.riskLevel === 'Low' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            {result.verdict}
          </div>
        </div>

        {/* Breakdown & Indicators */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-6 font-display">Credibility Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(result.breakdown).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-bold">{value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${
                      value > 70 ? 'bg-trust-green' : value > 40 ? 'bg-trust-yellow' : 'bg-trust-red'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <h4 className="flex items-center gap-2 text-sm font-bold mb-2">
              <Info size={16} className="text-primary-500" /> Analyst Summary
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              "This content exhibits {result.credibility > 70 ? 'strong' : 'mixed'} credibility signals. 
              {result.redFlags.length > 0 
                ? ' Several red flags were detected in the language style and structure.' 
                : ' The language appears neutral and objective.'} 
              We recommend cross-referencing with official sources."
            </p>
          </div>
        </div>
      </div>

      {/* Red Flags */}
      {result.redFlags.length > 0 && (
        <div className="glass-card p-6 border-l-4 border-l-trust-red">
          <h3 className="flex items-center gap-2 text-lg font-bold mb-4 font-display text-trust-red">
            <ShieldAlert size={20} /> Suspicious Indicators
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.redFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 text-sm text-red-700 dark:text-red-400">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source Info if available */}
      {result.source && (
        <div className="glass-card p-6">
          <div className="flex flex-col md:row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                {result.source.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg font-display">{result.source.name}</h3>
                <p className="text-sm text-slate-500">{result.source.type} • {result.source.domain}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium uppercase mb-1">Source Reputation</p>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${getRiskColor(result.source.rating > 70 ? 'Low' : 'High')}`}>
                  {result.source.category}
                </span>
              </div>
              <a 
                href={`https://${result.source.domain}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-600 transition-colors"
                title="Visit Source"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResultCard;
