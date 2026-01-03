import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-[#0a0a0f]" />
      
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SpamShield AI</span>
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-rose-500" />
              <span>AI & ML</span>
            </p>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 text-sm"
          >
            {['Features', 'How It Works', 'API Docs', 'Pricing', 'Contact'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Github} label="GitHub" />
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="mailto:contact@spamshield.ai" icon={Mail} label="Email" />
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500"
        >
          <p>© {currentYear} SpamShield AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
