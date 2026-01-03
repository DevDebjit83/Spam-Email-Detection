import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertTriangle, CheckCircle, Loader2, Sparkles, Shield, Trash2, Terminal, Scan, Cpu, Radio, Wifi, Database, Lock, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { mockSpamResults, sampleEmails } from '../data/mock';

// Matrix rain background effect
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#22d3ee20';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />;
};

// Scanning line animation
const ScanningBeam = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ top: 0, opacity: 0 }}
        animate={{ 
          top: ['0%', '100%'],
          opacity: [0, 1, 1, 0]
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-0 blur-sm bg-cyan-400" />
      </motion.div>
    )}
  </AnimatePresence>
);

// Glitch text effect
const GlitchText = ({ children, className }) => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={glitchActive ? 'animate-pulse' : ''}>{children}</span>
      {glitchActive && (
        <>
          <span className="absolute top-0 left-[2px] text-cyan-400 opacity-70 clip-glitch-1">{children}</span>
          <span className="absolute top-0 left-[-2px] text-rose-400 opacity-70 clip-glitch-2">{children}</span>
        </>
      )}
    </span>
  );
};

// Animated status indicator
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    idle: { color: 'cyan', text: 'SYSTEM READY', icon: Terminal },
    scanning: { color: 'amber', text: 'ANALYZING...', icon: Scan },
    spam: { color: 'rose', text: 'THREAT DETECTED', icon: AlertTriangle },
    safe: { color: 'emerald', text: 'SECURE', icon: CheckCircle },
  };

  const config = statusConfig[status] || statusConfig.idle;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <div className="relative">
        <motion.div
          className={`w-3 h-3 rounded-full bg-${config.color}-400`}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className={`absolute inset-0 rounded-full bg-${config.color}-400 blur-md opacity-50`} />
      </div>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 text-${config.color}-400`} />
        <span className={`text-xs font-mono uppercase tracking-widest text-${config.color}-400`}>
          {config.text}
        </span>
      </div>
    </motion.div>
  );
};

// Terminal-style stats bar
const TerminalStats = () => {
  const [stats, setStats] = useState({
    cpu: 45,
    memory: 62,
    network: 88
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: 40 + Math.random() * 30,
        memory: 55 + Math.random() * 20,
        network: 80 + Math.random() * 15
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-wider text-gray-500">
      <div className="flex items-center gap-2">
        <Cpu className="w-3 h-3" />
        <span>CPU: <span className="text-cyan-400">{stats.cpu.toFixed(0)}%</span></span>
      </div>
      <div className="flex items-center gap-2">
        <Database className="w-3 h-3" />
        <span>MEM: <span className="text-cyan-400">{stats.memory.toFixed(0)}%</span></span>
      </div>
      <div className="flex items-center gap-2">
        <Wifi className="w-3 h-3" />
        <span>NET: <span className="text-emerald-400">{stats.network.toFixed(0)}%</span></span>
      </div>
    </div>
  );
};

// Confidence meter with futuristic design
const ConfidenceMeter = ({ value, isSpam }) => {
  const color = isSpam ? 'rose' : 'emerald';
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Threat Confidence</span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-2xl font-bold font-mono text-${color}-400`}
        >
          {value}%
        </motion.span>
      </div>
      <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 rounded-full ${isSpam ? 'bg-gradient-to-r from-rose-600 to-rose-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`}
        />
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${isSpam ? 'bg-rose-400' : 'bg-emerald-400'} blur-md opacity-50`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      {/* Risk level bars */}
      <div className="flex justify-between mt-2 text-[9px] font-mono uppercase tracking-wider text-gray-600">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Critical</span>
      </div>
    </div>
  );
};

// Result card with futuristic design
const ResultCard = ({ result, onReset }) => {
  const isSpam = result.isSpam;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative"
    >
      {/* Outer glow */}
      <div className={`absolute -inset-1 rounded-2xl ${isSpam ? 'bg-rose-500/20' : 'bg-emerald-500/20'} blur-xl`} />
      
      <div className={`relative p-6 rounded-2xl border-2 ${isSpam ? 'border-rose-500/50 bg-rose-500/5' : 'border-emerald-500/50 bg-emerald-500/5'} backdrop-blur-xl overflow-hidden`}>
        {/* Corner decorations */}
        <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 ${isSpam ? 'border-rose-500/50' : 'border-emerald-500/50'} rounded-tl-2xl`} />
        <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${isSpam ? 'border-rose-500/50' : 'border-emerald-500/50'} rounded-br-2xl`} />

        {/* Status header */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`relative w-20 h-20 rounded-2xl ${isSpam ? 'bg-rose-500/20' : 'bg-emerald-500/20'} flex items-center justify-center`}
          >
            {isSpam ? (
              <AlertTriangle className="w-10 h-10 text-rose-400" />
            ) : (
              <Shield className="w-10 h-10 text-emerald-400" />
            )}
            {/* Pulse ring */}
            <motion.div
              className={`absolute inset-0 rounded-2xl border-2 ${isSpam ? 'border-rose-400' : 'border-emerald-400'}`}
              animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Result label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <GlitchText className={`text-2xl font-bold font-mono ${isSpam ? 'text-rose-400' : 'text-emerald-400'}`}>
            {result.label}
          </GlitchText>
          <p className="text-gray-400 text-sm mt-2">{result.message}</p>
        </motion.div>

        {/* Confidence meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <ConfidenceMeter value={result.confidence} isSpam={isSpam} />
        </motion.div>

        {/* Detected patterns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
            <Eye className="w-3 h-3" />
            Detected Patterns
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {result.detectedPatterns.map((pattern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-center gap-3 text-sm p-2 rounded-lg ${isSpam ? 'bg-rose-500/10' : 'bg-emerald-500/10'}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isSpam ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                <span className="text-gray-300 font-mono text-xs">{pattern}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reset button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={onReset}
            className="w-full bg-white/5 hover:bg-white/10 border border-gray-700 hover:border-gray-600 text-gray-300 font-mono text-sm"
          >
            <Radio className="w-4 h-4 mr-2" />
            INITIATE NEW SCAN
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SpamDetector = () => {
  const [emailText, setEmailText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [systemStatus, setSystemStatus] = useState('idle');

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setSystemStatus('scanning');

    await new Promise(resolve => setTimeout(resolve, 3000));

    const spamKeywords = ['winner', 'prize', 'urgent', 'click here', 'bank details', 'congratulations', '$', 'lottery', 'free', 'act now'];
    const lowerText = emailText.toLowerCase();
    const hasSpamKeywords = spamKeywords.some(keyword => lowerText.includes(keyword));

    setResult(hasSpamKeywords ? mockSpamResults.spam : mockSpamResults.notSpam);
    setSystemStatus(hasSpamKeywords ? 'spam' : 'safe');
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setResult(null);
    setEmailText('');
    setSystemStatus('idle');
  };

  const handleLoadSample = (type) => {
    setEmailText(sampleEmails[type]);
    setResult(null);
    setSystemStatus('idle');
  };

  return (
    <section id="detector" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[150px]"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-mono uppercase tracking-widest text-cyan-400">Live Detection</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <GlitchText>Try It</GlitchText>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
              Now
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Paste your email content below and let our AI analyze it instantly
          </p>
        </motion.div>

        {/* Main terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Outer glow effect */}
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-violet-500/50 blur-sm" />
          
          {/* Main card */}
          <div className="relative rounded-[28px] bg-[#0a0a0f] border border-gray-800 overflow-hidden">
            {/* Terminal header */}
            <div className="px-6 py-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/80 to-gray-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-lg shadow-rose-500/30" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-lg shadow-amber-500/30" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-lg shadow-emerald-500/30" />
                  </div>
                  <div className="h-4 w-px bg-gray-700" />
                  <StatusIndicator status={systemStatus} />
                </div>
                <TerminalStats />
              </div>
            </div>

            {/* Content area */}
            <div className="relative p-6">
              {/* Matrix rain background */}
              <MatrixRain />

              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10"
                  >
                    {/* Sample buttons */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLoadSample('spam')}
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:border-rose-500/60 hover:bg-rose-500/20 transition-all duration-300"
                      >
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span className="text-sm font-mono text-rose-400">LOAD_SPAM_SAMPLE</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLoadSample('safe')}
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/20 transition-all duration-300"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-mono text-emerald-400">LOAD_SAFE_SAMPLE</span>
                      </motion.button>
                    </div>

                    {/* Input area with futuristic styling */}
                    <div className="relative">
                      {/* Corner brackets */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />

                      <Textarea
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        placeholder="> INPUT EMAIL CONTENT FOR ANALYSIS..."
                        className="min-h-[220px] bg-gray-900/50 border-gray-700/50 text-gray-200 placeholder:text-gray-600 rounded-xl resize-none focus:border-cyan-500/50 focus:ring-cyan-500/20 font-mono text-sm transition-all"
                        disabled={isAnalyzing}
                      />
                      
                      {/* Scanning beam */}
                      <ScanningBeam isActive={isAnalyzing} />

                      {/* Line numbers decoration */}
                      <div className="absolute top-3 left-3 flex flex-col gap-[1.35rem] text-[10px] font-mono text-gray-700 select-none pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <span key={i}>{String(i + 1).padStart(2, '0')}</span>
                        ))}
                      </div>
                    </div>

                    {/* Action bar */}
                    <div className="flex items-center justify-between mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEmailText('')}
                        disabled={!emailText || isAnalyzing}
                        className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-mono text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        CLEAR
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleAnalyze}
                        disabled={!emailText.trim() || isAnalyzing}
                        className="group relative px-8 py-4 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Button background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                          animate={{ x: ['0%', '100%', '0%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          style={{ width: '200%', marginLeft: '-50%' }}
                        />
                        
                        {/* Button glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-violet-500/50 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                        
                        {/* Button content */}
                        <span className="relative flex items-center gap-2 font-mono font-bold text-white">
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              SCANNING...
                            </>
                          ) : (
                            <>
                              <Scan className="w-5 h-5" />
                              ANALYZE_EMAIL
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>

                    {/* Analysis progress */}
                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                              <Lock className="w-6 h-6 text-cyan-400" />
                            </div>
                            <motion.div
                              className="absolute inset-0 rounded-xl border-2 border-cyan-400"
                              animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-cyan-300 font-mono text-sm">AI ANALYSIS IN PROGRESS</span>
                              <motion.span 
                                className="text-cyan-400 font-mono text-xs"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                              >
                                PROCESSING
                              </motion.span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2.8, ease: "easeInOut" }}
                              />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-mono text-gray-500">
                              <span>Extracting features</span>
                              <span>Running ML model</span>
                              <span>Generating report</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10"
                  >
                    <ResultCard result={result} onReset={handleReset} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal footer */}
            <div className="px-6 py-3 border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/20">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-600">
                <div className="flex items-center gap-4">
                  <span>v2.5.1</span>
                  <span className="text-cyan-500">●</span>
                  <span>SPAMSHIELD_AI</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>MODEL: GPT-SPAM-V3</span>
                  <span>|</span>
                  <span className="text-emerald-400">SECURE CONNECTION</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpamDetector;
