import React from 'react';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-display mb-8">Privacy Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400">
          <section className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4 text-primary-600">
              <Shield size={24} />
              <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Our Commitment</h2>
            </div>
            <p>
              At TruthLens AI, your privacy is a core priority. We believe that critical thinking shouldn't come at the cost of your personal data. This policy outlines how we handle the information you provide while using our analysis tools.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye size={20} className="text-primary-600" /> What We Collect
            </h3>
            <p>
              <strong>Analysis Data:</strong> When you input a headline or article for analysis, that text is sent to our AI engine (Google Gemini) for processing. We do not store this text on our servers permanently; it is used only to generate your results.
            </p>
            <p>
              <strong>Local History:</strong> Your analysis history is stored <strong>locally in your browser's storage</strong>. We do not have access to your saved results or bookmarks unless you explicitly choose to share them.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock size={20} className="text-primary-600" /> Data Security
            </h3>
            <p>
              We use industry-standard encryption for data in transit. However, because our history is stored locally (localStorage), the security of your saved analysis depends on the security of your device and browser.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database size={20} className="text-primary-600" /> Third-Party Services
            </h3>
            <p>
              We use Google Gemini AI to perform deep linguistic analysis. Your inputs are subject to Google's Privacy Policy regarding generative AI services. We do not sell your data to any third-party advertisers.
            </p>
          </section>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-sm italic">
            Last updated: April 18, 2024. For questions regarding this policy, please reach out via our support page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
