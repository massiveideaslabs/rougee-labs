import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Menu, X, Zap } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const GltchNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${
          isScrolled ? 'py-3 sm:py-4 bg-dark-bg/80 backdrop-blur-md border-b border-white/5' : 'py-4 sm:py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group cursor-none pointer-events-auto" data-interactive="true">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-neon-cyan relative"
            >
              <Cpu size={28} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-neon-cyan/20 blur-md rounded-full" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-tighter text-white group-hover:text-neon-cyan transition-colors">
                GLTCH
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 font-mono uppercase">By RouGee Labs</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 pointer-events-auto">
            <div className="flex items-center gap-6 mr-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-neon-cyan font-mono text-xs uppercase tracking-widest transition-colors cursor-none"
                  data-interactive="true"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* CTA Button */}
            <a 
              href="#contact"
              className="flex px-5 py-2 border border-neon-cyan/50 text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan hover:text-black font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-none items-center gap-2 rounded-sm group shadow-[0_0_15px_-5px_rgba(0,243,255,0.3)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] h-[34px]"
              data-interactive="true"
            >
              <Zap size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="whitespace-nowrap">GET DEMO</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden pointer-events-auto p-2 text-white hover:text-neon-cyan transition-colors cursor-none"
            data-interactive="true"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-dark-bg border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6 pt-20">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-white hover:text-neon-cyan transition-colors"
                  data-interactive="true"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col gap-4 mb-8">
                  {NAV_LINKS.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-white hover:text-neon-cyan font-mono text-lg uppercase tracking-widest transition-colors py-2 border-b border-white/5"
                      data-interactive="true"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full justify-center px-5 py-3 border border-neon-cyan/50 text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan hover:text-black font-mono text-sm uppercase tracking-widest transition-all duration-300 items-center gap-2 rounded"
                  data-interactive="true"
                >
                  <Zap size={16} />
                  <span>GET DEMO</span>
                </motion.a>

                <div className="mt-auto pt-8 border-t border-white/5">
                  <p className="text-gray-500 font-mono text-xs text-center">
                    GLTCH by RouGee Labs
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default GltchNavigation;
