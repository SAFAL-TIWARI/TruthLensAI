import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, History, BookOpen, Info, Menu, X, House } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <House size={18} /> },
    { name: 'Analyzer', path: '/analyzer', icon: <LayoutDashboard size={18} /> },
    { name: 'History', path: '/history', icon: <History size={18} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="glass-nav px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
          <div className="p-2 bg-primary-600 rounded-lg group-hover:rotate-12 transition-transform">
            <Shield className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold font-display tracking-tight">
            Truth<span className="text-primary-600">Lens</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary-600 ${
                location.pathname === link.path ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Link to="/analyzer" className="btn-primary py-2 px-5 text-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    location.pathname === link.path 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              <Link 
                to="/analyzer" 
                onClick={closeMenu}
                className="btn-primary w-full text-center py-3 rounded-xl mt-2"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
