import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Mail, Globe, Share2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mb-6 text-primary-600">
            <Info size={32} />
          </div>
          <h1 className="text-4xl font-bold font-display mb-4">About TruthLens AI</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Revolutionizing media credibility analysis for a more informed society.
          </p>
        </div>

        <div className="space-y-12">
          <section className="glass-card p-8 md:p-12">
            <h2 className="text-2xl font-bold font-display mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              In an age of "alternative facts" and rapid-fire misinformation, the ability to discern truth from deception is more critical than ever. TruthLens AI was born out of a desire to empower everyday internet users with the same linguistic and metadata analysis tools used by professional fact-checkers.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our goal isn't to tell you *what* to think, but to provide you with the signals and data points you need to think critically about the information you consume.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="text-primary-600 mb-6"><Shield size={32} /></div>
              <h3 className="text-xl font-bold mb-4 font-display">Responsible AI</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe in transparent algorithms. Our analysis looks for patterns and metadata, not just keywords, and we always provide the reasoning behind our scores.
              </p>
            </div>
            <div className="glass-card p-8">
              <div className="text-primary-600 mb-6"><Users size={32} /></div>
              <h3 className="text-xl font-bold mb-4 font-display">Community Driven</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                TruthLens is a project built for the common good. We actively seek feedback from educators, journalists, and students to improve our tools.
              </p>
            </div>
          </div>

          <section className="glass-card p-8 md:p-12 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold font-display mb-6">Disclaimer</h2>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-500 text-sm leading-relaxed">
              <p className="font-bold mb-2 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                <Shield size={14} /> Critical Notice
              </p>
              TruthLens AI is an assistive tool designed for awareness and education. While we use advanced heuristics, no automated system is 100% accurate. Final verification should always be performed by a human using multiple reputable primary sources. We are not an "absolute truth" machine, but a "credibility signal" provider.
            </div>
          </section>

          <section className="text-center pt-12">
            <h2 className="text-2xl font-bold font-display mb-8">Get in Touch</h2>
            <div className="flex justify-center gap-8">
              <Link to="/support" className="flex flex-col items-center gap-2 group">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Contact</span>
              </Link>
              
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
