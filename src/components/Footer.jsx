import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Link as LinkIcon, Share2, Globe, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-primary-500" size={28} />
              <span className="text-2xl font-bold font-display text-white">
                Truth<span className="text-primary-500">Lens</span>
              </span>
            </div>
            <p className="text-lg max-w-sm mb-8">
              Empowering media consumers with AI-driven insights to distinguish fact from fiction in an era of information overload.
            </p>
            <div className="flex gap-4">
              {[LinkIcon, Globe, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-display">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/analyzer" className="hover:text-primary-400">Analyzer</Link></li>
              <li><Link to="/analyzer" className="hover:text-primary-400">Source Check</Link></li>
              <li><Link to="/analyzer" className="hover:text-primary-400">Claim Inspector</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/learn" className="hover:text-primary-400">Verification Hub</Link></li>
              <li><Link to="/learn" className="hover:text-primary-400">Media Literacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-400">Terms of Service</Link></li>
              <li><Link to="/support" className="hover:text-primary-400">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-sm">
            © 2026 TruthLens AI.
          </p>
          <p className="flex items-center gap-1 text-sm">
            Made with <Heart size={14} className="text-primary-500 fill-primary-500" /> by Safal Tiwari
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
