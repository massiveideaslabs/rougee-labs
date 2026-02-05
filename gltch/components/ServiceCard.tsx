import React, { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Home, UtensilsCrossed, Store, Hotel, Building2, Check } from 'lucide-react';
import { Service } from '../types';

const iconMap: { [key: string]: React.ElementType } = {
  Home,
  UtensilsCrossed,
  Store,
  Hotel,
  Building2,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const rotateX = useTransform(y, [-100, 100], isTouchDevice ? [0, 0] : [3, -3]);
  const rotateY = useTransform(x, [-100, 100], isTouchDevice ? [0, 0] : [-3, 3]);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = iconMap[service.icon] || Home;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
      data-interactive="true"
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group cursor-none"
      >
        {/* Gradient Border */}
        <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${service.gradient} opacity-20 group-hover:opacity-60 blur-sm transition-opacity duration-500`} />
        
        <div className="relative bg-dark-bg/95 border border-white/10 p-6 sm:p-8 rounded-2xl overflow-hidden backdrop-blur-xl group-hover:border-white/20 transition-all duration-300 h-full">
          {/* Background Icon */}
          <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <IconComponent size={120} />
          </div>
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-4`}>
              <IconComponent size={24} className="text-white" />
            </div>
            
            {/* Title & Tagline */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
              {service.title}
            </h3>
            <p className="text-neon-purple text-xs font-mono tracking-widest uppercase mb-4">
              {service.tagline}
            </p>
            
            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {service.description}
            </p>
            
            {/* Features */}
            <div className="space-y-2">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-neon-green flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Learn More */}
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 mt-6 text-sm font-mono text-neon-cyan hover:text-white transition-colors group/link"
            >
              <span>Learn More</span>
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;
