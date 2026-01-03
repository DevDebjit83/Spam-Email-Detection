import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Cpu, Network, CheckCircle, ArrowRight } from 'lucide-react';
import { mockSteps } from '../data/mock';

const iconMap = {
  Mail,
  Cpu,
  Network,
  CheckCircle
};

const StepCard = ({ step, index, isLast }) => {
  const Icon = iconMap[step.icon];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative flex flex-col items-center"
    >
      {/* Connecting line */}
      {!isLast && (
        <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px]">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            viewport={{ once: true }}
            className="h-full bg-gradient-to-r from-cyan-500/50 to-indigo-500/50 origin-left"
          />
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.8 }}
            viewport={{ once: true }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </div>
      )}

      {/* Step number badge */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-gray-800 flex items-center justify-center mb-6 group cursor-pointer"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        
        {/* Inner glow ring */}
        <div className="absolute inset-[3px] rounded-xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon */}
        <Icon className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors relative z-10" />
        
        {/* Step number */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-cyan-500/30">
          {step.id}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        viewport={{ once: true }}
        className="text-center max-w-xs"
      >
        <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
      </motion.div>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

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
            className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4"
          >
            Simple Process
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Works
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Four simple steps to detect spam emails with our AI-powered analysis engine
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
          {mockSteps.map((step, index) => (
            <StepCard 
              key={step.id} 
              step={step} 
              index={index} 
              isLast={index === mockSteps.length - 1}
            />
          ))}
        </div>

        {/* Bottom illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 border border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Processing Power</h4>
                <p className="text-gray-500 text-sm">10,000+ emails analyzed per second</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-800 hidden md:block" />
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Network className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Neural Network</h4>
                <p className="text-gray-500 text-sm">12-layer deep learning model</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-800 hidden md:block" />
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Accuracy</h4>
                <p className="text-gray-500 text-sm">99.2% detection rate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
