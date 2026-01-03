import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Brain, Target, Zap, Shield, Globe, Code, Sparkles, ArrowUpRight } from 'lucide-react';
import { mockFeatures } from '../data/mock';

const iconMap = {
  Brain,
  Target,
  Zap,
  Shield,
  Globe,
  Code
};

// 3D Tilt Card Effect
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Unique Feature Card with asymmetric design
const FeatureCard = ({ feature, index }) => {
  const Icon = iconMap[feature.icon];
  const [isHovered, setIsHovered] = useState(false);
  
  // Different accent colors for each card
  const accents = [
    { border: 'hover:border-cyan-500/50', bg: 'from-cyan-500/10', icon: 'from-cyan-400 to-cyan-600', glow: 'group-hover:shadow-cyan-500/20' },
    { border: 'hover:border-amber-500/50', bg: 'from-amber-500/10', icon: 'from-amber-400 to-amber-600', glow: 'group-hover:shadow-amber-500/20' },
    { border: 'hover:border-violet-500/50', bg: 'from-violet-500/10', icon: 'from-violet-400 to-violet-600', glow: 'group-hover:shadow-violet-500/20' },
    { border: 'hover:border-emerald-500/50', bg: 'from-emerald-500/10', icon: 'from-emerald-400 to-emerald-600', glow: 'group-hover:shadow-emerald-500/20' },
    { border: 'hover:border-rose-500/50', bg: 'from-rose-500/10', icon: 'from-rose-400 to-rose-600', glow: 'group-hover:shadow-rose-500/20' },
    { border: 'hover:border-blue-500/50', bg: 'from-blue-500/10', icon: 'from-blue-400 to-blue-600', glow: 'group-hover:shadow-blue-500/20' },
  ];
  
  const accent = accents[index % accents.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <TiltCard>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative h-full p-6 md:p-8 rounded-[24px] border border-white/[0.08] ${accent.border} bg-[#0d0d14] overflow-hidden cursor-pointer transition-all duration-500 group-hover:shadow-2xl ${accent.glow}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Animated gradient background on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${accent.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Corner accent line */}
          <motion.div
            className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-white/30 to-transparent"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-0 left-0 h-20 w-px bg-gradient-to-b from-white/30 to-transparent"
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={{ scaleY: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content with 3D transform */}
          <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
            {/* Icon with unique styling */}
            <div className="flex items-start justify-between mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.icon} p-[1px] shadow-lg`}
              >
                <div className="w-full h-full rounded-2xl bg-[#0d0d14] flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
              >
                <ArrowUpRight className="w-4 h-4 text-white/60" />
              </motion.div>
            </div>

            {/* Title with gradient on hover */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>

            {/* Bottom line indicator */}
            <motion.div
              className="mt-6 h-[2px] rounded-full bg-gradient-to-r from-white/20 to-transparent"
              initial={{ width: "30%" }}
              animate={{ width: isHovered ? "100%" : "30%" }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon className="w-full h-full" />
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]" />
      
      {/* Ambient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]"
        style={{ left: '-15%', top: '20%' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[100px]"
        style={{ right: '-10%', bottom: '10%' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why This System Is{' '}
            <br className="hidden md:block" />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                Powerful
              </span>
              {/* Underline decoration */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M2 8 Q100 -5 198 8"
                  stroke="url(#underlineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="underlineGradient" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with cutting-edge AI technology to provide the most accurate and fastest spam detection
          </p>
        </motion.div>

        {/* Features grid with asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFeatures.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA card - Unique design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative p-[1px] rounded-[32px] bg-gradient-to-r from-cyan-500/50 via-violet-500/50 to-cyan-500/50 overflow-hidden">
            <div className="relative p-10 md:p-14 rounded-[31px] bg-[#0a0a0f] overflow-hidden">
              {/* Animated gradient border effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-cyan-500/5"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 100%' }}
              />

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-lg">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Ready to protect your inbox?
                    </h3>
                    <p className="text-gray-400 text-lg">
                      Join thousands of users who trust our AI to keep their emails safe and spam-free.
                    </p>
                  </motion.div>
                </div>
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative shrink-0 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold text-white shadow-xl shadow-cyan-500/20 transition-shadow hover:shadow-cyan-500/40"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Analysis
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
