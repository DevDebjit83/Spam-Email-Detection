import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Cpu, Database, Shield, Zap, Activity, TrendingUp } from 'lucide-react';

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * numericValue));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [numericValue, duration]);

  return <span>{count}{suffix}</span>;
};

// Magnetic hover effect for cards
const MagneticCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) / 10);
      y.set((e.clientY - centerY) / 10);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Unique Bento Grid Stats Section
const BentoStatsGrid = () => {
  const stats = [
    { 
      id: 1,
      icon: Cpu, 
      value: '128', 
      suffix: ' TPU',
      label: 'Processing Cores',
      color: 'cyan',
      size: 'large',
      description: 'Parallel computing power'
    },
    { 
      id: 2,
      icon: Database, 
      value: '50', 
      suffix: 'M+',
      label: 'Emails Trained',
      color: 'violet',
      size: 'medium'
    },
    { 
      id: 3,
      icon: Shield, 
      value: '99.2', 
      suffix: '%',
      label: 'Accuracy',
      color: 'emerald',
      size: 'medium'
    },
    { 
      id: 4,
      icon: Zap, 
      value: '10', 
      suffix: 'ms',
      label: 'Response',
      color: 'amber',
      size: 'small'
    },
    { 
      id: 5,
      icon: Activity, 
      value: '24/7',
      suffix: '',
      label: 'Uptime',
      color: 'rose',
      size: 'small'
    },
  ];

  const colorVariants = {
    cyan: {
      bg: 'from-cyan-500/20 via-cyan-400/10 to-transparent',
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/20',
      accent: 'bg-cyan-400',
    },
    violet: {
      bg: 'from-violet-500/20 via-violet-400/10 to-transparent',
      border: 'border-violet-500/30 hover:border-violet-400/60',
      text: 'text-violet-400',
      glow: 'shadow-violet-500/20',
      accent: 'bg-violet-400',
    },
    emerald: {
      bg: 'from-emerald-500/20 via-emerald-400/10 to-transparent',
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20',
      accent: 'bg-emerald-400',
    },
    amber: {
      bg: 'from-amber-500/20 via-amber-400/10 to-transparent',
      border: 'border-amber-500/30 hover:border-amber-400/60',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/20',
      accent: 'bg-amber-400',
    },
    rose: {
      bg: 'from-rose-500/20 via-rose-400/10 to-transparent',
      border: 'border-rose-500/30 hover:border-rose-400/60',
      text: 'text-rose-400',
      glow: 'shadow-rose-500/20',
      accent: 'bg-rose-400',
    },
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 auto-rows-[80px] md:auto-rows-[100px]">
      {/* Large feature card - spans 2 cols and 2 rows */}
      <MagneticCard className="col-span-2 row-span-2 relative group">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className={`h-full p-5 md:p-6 rounded-[28px] border ${colorVariants.cyan.border} bg-gradient-to-br ${colorVariants.cyan.bg} backdrop-blur-xl overflow-hidden relative cursor-pointer transition-all duration-500 hover:shadow-2xl ${colorVariants.cyan.glow}`}
        >
          {/* Animated background orb */}
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Icon with pulse effect */}
          <div className="relative">
            <motion.div
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"
              whileHover={{ rotate: 10 }}
            >
              <Cpu className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-2xl bg-cyan-400/50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div className="mt-4">
            <motion.p
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedCounter value="128" suffix="" /> 
              <span className="text-cyan-400 text-2xl md:text-3xl ml-1">TPU</span>
            </motion.p>
            <p className="text-gray-400 text-sm mt-1">Processing Cores</p>
            <p className="text-gray-500 text-xs mt-2 hidden md:block">Parallel computing power for instant analysis</p>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-4 right-4 opacity-10">
            <Cpu className="w-20 h-20 text-cyan-400" />
          </div>
        </motion.div>
      </MagneticCard>

      {/* Medium card - Training Data */}
      <MagneticCard className="col-span-2 row-span-1 relative group">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`h-full p-4 rounded-[20px] border ${colorVariants.violet.border} bg-gradient-to-r ${colorVariants.violet.bg} backdrop-blur-xl overflow-hidden relative cursor-pointer transition-all duration-500 hover:shadow-xl ${colorVariants.violet.glow}`}
        >
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  <AnimatedCounter value="50" suffix="M+" />
                </p>
                <p className="text-gray-400 text-xs">Emails Trained</p>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end">
              <TrendingUp className="w-5 h-5 text-violet-400" />
              <span className="text-violet-400 text-xs mt-1">Growing</span>
            </div>
          </div>
        </motion.div>
      </MagneticCard>

      {/* Accuracy card with circular progress */}
      <MagneticCard className="col-span-2 row-span-2 relative group">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className={`h-full p-5 rounded-[28px] border ${colorVariants.emerald.border} bg-gradient-to-br ${colorVariants.emerald.bg} backdrop-blur-xl overflow-hidden relative cursor-pointer transition-all duration-500 hover:shadow-2xl ${colorVariants.emerald.glow}`}
        >
          {/* Circular progress */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative">
              <svg className="w-24 h-24 md:w-32 md:h-32 -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-gray-800"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="url(#emeraldGradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 283" }}
                  whileInView={{ strokeDasharray: "280 283" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl md:text-4xl font-black text-white">99.2</span>
                <span className="text-emerald-400 text-sm font-semibold">%</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-white font-semibold">Model Accuracy</p>
              <p className="text-gray-500 text-xs mt-1">Industry leading precision</p>
            </div>
          </div>
        </motion.div>
      </MagneticCard>

      {/* Small cards row */}
      <MagneticCard className="col-span-2 md:col-span-1 row-span-1 relative group">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className={`h-full p-4 rounded-[16px] border ${colorVariants.amber.border} bg-gradient-to-br ${colorVariants.amber.bg} backdrop-blur-xl overflow-hidden relative cursor-pointer transition-all duration-500 flex flex-col justify-center items-center hover:shadow-xl ${colorVariants.amber.glow}`}
        >
          <Zap className="w-6 h-6 text-amber-400 mb-1" />
          <p className="text-xl font-bold text-white"><AnimatedCounter value="10" suffix="ms" /></p>
          <p className="text-gray-500 text-[10px]">Response</p>
        </motion.div>
      </MagneticCard>

      <MagneticCard className="col-span-2 md:col-span-1 row-span-1 relative group">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className={`h-full p-4 rounded-[16px] border ${colorVariants.rose.border} bg-gradient-to-br ${colorVariants.rose.bg} backdrop-blur-xl overflow-hidden relative cursor-pointer transition-all duration-500 flex flex-col justify-center items-center hover:shadow-xl ${colorVariants.rose.glow}`}
        >
          <Activity className="w-6 h-6 text-rose-400 mb-1" />
          <p className="text-xl font-bold text-white">24/7</p>
          <p className="text-gray-500 text-[10px]">Uptime</p>
        </motion.div>
      </MagneticCard>
    </div>
  );
};

// Neural Node component
const NeuralNode = ({ x, y, delay, size = 8 }) => (
  <motion.div
    className="absolute rounded-full bg-cyan-400"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`,
      width: size,
      height: size,
      transform: 'translate(-50%, -50%)'
    }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <motion.div
      className="absolute inset-0 rounded-full bg-cyan-400"
      animate={{ 
        scale: [1, 1.8, 1],
        opacity: [0.8, 0, 0.8]
      }}
      transition={{ 
        duration: 2,
        delay: delay + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.div>
);

const DataParticle = ({ startX, startY, endX, endY, delay }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
    style={{ left: `${startX}%`, top: `${startY}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      left: [`${startX}%`, `${endX}%`],
      top: [`${startY}%`, `${endY}%`],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.2, 0.8, 1]
    }}
  />
);

const ConnectionLine = ({ x1, y1, x2, y2, delay }) => (
  <motion.svg
    className="absolute inset-0 w-full h-full"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke="url(#gradient)"
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: delay + 0.2 }}
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
        <stop offset="50%" stopColor="rgba(99, 102, 241, 0.5)" />
        <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const AIVisualization = () => {
  // Neural network node positions
  const inputNodes = [
    { x: 15, y: 25 },
    { x: 15, y: 40 },
    { x: 15, y: 55 },
    { x: 15, y: 70 },
  ];

  const hiddenLayer1 = [
    { x: 35, y: 20 },
    { x: 35, y: 35 },
    { x: 35, y: 50 },
    { x: 35, y: 65 },
    { x: 35, y: 80 },
  ];

  const hiddenLayer2 = [
    { x: 55, y: 25 },
    { x: 55, y: 40 },
    { x: 55, y: 55 },
    { x: 55, y: 70 },
  ];

  const hiddenLayer3 = [
    { x: 75, y: 30 },
    { x: 75, y: 47 },
    { x: 75, y: 64 },
  ];

  const outputNodes = [
    { x: 90, y: 40 },
    { x: 90, y: 60 },
  ];

  // Generate connections
  const connections = [];
  inputNodes.forEach((input, i) => {
    hiddenLayer1.forEach((hidden, j) => {
      connections.push({ x1: input.x, y1: input.y, x2: hidden.x, y2: hidden.y, delay: i * 0.1 + j * 0.05 });
    });
  });

  // Data flow particles
  const particles = [
    { startX: 15, startY: 25, endX: 35, endY: 35, delay: 0 },
    { startX: 15, startY: 55, endX: 35, endY: 50, delay: 0.5 },
    { startX: 35, startY: 35, endX: 55, endY: 40, delay: 1 },
    { startX: 35, startY: 65, endX: 55, endY: 55, delay: 1.5 },
    { startX: 55, startY: 40, endX: 75, endY: 47, delay: 2 },
    { startX: 55, startY: 55, endX: 75, endY: 47, delay: 2.3 },
    { startX: 75, startY: 47, endX: 90, endY: 40, delay: 2.8 },
    { startX: 75, startY: 47, endX: 90, endY: 60, delay: 3 },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d18] to-[#0a0a0f]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4"
          >
            Under The Hood
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Neural Network
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch how our deep learning model processes and classifies emails in real-time
          </p>
        </motion.div>

        {/* Neural network visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[350px] md:h-[400px] rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800 overflow-hidden mb-10"
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at center, rgba(34, 211, 238, 0.4) 1px, transparent 1px)`,
              backgroundSize: '25px 25px'
            }} />
          </div>

          {/* Layer labels */}
          <div className="absolute top-4 left-[15%] transform -translate-x-1/2">
            <span className="text-xs text-gray-500">Input</span>
          </div>
          <div className="absolute top-4 left-[45%] transform -translate-x-1/2">
            <span className="text-xs text-gray-500">Hidden Layers</span>
          </div>
          <div className="absolute top-4 left-[90%] transform -translate-x-1/2">
            <span className="text-xs text-gray-500">Output</span>
          </div>

          {/* Connection lines */}
          {connections.slice(0, 10).map((conn, i) => (
            <ConnectionLine key={i} {...conn} />
          ))}

          {/* Data flow particles */}
          {particles.map((particle, i) => (
            <DataParticle key={i} {...particle} />
          ))}

          {/* Input layer nodes */}
          {inputNodes.map((node, i) => (
            <NeuralNode key={`input-${i}`} {...node} delay={i * 0.1} size={12} />
          ))}

          {/* Hidden layer 1 */}
          {hiddenLayer1.map((node, i) => (
            <NeuralNode key={`h1-${i}`} {...node} delay={0.5 + i * 0.08} size={10} />
          ))}

          {/* Hidden layer 2 */}
          {hiddenLayer2.map((node, i) => (
            <NeuralNode key={`h2-${i}`} {...node} delay={0.9 + i * 0.08} size={10} />
          ))}

          {/* Hidden layer 3 */}
          {hiddenLayer3.map((node, i) => (
            <NeuralNode key={`h3-${i}`} {...node} delay={1.2 + i * 0.08} size={10} />
          ))}

          {/* Output layer */}
          {outputNodes.map((node, i) => (
            <NeuralNode key={`output-${i}`} {...node} delay={1.5 + i * 0.1} size={14} />
          ))}

          {/* Output labels */}
          <motion.div
            className="absolute right-4 md:right-8"
            style={{ top: '38%' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Safe</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute right-4 md:right-8"
            style={{ top: '58%' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.9 }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <span className="text-sm text-rose-400 font-medium">Spam</span>
            </div>
          </motion.div>

          {/* Input labels */}
          <motion.div
            className="absolute left-2 md:left-4 flex flex-col gap-6 md:gap-8"
            style={{ top: '22%' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {['Sender', 'Content', 'Links', 'Headers'].map((label, i) => (
              <span key={i} className="text-[10px] md:text-xs text-gray-500">{label}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Bento Grid Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <BentoStatsGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default AIVisualization;
