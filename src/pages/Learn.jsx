import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Search, Eye, Megaphone, HelpCircle, Shield, Globe, Zap } from 'lucide-react';

const Learn = () => {
  const tips = [
    {
      icon: <Eye className="text-blue-500" />,
      title: "Check the URL",
      description: "Scammers often use URLs that look similar to reputable sites (e.g., 'bbc-news.com.co' instead of 'bbc.com'). Always check the domain ending."
    },
    {
      icon: <Search className="text-green-500" />,
      title: "Lateral Reading",
      description: "Don't just stay on the site. Open a new tab and search for the claim or the organization. What do other reputable sources say about it?"
    },
    {
      icon: <Megaphone className="text-red-500" />,
      title: "Emotional Triggers",
      description: "Fake news is designed to make you feel strong emotions like anger or fear. If a headline makes you want to react immediately, pause and verify."
    },
    {
      icon: <CheckCircle className="text-purple-500" />,
      title: "Verify the Date",
      description: "Sometimes old news stories are recirculated as if they just happened. Check the publication date and ensure the context is still relevant."
    }
  ];

  const resources = [
    {
      title: 'Spotting Logical Fallacies',
      description: 'Learn to identify missing premises, circular reasoning, and red herrings in news articles.',
      icon: <BookOpen className="text-primary-600" />,
      category: 'Analysis'
    },
    {
      title: 'The AI Deepfake Guide',
      description: 'Techniques for detecting AI-generated images, videos, and cloned voices in media reports.',
      icon: <Shield className="text-trust-green" />,
      category: 'Technology'
    },
    {
      title: 'Reverse Image Searching',
      description: 'A step-by-step guide to finding the original source and context of any viral image.',
      icon: <Globe className="text-blue-600" />,
      category: 'Verification'
    },
    {
      title: 'Handling Emotional Triggers',
      description: 'Why sensationalist headlines target your anxiety and how to stay objective.',
      icon: <Zap className="text-trust-yellow" />,
      category: 'Psychology'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold font-display mb-4">Verification Hub</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Become your own fact-checker. Learn the essential skills to navigate the digital information landscape with confidence.
          </p>
        </div>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4">
                {tip.icon}
              </div>
              <h3 className="font-bold mb-2 font-display text-sm">{tip.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* SIFT Method */}
        <div className="glass-card p-12 bg-slate-900 text-white relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold font-display mb-6 text-primary-400">The SIFT Method</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Developed by Mike Caulfield, the SIFT method is a simple but powerful framework for evaluating online content.
              </p>
              
              <ul className="space-y-6">
                {[
                  { l: 'S', t: 'Stop', d: 'Pause and check your emotions before reacting or sharing.' },
                  { l: 'I', t: 'Investigate the source', d: 'Know who authored the piece and what their reputation is.' },
                  { l: 'F', t: 'Find better coverage', d: 'See if others are reporting the same thing with more evidence.' },
                  { l: 'T', t: 'Trace claims to original context', d: 'Find the original study or quote to see if it was taken out of context.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex-shrink-0 flex items-center justify-center font-bold text-lg text-white">
                      {item.l}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.t}</h4>
                      <p className="text-sm text-slate-400">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex w-full max-w-xs aspect-square rounded-3xl bg-slate-800 items-center justify-center shadow-2xl border border-slate-700">
              <BookOpen size={120} className="text-primary-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Deep Dive Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8">Deep Dive Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res, i) => (
              <div key={i} className="glass-card p-8 flex gap-6 group hover:border-primary-500 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  {React.cloneElement(res.icon, { size: 32 })}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-2 block">{res.category}</span>
                  <h3 className="text-lg font-bold mb-2 font-display">{res.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold font-display mb-4">Partner Organizations</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            We work with top media literacy advocates to bring you the best verification methodologies.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Poynter Institute', 'Checkology', 'First Draft News', 'MediaWise', 'News Literacy Project'].map((org, i) => (
              <span key={i} className="px-5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors cursor-default border border-transparent hover:border-primary-200">
                {org}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
