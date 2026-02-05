import React, { Suspense, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowDown, Mail, Send, ExternalLink, 
  Brain, MessageSquare, Shield, Puzzle, Clock, TrendingUp,
  Sparkles, Zap, Check, ChevronRight
} from 'lucide-react';
import GltchNavigation from './components/GltchNavigation';
import GltchHero3D from './components/GltchHero3D';
import ServiceCard from './components/ServiceCard';
import CircuitBackground from './components/CircuitBackground';
import BackToTop from '../components/BackToTop';
import { SERVICES, FEATURES, STEPS, SOCIAL_LINKS } from './constants';

// Custom cursor component
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-interactive]') || target.tagName === 'A' || target.tagName === 'BUTTON') {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neon-cyan/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
};

// Icon mapping for features
const featureIconMap: { [key: string]: React.ElementType } = {
  Brain,
  MessageSquare,
  Shield,
  Puzzle,
  Clock,
  TrendingUp,
};

function GltchApp() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const heroTitleX = useTransform(mouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [15, -15]);
  const heroTitleY = useTransform(mouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [15, -15]);
  const heroSubtitleX = useTransform(mouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [25, -25]);
  const heroSubtitleY = useTransform(mouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [25, -25]);

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
    const subject = `GLTCH Demo Request from ${formData.name || 'Unknown'} - ${formData.company || 'N/A'}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nInterested In: ${formData.service}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:info@rougeelabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-dark-bg min-h-screen text-white selection:bg-neon-cyan selection:text-black relative">
      <CustomCursor />
      <GltchNavigation />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        onMouseMove={handleHeroMouseMove}
      >
        <Suspense fallback={<div className="text-neon-cyan">Initializing GLTCH...</div>}>
          <GltchHero3D />
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
              AI STATUS: OPERATIONAL
            </motion.h2>
            <motion.h1 
              style={{ x: heroTitleX, y: heroTitleY }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-4 md:mb-6 leading-tight px-2"
            >
              <span 
                className="glitch-text relative inline-block"
                data-text="GLTCH"
              >
                GLTCH
              </span>
            </motion.h1>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide mb-8 md:mb-12 px-4"
            >
              Custom-trained AI powering smart homes, restaurants, hotels, apartments, and small businesses. Intelligent automation from RouGee Labs.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
            >
              <a 
                href="#solutions"
                className="px-8 py-3 bg-neon-cyan text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 rounded cursor-none flex items-center gap-2 group"
                data-interactive="true"
              >
                Explore Solutions
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact"
                className="px-8 py-3 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:border-neon-purple hover:text-neon-purple transition-all duration-300 rounded cursor-none"
                data-interactive="true"
              >
                Request Demo
              </a>
            </motion.div>
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

      {/* Tech ticker band */}
      <div className="w-full bg-neon-cyan/5 border-y border-neon-cyan/20 py-2 sm:py-3 overflow-hidden flex relative z-20 backdrop-blur-sm">
        <motion.div 
          className="flex gap-8 sm:gap-12 md:gap-16 whitespace-nowrap text-[10px] sm:text-xs font-mono text-neon-cyan/80"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {Array(10).fill("SMART HOME // RESTAURANT // HOTEL // APARTMENT // RETAIL // VOICE AI // AUTOMATION // IOT // MACHINE LEARNING //").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Solutions Section */}
      <section id="solutions" className="relative py-16 sm:py-24 md:py-32 px-4 container mx-auto z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 pl-4 border-l-4 border-neon-cyan"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4">
            <span className="text-neon-cyan">AI</span> SOLUTIONS
          </h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm tracking-widest">TAILORED FOR YOUR INDUSTRY_</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-16 sm:py-24 md:py-32 bg-dark-surface overflow-hidden">
        <CircuitBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
              WHY <span className="text-neon-purple">GLTCH</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Built from the ground up for real-world automation challenges. GLTCH combines cutting-edge AI with practical reliability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURES.map((feature, i) => {
              const IconComponent = featureIconMap[feature.icon] || Brain;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-neon-cyan/30 transition-all group cursor-none"
                  data-interactive="true"
                >
                  <div className="p-3 w-fit rounded-xl bg-neon-cyan/10 mb-4 group-hover:bg-neon-cyan/20 transition-colors">
                    <IconComponent size={24} className="text-neon-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 md:py-32 relative border-t border-white/5 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
              HOW IT <span className="text-neon-green">WORKS</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Get up and running in minutes, not months. Our streamlined process gets GLTCH working for you fast.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-neon-cyan/50 to-transparent z-0" />
                  )}
                  
                  <div className="bg-dark-surface p-6 rounded-2xl border border-white/10 hover:border-neon-cyan/30 transition-all relative z-10 h-full">
                    <div className="text-4xl sm:text-5xl font-black text-neon-cyan/20 mb-4 font-mono">
                      {step.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-cyan/10" />
        <div className="absolute inset-0 bg-dark-bg/80" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-neon-cyan mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="text-neon-purple">Transform</span> Your Space?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
              Join the growing number of homes and businesses powered by GLTCH. Experience the future of intelligent automation today.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neon-cyan text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 rounded cursor-none group"
              data-interactive="true"
            >
              <Zap size={18} className="group-hover:rotate-12 transition-transform" />
              Schedule Your Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(188,19,254,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(188,19,254,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 px-4">GET STARTED</h2>
            <p className="text-neon-cyan font-mono text-xs sm:text-sm md:text-base px-4">REQUEST YOUR PERSONALIZED DEMO_</p>
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
                <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" 
                  placeholder="John Smith" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" 
                  placeholder="john@company.com" 
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Company / Property</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all" 
                  placeholder="Acme Inc." 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Interested In</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all cursor-none appearance-none"
                  required
                >
                  <option value="">Select a solution...</option>
                  <option value="smart-home">Smart Home</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="small-business">Small Business</option>
                  <option value="hotel">Hotel</option>
                  <option value="apartment">Apartment / Property</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-6 sm:mb-8">
              <label className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase">Tell Us About Your Project</label>
              <textarea 
                rows={5} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded p-3 sm:p-4 text-white text-base focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all resize-none" 
                placeholder="Describe your space, current systems, and automation goals..." 
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-neon-cyan text-black font-bold uppercase tracking-widest py-3 sm:py-4 rounded hover:bg-white transition-colors flex items-center justify-center gap-2 group cursor-none text-sm sm:text-base min-h-[44px]"
              data-interactive="true"
            >
              Request Demo <Send size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-8 text-center">
              <p className="text-gray-400 font-mono text-sm">
                Or email us directly at <a href="mailto:info@rougeelabs.com" className="text-neon-cyan hover:text-white transition-colors" data-interactive="true">info@rougeelabs.com</a>
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
              <h3 className="text-xl font-bold text-white mb-2">GLTCH</h3>
              <p className="text-neon-cyan text-xs font-mono mb-2">By RouGee Labs</p>
              <p className="text-gray-500 font-mono text-xs leading-relaxed">
                Custom-trained AI powering the next generation of smart spaces. From homes to hotels, we make automation intelligent.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#solutions" className="text-gray-500 hover:text-neon-cyan transition-colors font-mono text-xs" data-interactive="true">Solutions</a>
                <a href="#features" className="text-gray-500 hover:text-neon-cyan transition-colors font-mono text-xs" data-interactive="true">Features</a>
                <a href="#how-it-works" className="text-gray-500 hover:text-neon-cyan transition-colors font-mono text-xs" data-interactive="true">How It Works</a>
                <a href="#contact" className="text-gray-500 hover:text-neon-cyan transition-colors font-mono text-xs" data-interactive="true">Contact</a>
                <a href="/" className="text-gray-500 hover:text-neon-purple transition-colors font-mono text-xs" data-interactive="true">RouGee Labs →</a>
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
              © {new Date().getFullYear()} GLTCH by RouGee Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-600 font-mono text-xs">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span>AI Systems Online</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default GltchApp;
