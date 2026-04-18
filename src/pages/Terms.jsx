import React from 'react';
import { Scale, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen py-20 px-6 text-slate-600 dark:text-slate-400">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-display mb-8 text-slate-900 dark:text-white">Terms of Service</h1>
        
        <div className="space-y-8">
          <section className="glass-card p-8 bg-primary-50/30 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/30">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-700 dark:text-primary-400">
              <Scale size={20} /> Agreement to Terms
            </h2>
            <p className="leading-relaxed">
              By accessing TruthLens AI, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the platform immediately.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary-600"><FileText size={20} /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Usage License</h3>
                <p>
                  TruthLens AI grants you a personal, non-exclusive license to use the platform for informational and educational purposes. You may not use this tool for any illegal activities or to generate malicious content.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-trust-yellow"><AlertCircle size={20} /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Analysis Accuracy</h3>
                <p>
                  Our AI analysis is based on generative models and heuristics. While we strive for accuracy, results should be treated as "educational signals" and not as objective proof. We are not responsible for decisions made based on AI-generated analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-trust-green"><CheckCircle size={20} /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">User Content</h3>
                <p>
                  You are solely responsible for the content you input into the analyzer. We do not claim ownership of your inputs, but by using the service, you grant us the right to process that content via our AI providers.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Limitation of Liability</h3>
            <p className="text-sm leading-relaxed">
              TruthLens AI and its developers shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service. Use at your own risk.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
