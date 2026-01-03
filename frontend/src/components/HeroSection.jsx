import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const FloatingIcon = ({ children, delay, duration, x, y }) => (
  <motion.div
    className="absolute opacity-20"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: duration || 6,
      delay: delay || 0,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const TypewriterText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 align-middle"
      />
    </span>
  );
};

const HeroSection = ({ onCheckEmailClick, onHowItWorksClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating icons */}
      <FloatingIcon x={10} y={20} delay={0} duration={8}>
        <Mail className="w-12 h-12 text-cyan-500" />
      </FloatingIcon>
      <FloatingIcon x={85} y={15} delay={1} duration={7}>
        <Shield className="w-16 h-16 text-emerald-500" />
      </FloatingIcon>
      <FloatingIcon x={75} y={70} delay={2} duration={9}>
        <AlertTriangle className="w-10 h-10 text-rose-500" />
      </FloatingIcon>
      <FloatingIcon x={15} y={65} delay={0.5} duration={6}>
        <Sparkles className="w-8 h-8 text-indigo-400" />
      </FloatingIcon>
      <FloatingIcon x={50} y={80} delay={1.5} duration={8}>
        <Mail className="w-6 h-6 text-cyan-400" />
      </FloatingIcon>
      <FloatingIcon x={90} y={45} delay={2.5} duration={7}>
        <Shield className="w-10 h-10 text-emerald-400" />
      </FloatingIcon>

      {/* Glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]"
        style={{ left: '10%', top: '20%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[80px]"
        style={{ right: '10%', bottom: '20%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300 font-medium">Powered by Advanced AI & Machine Learning</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Detect Spam.</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Protect Inbox.
          </span>
          <br />
          <TypewriterText text="Powered by AI." className="text-white" />
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Real-time AI-powered spam detection that analyzes email content, sender patterns, 
          and hidden threats to keep your inbox clean and secure.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onCheckEmailClick}
            className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Check Email Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          </Button>

          <Button
            onClick={onHowItWorksClick}
            variant="outline"
            className="px-8 py-6 text-lg font-semibold border-2 border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-cyan-300 rounded-xl transition-all duration-300 hover:bg-cyan-500/5"
          >
            How It Works
          </Button>
        </motion.div>

        {/* Unique Stats Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
            {[
              { label: "Emails Analyzed", value: "2.5M+", color: "cyan" },
              { label: "Spam Blocked", value: "847K+", color: "violet" },
              { label: "Accuracy Rate", value: "99.2%", color: "emerald" },
              { label: "Response Time", value: "<50ms", color: "amber" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="group relative"
              >
                <div className={`relative px-5 py-3 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.1] hover:border-${stat.color}-500/40 transition-all duration-300 cursor-default`}>
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-${stat.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative flex items-center gap-3">
                    {/* Colored indicator dot */}
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      stat.color === 'cyan' ? 'bg-cyan-400' :
                      stat.color === 'violet' ? 'bg-violet-400' :
                      stat.color === 'emerald' ? 'bg-emerald-400' :
                      'bg-amber-400'
                    } shadow-lg ${
                      stat.color === 'cyan' ? 'shadow-cyan-400/50' :
                      stat.color === 'violet' ? 'shadow-violet-400/50' :
                      stat.color === 'emerald' ? 'shadow-emerald-400/50' :
                      'shadow-amber-400/50'
                    }`}>
                      <motion.div
                        className={`w-full h-full rounded-full ${
                          stat.color === 'cyan' ? 'bg-cyan-400' :
                          stat.color === 'violet' ? 'bg-violet-400' :
                          stat.color === 'emerald' ? 'bg-emerald-400' :
                          'bg-amber-400'
                        }`}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <span className={`text-xl md:text-2xl font-bold ${
                        stat.color === 'cyan' ? 'text-cyan-400' :
                        stat.color === 'violet' ? 'text-violet-400' :
                        stat.color === 'emerald' ? 'text-emerald-400' :
                        'text-amber-400'
                      }`}>
                        {stat.value}
                      </span>
                      <span className="text-[11px] text-gray-500 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-cyan-400 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
