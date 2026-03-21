import React, { Suspense, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Mail, Send, ExternalLink, TrendingUp, ShoppingCart, PieChart, Users, Lock, Zap, Globe, Landmark, LineChart, Shield, Fingerprint, Key, MessageSquareLock } from 'lucide-react';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Hero3D from './components/Hero3D';
import ProjectCard from './components/ProjectCard';
import MatrixRain from './components/MatrixRain';
import BackToTop from './components/BackToTop';
import { PROJECTS } from './constants';

// Social links
const SOCIAL_LINKS = {
  twitter: 'https://x.com/rougecoin?s=21',
  discord: 'https://discord.gg/487vQfMN',
};

function App() {
  // Detect touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Mouse position state for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Parallax transform values (disabled on mobile)
  const heroTitleX = useTransform(mouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [15, -15]);
  const heroTitleY = useTransform(mouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [15, -15]);
  const heroSubtitleX = useTransform(mouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [25, -25]);
  const heroSubtitleY = useTransform(mouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [25, -25]);
  const heroDescX = useTransform(mouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [10, -10]);
  const heroDescY = useTransform(mouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [10, -10]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX / width - 0.5;
    const y = e.clientY / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Secure Transmission from ${formData.name || 'Unknown Agent'}`;
    const body = `Identity: ${formData.name}\nComm Frequency (Email): ${formData.email}\n\nTransaction Data:\n${formData.message}`;
    window.location.href = `mailto:info@rougeelabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-dark-bg min-h-screen text-white selection:bg-neon-cyan selection:text-black relative">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        onMouseMove={handleHeroMouseMove}
      >
        <Suspense fallback={<div className="text-neon-cyan">Loading 3D Engine...</div>}>
          <Hero3D />
        </Suspense>
        
        <div className="relative z-10 text-center px-4 mix-blend-difference pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h2 
              style={{ x: heroSubtitleX, y: heroSubtitleY }}
              className="text-neon-cyan font-mono tracking-[0.3em] md:tracking-[0.5em] text-xs sm:text-sm md:text-base mb-3 md:mb-4 px-2"
            >
              THE FIRST POST-QUANTUM BLOCKCHAIN
            </motion.h2>
            <motion.h1 
              style={{ x: heroTitleX, y: heroTitleY }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-4 md:mb-6 leading-tight px-2"
            >
              ROUGEE<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
                LABS
              </span>
            </motion.h1>
            <motion.p 
              style={{ x: heroDescX, y: heroDescY }}
              className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide mb-8 md:mb-12 px-4"
            >
              RougeChain is a post-quantum Layer 1 where every signature, transaction, and encrypted message is secured by NIST-approved lattice cryptography — not as a future upgrade, but as the foundation.
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white"
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <ArrowDown className="w-8 h-8 text-neon-cyan" />
        </motion.div>
      </section>

      {/* Stats ticker band */}
      <div className="w-full bg-neon-cyan/5 border-y border-neon-cyan/20 py-2 sm:py-3 overflow-hidden flex relative z-20 backdrop-blur-sm">
        <motion.div 
            className="flex gap-8 sm:gap-12 md:gap-16 whitespace-nowrap text-[10px] sm:text-xs font-mono text-neon-cyan/80"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            {Array(10).fill("ML-DSA-65 // ML-KEM-768 // QUANTUM ENTROPY // zk-STARKs // POST-QUANTUM // RUST // ROUGECHAIN // NIST FIPS 204 // ANU QRNG // LATTICE CRYPTO //").map((text, i) => (
                <span key={i}>{text}</span>
            ))}
        </motion.div>
      </div>

      {/* RougeChain Features Section */}
      <section id="rougechain" className="relative py-16 sm:py-24 md:py-32 bg-dark-surface overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(188,19,254,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(188,19,254,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-neon-purple">QUANTUM-SAFE</span> BY DEFAULT
            </h2>
            <p className="text-gray-400 font-mono text-xs sm:text-sm tracking-widest max-w-2xl mx-auto">
              Every cryptographic primitive in RougeChain is built on NIST-standardized post-quantum algorithms. No migration required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { icon: Fingerprint, title: 'Post-Quantum Signatures', desc: 'ML-DSA-65 (NIST FIPS 204) — lattice-based digital signatures resistant to Shor\'s algorithm', color: 'text-neon-cyan', border: 'group-hover:border-neon-cyan/50' },
              { icon: Key, title: 'Quantum Key Exchange', desc: 'ML-KEM-768 (NIST FIPS 203) — lattice-based key encapsulation for quantum-safe encrypted channels', color: 'text-neon-purple', border: 'group-hover:border-neon-purple/50' },
              { icon: Zap, title: 'Quantum Entropy', desc: 'ANU QRNG — proposer selection seeded by quantum vacuum fluctuations for provably unpredictable consensus', color: 'text-neon-green', border: 'group-hover:border-neon-green/50' },
              { icon: MessageSquareLock, title: 'Encrypted Messaging', desc: 'End-to-end post-quantum encrypted communications built into the protocol via ML-KEM key exchange', color: 'text-white', border: 'group-hover:border-white/50' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/5 ${item.border} transition-colors group cursor-none relative overflow-hidden backdrop-blur-sm`}
                data-interactive="true"
              >
                <div className={`p-3 w-fit rounded-lg bg-white/5 mb-4 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href="https://rougechain.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full text-neon-cyan font-mono text-sm tracking-widest hover:bg-neon-cyan/20 hover:border-neon-cyan/60 transition-all group cursor-none"
              data-interactive="true"
            >
              EXPLORE ROUGECHAIN <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative py-16 sm:py-24 md:py-32 px-4 container mx-auto z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-24 pl-4 border-l-4 border-neon-cyan"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4">ECOSYSTEM</h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm tracking-widest">PROTOCOLS & PRODUCTS POWERED BY $XRGE_</p>
        </motion.div>

        <div className="flex flex-col items-center">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Philosophy / About Section */}
      <section id="about" className="relative py-16 sm:py-24 md:py-32 bg-dark-surface overflow-hidden">
        <MatrixRain />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative md:sticky top-8 md:top-32"
            >
                <div className="absolute -inset-2 sm:-inset-4 bg-neon-purple/20 blur-xl rounded-full" />
                
                <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-2xl border border-white/10 max-w-sm mx-auto md:max-w-none">
                    <img 
                      src="https://i.ibb.co.com/nMQScTXS/Rouge-Coin-Logo.png" 
                      alt="Rougee Token" 
                      className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="text-neon-cyan">QUANTUM-SAFE</span> infrastructure<br/>
                    powering the <span className="text-neon-purple">FUTURE</span>
                </h2>
                
                <div className="space-y-4 md:space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base">
                  <p>
                    At Rougee Labs, we're building RougeChain — a post-quantum Layer 1 blockchain where every cryptographic operation uses NIST-approved lattice algorithms. When quantum computers break RSA and ECDSA, RougeChain is already safe.
                  </p>
                  <p>
                    $XRGE is the native token of RougeChain, also available on Base and Keeta via our custom-built bridge. It powers an ecosystem of dApps from DeFi to decentralized streaming, with validator staking rewards and fee buybacks creating sustainable value capture.
                  </p>
                  <p className="font-bold text-white">
                    Stake $XRGE to become a validator and earn block rewards, or explore our ecosystem of quantum-secured applications.
                  </p>
                  <p className="text-neon-cyan/80 italic">
                    Building on RougeChain? Our SDK and wallet extension make post-quantum integration seamless. Reach out below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <a 
                      href="https://dexscreener.com/base/0x147120faec9277ec02d957584cfcd92b56a24317" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all group cursor-none block relative overflow-hidden min-h-[100px]"
                      data-interactive="true"
                    >
                        <div className="flex justify-between items-start mb-2">
                           <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-neon-cyan transition-colors" />
                           <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px] text-gray-600 group-hover:text-neon-cyan" />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 group-hover:text-neon-cyan">View on Dexscreener</h3>
                        <p className="text-[9px] sm:text-[10px] font-mono text-gray-400 tracking-widest uppercase">Live Chart</p>
                    </a>

                    <a 
                      href="https://www.coinbase.com/price/base-rougecoin-4317?utm_campaign=rt_i_m_w_m_acq_ugc_soc_0_asset&utm_source=ugc&utm_platform=iOS" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded hover:border-neon-purple hover:bg-neon-purple/5 transition-all group cursor-none block relative overflow-hidden min-h-[100px]"
                      data-interactive="true"
                    >
                        <div className="flex justify-between items-start mb-2">
                           <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-neon-purple transition-colors" />
                           <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px] text-gray-600 group-hover:text-neon-purple" />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 group-hover:text-neon-purple">BUY $XRGE</h3>
                        <p className="text-[9px] sm:text-[10px] font-mono text-gray-400 tracking-widest uppercase">On Coinbase</p>
                    </a>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-16 sm:py-24 md:py-32 relative border-t border-white/5 bg-black/40 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-16"
           >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4"><span className="text-neon-cyan">$XRGE</span> TOKENOMICS</h2>
              <div className="inline-flex items-center gap-2 border border-neon-purple/30 bg-neon-purple/5 px-6 py-3 rounded-full backdrop-blur-md">
                <PieChart size={20} className="text-neon-purple" />
                <span className="font-mono text-neon-purple tracking-widest text-sm md:text-base font-bold">TOTAL SUPPLY: 36,000,000,000</span>
              </div>
           </motion.div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
              {[
                { label: "Team Allocation", amount: "7,500,000,000", icon: Lock, subtext: "Locked for 24 months with vesting schedule", color: "text-neon-cyan", border: "group-hover:border-neon-cyan/50" },
                { label: "Growth allocation", amount: "7,500,000,000", icon: Globe, subtext: "Partnerships, air drops, & marketing", color: "text-neon-purple", border: "group-hover:border-neon-purple/50" },
                { label: "Treasury allocation", amount: "7,500,000,000", icon: Landmark, subtext: "For future development/overhead and DAO treasury fund", color: "text-neon-green", border: "group-hover:border-neon-green/50" },
                { label: "Legacy holders allocation", amount: "8,500,000,000", icon: Users, subtext: "Claimed by former Rougee Social Network holders", color: "text-white", border: "group-hover:border-white/50" },
                { label: "DEX Allocation", amount: "5,000,000,000", icon: LineChart, subtext: "Provided as initial liquidity", color: "text-yellow-400", border: "group-hover:border-yellow-400/50" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-dark-surface p-5 sm:p-6 md:p-8 rounded-2xl border border-white/5 ${item.border} transition-colors group cursor-none relative overflow-hidden`}
                  data-interactive="true"
                >
                   <div className={`absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity ${item.color}`}>
                      <item.icon size={60} className="sm:w-20 sm:h-20 md:w-[100px] md:h-[100px]" />
                   </div>
                   <div className="relative z-10">
                      <div className={`p-2 sm:p-3 w-fit rounded-lg bg-white/5 mb-3 sm:mb-4 ${item.color}`}>
                        <item.icon size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono tracking-tighter mb-1 sm:mb-2 break-words">{item.amount}</h3>
                      <p className="text-gray-400 text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest font-bold">{item.label}</p>
                      <p className="text-gray-500 text-[9px] sm:text-[10px] md:text-xs mt-2 leading-relaxed font-mono opacity-80">{item.subtext}</p>
                   </div>
                </motion.div>
              ))}
              
              {/* Summary Card */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 p-5 sm:p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center group cursor-none relative overflow-hidden"
              >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Sustainable Economics</h3>
                  <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                    Designed for long-term value capture and ecosystem sustainability. Team allocation, Marketing, and Treasury wallet locked in multi-sig vaults
                  </p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 relative">
         {/* Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
         
         <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 px-4">INITIATE CONTACT</h2>
                <p className="text-neon-cyan font-mono text-xs sm:text-sm md:text-base px-4">SECURE RPC ENDPOINT OPEN_</p>
            </motion.div>

            <motion.form 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 sm:p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-md"
                onSubmit={handleContactSubmit}
            >
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Public Key / Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" 
                          placeholder="0x..." 
                          required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Comm Frequency</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" 
                          placeholder="user@example.eth" 
                          required
                        />
                    </div>
                </div>
                <div className="space-y-2 mb-6 sm:mb-8">
                    <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Transaction Data</label>
                    <textarea 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all resize-none" 
                      placeholder="Enter your proposal parameters..." 
                      required
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-neon-cyan text-black font-bold uppercase tracking-widest py-3 sm:py-4 rounded hover:bg-white transition-colors flex items-center justify-center gap-2 group cursor-none text-sm sm:text-base min-h-[44px]"
                    data-interactive="true"
                >
                    Sign & Broadcast <Send size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 font-mono text-sm">
                      Or email us at <a href="mailto:info@rougeelabs.com" className="text-neon-cyan hover:text-white transition-colors" data-interactive="true">info@rougeelabs.com</a>
                    </p>
                </div>
            </motion.form>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 border-t border-white/5 relative z-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">ROUGEE LABS</h3>
              <p className="text-gray-500 font-mono text-xs leading-relaxed">
                Building RougeChain — the post-quantum blockchain where every signature is quantum-safe from day one.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#work" className="text-gray-500 hover:text-neon-cyan transition-colors font-mono text-xs" data-interactive="true">Projects</a>
                <a href="#about" className="text-gray-500 hover:text-neon-cyan transition-colors font-mono text-xs" data-interactive="true">About $XRGE</a>
                <a href="#contact" className="text-gray-500 hover:text-neon-cyan transition-colors font-mono text-xs" data-interactive="true">Contact</a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="text-center md:text-right">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Connect</h4>
              <div className="flex justify-center md:justify-end gap-4">
                <a 
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all group cursor-none"
                  data-interactive="true"
                  aria-label="Follow us on X (Twitter)"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={SOCIAL_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-neon-purple hover:bg-neon-purple/10 transition-all group cursor-none"
                  data-interactive="true"
                  aria-label="Join our Discord"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-neon-purple transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:info@rougeelabs.com"
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-neon-green hover:bg-neon-green/10 transition-all group cursor-none"
                  data-interactive="true"
                  aria-label="Email us"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-neon-green transition-colors" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 font-mono text-xs">
              © {new Date().getFullYear()} ROUGEE LABS. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-600 font-mono text-xs">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default App;