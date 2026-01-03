import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Shield, Zap } from 'lucide-react';

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
          className="relative h-[400px] md:h-[500px] rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800 overflow-hidden"
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

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Cpu, label: 'Processing Units', value: '128 TPU Cores' },
            { icon: Database, label: 'Training Data', value: '50M+ Emails' },
            { icon: Shield, label: 'Model Accuracy', value: '99.2%' },
            { icon: Zap, label: 'Inference Time', value: '<10ms' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIVisualization;
