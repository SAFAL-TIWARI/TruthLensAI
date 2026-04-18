import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-24 px-6">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6 border border-primary-200 dark:border-primary-800">
            <Zap size={14} /> AI-Powered Media Analysis
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 tracking-tight">
            See the Truth Behind <br />
            <span className="gradient-text">Every Headline</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            TruthLens AI uses state-of-the-art heuristics and metadata analysis to help you navigate 
            the complex world of modern media. Decipher credibility in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analyzer" className="btn-primary flex items-center justify-center gap-2">
              <Search size={20} /> Analyze Now
            </Link>
            <Link to="/learn" className="btn-secondary flex items-center justify-center gap-2">
              How it Works
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-primary-500/10 blur-[120px] rounded-full mx-auto w-full max-w-3xl" />
          <div className="glass-card p-1 bg-white/30 dark:bg-slate-900/30 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200" 
              alt="TruthLens Interface" 
              className="rounded-[14px] w-full shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-400/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-trust-blue/20 blur-[100px] rounded-full" />
    </div>
  );
};

export default Hero;
