import React, { useState } from 'react';
import { Mail, MessageSquare, HelpCircle, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Support = () => {
  const { showToast } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message sent successfully!");
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display mb-4">Support & Contact</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions about your analysis or want to report a bug? We're here to help you navigate the truth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/10 rounded-xl text-primary-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email Us</h3>
                <p className="text-sm text-slate-500">support@truthlens.ai</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-blue-600">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Community</h3>
                <p className="text-sm text-slate-500">Join our Discord server</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="p-3 bg-trust-green/10 rounded-xl text-trust-green">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">FAQ</h3>
                <p className="text-sm text-slate-500">Read our help center</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold font-display mb-6">Send a Message</h2>
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-trust-green/10 text-trust-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-500">We'll get back to you within 24-48 hours.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                      <option>General Inquiry</option>
                      <option>Technical Issue</option>
                      <option>API Access</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                    <textarea 
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all h-32"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
