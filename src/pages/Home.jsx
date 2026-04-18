import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Search, Shield, BarChart3, Clock, AlertCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      icon: <Search size={24} />,
      title: 'Heuristic Engine',
      description: 'Advanced analysis of language patterns, emotional bias, and sensationalism markers.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Source Trust',
      description: 'Instant domain reputation check against a database of verified news outlets.'
    },
    {
      icon: <AlertCircle size={24} />,
      title: 'Red Flag Detection',
      description: 'Pinpoint clickbait, extreme polarization, and factual inconsistencies in seconds.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Credibility Score',
      description: 'Receive a quantified trust score (0-100) with detailed contributing factors.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Analysis History',
      description: 'Keep track of all your past verifications locally and securely in your browser.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Verification Hub',
      description: 'Learn the skills needed to perform deep manual fact-checks and source verification.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-24 px-6 bg-white dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Powerful Features for Truth</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Equipped with the tools you need to stay informed in an era of fake news and digital misinformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-600/10 transition-colors" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Demo-Ready Performance</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  TruthLens is optimized for speed and clarity. Whether you're a journalist, a student, or a curious citizen, 
                  our tool provides actionable insights you can count on.
                </p>
                <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                  <div>
                    <p className="text-3xl font-bold font-display text-primary-600">1.5s</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Analysis Speed</p>
                  </div>
                  <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 hidden md:block" />
                  <div>
                    <p className="text-3xl font-bold font-display text-primary-600">5k+</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Known Sources</p>
                  </div>
                  <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 hidden md:block" />
                  <div>
                    <p className="text-3xl font-bold font-display text-primary-600">100%</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Local Privacy</p>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 animate-pulse-slow" style={{ animationDelay: `${i * 0.5}s` }}>
                      <Search size={32} className="text-slate-300 dark:text-slate-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Quote */}
      <section className="py-24 px-6 text-center">
        <blockquote className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl font-medium italic text-slate-700 dark:text-slate-300 mb-8">
            "We believe that everyone deserves access to clear, evidence-based tools that help navigate the noise of the digital age."
          </p>
          <cite className="not-italic font-bold text-primary-600 uppercase tracking-widest">
            — The TruthLens Mission
          </cite>
        </blockquote>
      </section>
    </div>
  );
};

export default Home;
