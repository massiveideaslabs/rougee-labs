import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Coins } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketCap, setMarketCap] = useState<string>("$0");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchMarketCap = async () => {
      try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/0x147120faec9277ec02d957584cfcd92b56a24317');
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          // Use marketCap if available, otherwise fallback to fdv
          const val = pair.marketCap || pair.fdv;
          
          if (val) {
            const formatted = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(val);
            setMarketCap(formatted);
          }
        }
      } catch (error) {
        console.error("Error fetching XRGE market cap:", error);
      }
    };

    // Initial fetch
    fetchMarketCap();
    
    // Update every 15 seconds
    const interval = setInterval(fetchMarketCap, 15000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${
        isScrolled ? 'py-4 bg-dark-bg/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
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

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          
          <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan font-mono text-xs uppercase tracking-widest rounded-sm h-[34px] shadow-[0_0_10px_-5px_rgba(0,243,255,0.2)] select-none">
            <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_5px_#0aff0a]" />
            <span className="whitespace-nowrap">LIVE MC: {marketCap}</span>
          </div>

          <a 
            href="https://www.coinbase.com/converter/usd/xrge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex px-3 sm:px-5 py-2 border border-neon-purple/50 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple hover:text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 cursor-none items-center gap-1 sm:gap-2 rounded-sm group shadow-[0_0_15px_-5px_rgba(188,19,254,0.3)] hover:shadow-[0_0_20px_rgba(188,19,254,0.6)] h-[34px]"
            data-interactive="true"
          >
            <Coins size={12} className="sm:w-[14px] sm:h-[14px] group-hover:rotate-12 transition-transform" />
            <span className="whitespace-nowrap">BUY $XRGE</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;