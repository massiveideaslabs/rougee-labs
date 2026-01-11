import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, Coins, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketCap, setMarketCap] = useState<string>("Loading...");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Close menu on scroll
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchMarketCap = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch(
          'https://api.dexscreener.com/latest/dex/tokens/0x147120faec9277ec02d957584cfcd92b56a24317',
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          const val = pair.marketCap || pair.fdv;
          
          if (val) {
            const formatted = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(val);
            setMarketCap(formatted);
            setApiError(false);
          }
        }
      } catch (error) {
        console.error("Error fetching XRGE market cap:", error);
        setApiError(true);
        setMarketCap("--");
      }
    };

    fetchMarketCap();
    const interval = setInterval(fetchMarketCap, 15000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
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
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-neon-cyan"
            >
              <Hexagon size={28} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-tighter text-white group-hover:text-neon-cyan transition-colors">
                ROUGEE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 font-mono uppercase">Labs</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 pointer-events-auto">
            {/* Nav Links */}
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
            
            {/* Market Cap */}
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 border ${apiError ? 'border-red-500/20 bg-red-500/5' : 'border-neon-cyan/20 bg-neon-cyan/5'} text-neon-cyan font-mono text-xs uppercase tracking-widest rounded-sm h-[34px] shadow-[0_0_10px_-5px_rgba(0,243,255,0.2)] select-none`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${apiError ? 'bg-red-500' : 'bg-neon-green shadow-[0_0_5px_#0aff0a]'}`} />
              <span className="whitespace-nowrap">MC: {marketCap}</span>
            </div>

            {/* Buy Button */}
            <a 
              href="https://www.coinbase.com/converter/usd/xrge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex px-5 py-2 border border-neon-purple/50 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-none items-center gap-2 rounded-sm group shadow-[0_0_15px_-5px_rgba(188,19,254,0.3)] hover:shadow-[0_0_20px_rgba(188,19,254,0.6)] h-[34px]"
              data-interactive="true"
            >
              <Coins size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="whitespace-nowrap">BUY $XRGE</span>
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-dark-bg border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6 pt-20">
                {/* Close button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-white hover:text-neon-cyan transition-colors"
                  data-interactive="true"
                >
                  <X size={24} />
                </button>

                {/* Navigation Links */}
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

                {/* Market Cap */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`flex items-center gap-2 px-4 py-3 border ${apiError ? 'border-red-500/20 bg-red-500/5' : 'border-neon-cyan/20 bg-neon-cyan/5'} text-neon-cyan font-mono text-xs uppercase tracking-widest rounded mb-4`}
                >
                  <div className={`w-2 h-2 rounded-full animate-pulse ${apiError ? 'bg-red-500' : 'bg-neon-green shadow-[0_0_5px_#0aff0a]'}`} />
                  <span>LIVE MC: {marketCap}</span>
                </motion.div>

                {/* Buy Button */}
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  href="https://www.coinbase.com/converter/usd/xrge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex w-full justify-center px-5 py-3 border border-neon-purple/50 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple hover:text-white font-mono text-sm uppercase tracking-widest transition-all duration-300 items-center gap-2 rounded"
                  data-interactive="true"
                >
                  <Coins size={16} />
                  <span>BUY $XRGE</span>
                </motion.a>

                {/* Branding at bottom */}
                <div className="mt-auto pt-8 border-t border-white/5">
                  <p className="text-gray-500 font-mono text-xs text-center">
                    © 2024 ROUGEE LABS
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

export default Navigation;
