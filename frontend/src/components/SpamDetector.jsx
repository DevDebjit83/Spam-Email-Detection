import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertTriangle, CheckCircle, Loader2, Sparkles, Shield, Copy, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { mockSpamResults, sampleEmails } from '../data/mock';

const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
    initial={{ top: 0, opacity: 0 }}
    animate={{ 
      top: ['0%', '100%', '0%'],
      opacity: [0, 1, 1, 0]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

const ConfidenceMeter = ({ value, isSpam }) => {
  const color = isSpam ? 'rose' : 'emerald';
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Confidence Score</span>
        <span className={`text-lg font-bold text-${color}-400`}>{value}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${isSpam ? 'bg-gradient-to-r from-rose-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
        />
      </div>
    </div>
  );
};

const ResultCard = ({ result, onReset }) => {
  const isSpam = result.isSpam;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`p-6 rounded-2xl border ${isSpam ? 'bg-rose-500/5 border-rose-500/30' : 'bg-emerald-500/5 border-emerald-500/30'}`}
    >
      {/* Status icon */}
      <div className="flex items-center justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center ${isSpam ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}
        >
          {isSpam ? (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <AlertTriangle className="w-10 h-10 text-rose-400" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Label */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-2xl font-bold text-center mb-2 ${isSpam ? 'text-rose-400' : 'text-emerald-400'}`}
      >
        {result.label}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-center mb-6"
      >
        {result.message}
      </motion.p>

      {/* Confidence meter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
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
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-sm text-gray-500 mb-3">Detected Patterns:</h4>
        <div className="space-y-2">
          {result.detectedPatterns.map((pattern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isSpam ? 'bg-rose-400' : 'bg-emerald-400'}`} />
              <span className="text-gray-300">{pattern}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reset button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6"
      >
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full border-gray-700 hover:border-gray-600 text-gray-300"
        >
          Analyze Another Email
        </Button>
      </motion.div>
    </motion.div>
  );
};

const SpamDetector = () => {
  const [emailText, setEmailText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simple mock logic: check for spam keywords
    const spamKeywords = ['winner', 'prize', 'urgent', 'click here', 'bank details', 'congratulations', '$', 'lottery', 'free', 'act now'];
    const lowerText = emailText.toLowerCase();
    const hasSpamKeywords = spamKeywords.some(keyword => lowerText.includes(keyword));

    setResult(hasSpamKeywords ? mockSpamResults.spam : mockSpamResults.notSpam);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setResult(null);
    setEmailText('');
  };

  const handleLoadSample = (type) => {
    setEmailText(sampleEmails[type]);
    setResult(null);
  };

  return (
    <section id="detector" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4"
          >
            Live Detection
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Try It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Now
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Paste your email content below and let our AI analyze it instantly
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800 p-8 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Sample buttons */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button
                    onClick={() => handleLoadSample('spam')}
                    variant="outline"
                    size="sm"
                    className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Load Spam Sample
                  </Button>
                  <Button
                    onClick={() => handleLoadSample('safe')}
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Load Safe Sample
                  </Button>
                </div>

                {/* Email input area */}
                <div className="relative">
                  <Textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="Paste your email content here..."
                    className="min-h-[200px] bg-gray-900/50 border-gray-700 text-gray-200 placeholder:text-gray-600 rounded-xl resize-none focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                    disabled={isAnalyzing}
                  />
                  
                  {/* Scan line animation when analyzing */}
                  {isAnalyzing && <ScanLine />}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEmailText('')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-300"
                      disabled={!emailText || isAnalyzing}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={!emailText.trim() || isAnalyzing}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Analyze Email
                      </>
                    )}
                  </Button>
                </div>

                {/* AI processing indicator */}
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-cyan-400" />
                        </div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-cyan-400"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                      <div>
                        <p className="text-cyan-300 font-medium">AI Analysis in Progress</p>
                        <p className="text-gray-500 text-sm">Extracting features and classifying content...</p>
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
              >
                <ResultCard result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SpamDetector;
