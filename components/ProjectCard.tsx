import React, { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Cpu } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const rotateX = useTransform(y, [-100, 100], isTouchDevice ? [0, 0] : [5, -5]);
  const rotateY = useTransform(x, [-100, 100], isTouchDevice ? [0, 0] : [-5, 5]);
  
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="perspective-1000 w-full mb-16 flex justify-center items-center px-4"
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
        className="relative w-full max-w-6xl group cursor-none hover:shadow-[0_0_60px_-15px_rgba(188,19,254,0.3)] rounded-2xl transition-shadow duration-500"
      >
        {/* Animated Gradient Border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-20 group-hover:opacity-80 blur-md transition-opacity duration-500" />
        
        <div className="relative bg-dark-bg/95 border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl overflow-hidden backdrop-blur-xl group-hover:border-white/20 transition-colors duration-300">
           
           {/* Grid Background Effect */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            
            {/* Image Section */}
            <div className="relative h-48 sm:h-64 md:h-80 w-full rounded-xl overflow-hidden border border-white/10 group-hover:border-neon-cyan/30 transition-all">
                {/* Loading Skeleton */}
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 bg-dark-surface animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
                  </div>
                )}
                
                {/* Error State */}
                {imageError && (
                  <div className="absolute inset-0 bg-dark-surface flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-neon-purple text-4xl mb-2">⚠</div>
                      <p className="text-gray-500 text-xs font-mono">Image unavailable</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-neon-purple/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors" />
                <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Info Section */}
            <div className="w-full space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 sm:pb-4 flex-wrap gap-2">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                  <span className="text-neon-cyan font-mono text-[10px] sm:text-xs tracking-widest border border-neon-cyan/30 px-2 py-1 rounded bg-neon-cyan/5">
                    PROJECT_0{project.id}
                  </span>
                  <span className="text-gray-500 font-mono text-[10px] sm:text-xs">BUILD: {project.year}</span>
                </div>
                <div className="flex gap-1">
                   {[1,2,3].map(i => (
                     <div key={i} className={`w-1 h-1 rounded-full ${i===1 ? 'bg-neon-green' : 'bg-gray-700'} ${i===1 ? 'animate-pulse' : ''}`} />
                   ))}
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight group-hover:text-neon-cyan transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-neon-purple text-[10px] sm:text-xs font-mono tracking-widest uppercase">
                  {project.category}
                </p>
              </div>
              
              <p className="text-gray-400 leading-relaxed font-light text-xs sm:text-sm md:text-base border-l-2 border-white/10 pl-3 sm:pl-4 group-hover:border-neon-cyan/50 transition-colors">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                {project.technologies.map((tech, i) => (
                  <motion.span 
                    key={tech} 
                    className="flex items-center text-[9px] sm:text-[10px] md:text-xs font-mono text-gray-300 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded border border-white/10 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 transition-all cursor-default"
                    whileHover={isTouchDevice ? {} : { y: -2 }}
                  >
                    <Cpu size={9} className="sm:w-[10px] sm:h-[10px] mr-1 sm:mr-1.5 opacity-50" />
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                <a 
                  href={project.liveUrl || '#'} 
                  target={project.liveUrl ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-bold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm hover:bg-neon-cyan transition-all duration-300 clip-path-slant group/btn ${!project.liveUrl && 'opacity-50 cursor-not-allowed'}`}
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                   <ExternalLink size={14} className="sm:w-4 sm:h-4 group-hover/btn:rotate-45 transition-transform" />
                   <span>Launch dApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;