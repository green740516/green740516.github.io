import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Copy, Check, Github, Linkedin, ExternalLink, ArrowRight, Calendar } from 'lucide-react';
import { ProfileDetails } from '../types';

interface AboutSectionProps {
  profile: ProfileDetails;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const [copied, setCopied] = useState(false);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="about" className="pt-24 pb-16 sm:py-24 relative overflow-hidden">
      {/* Absolute Decorative Ambient Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Left Column: Huge Header / Avatar Details */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div variants={itemVariants} className="relative mb-6 group">
              {/* Outer decorative neon spinning border */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-800">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-indigo-600 text-white text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-indigo-400 shadow-md">
                Active ✨
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                웹 생태계 탐험가
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  {profile.name}
                </span>
                <span className="block text-indigo-400 text-xl sm:text-2xl font-semibold tracking-wide mt-1.5">
                  @{profile.englishName}
                </span>
              </h1>
              <p className="text-sm font-mono text-slate-500 mt-1">{profile.title}</p>
            </motion.div>

            {/* Geographical Coordinates */}
            <motion.div variants={itemVariants} className="mt-5 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900/50 border border-slate-800/80 px-3 py-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/50 border border-slate-800/80 px-3 py-1.5 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>10:02 GMT+9</span>
              </div>
            </motion.div>

            {/* Quick social grids */}
            <motion.div variants={itemVariants} className="mt-6 flex items-center gap-3">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800/50 transition-all shadow-md focus:outline-none"
                  title="Github 연결"
                  id="link-about-github"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-slate-600 hover:bg-slate-800/50 transition-all shadow-md focus:outline-none"
                  title="LinkedIn 연결"
                  id="link-about-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {/* Copy Email Button */}
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/30 text-xs font-medium text-slate-300 hover:text-indigo-300 px-3.5 h-10 rounded-xl transition-all shadow-md focus:outline-none"
                id="btn-about-copy-email"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">{profile.email}</span>
                <div className="ml-1 pl-1 border-l border-slate-800">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-scale" /> : <Copy className="w-3.5 h-3.5" />}
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Detailed Biography block */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative"
            >
              {/* Card visual elements */}
              <div className="absolute top-4 right-4 flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700/60" />
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-4 text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                Introducing green
              </h2>
              <p className="text-lg text-slate-200 leading-relaxed font-light mb-4 text-justify sm:text-left">
                &ldquo;{profile.bio}&rdquo;
              </p>

              {/* Collapsible deeper bio with framer motion height toggle */}
              <div className="relative overflow-hidden">
                <AnimatePresence initial={false}>
                  {isBioExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-slate-400 font-light text-sm sm:text-base leading-relaxed space-y-3 pb-4"
                    >
                      <p>{profile.longBio}</p>
                      <p className="font-mono text-xs text-indigo-400/80">
                        * 저는 기술의 실용적 활용성을 깊이 고민합니다. 새로운 제품을 프로토타이핑하는 것을 매우 보람있게 생각하며, 사용자 경험의 매끄러움을 증명하기 위해 테스트와 리팩터링을 정교하게 수행합니다.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View More Button */}
              <button
                onClick={() => setIsBioExpanded(!isBioExpanded)}
                className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors mt-2 focus:outline-none focus:underline group"
                id="btn-toggle-bio-expansion"
              >
                <span>{isBioExpanded ? '간략히 보기' : '스토리 더 보기'}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isBioExpanded ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>
            </motion.div>

            {/* Micro Highlights Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-slate-900/20 border border-slate-900 p-4 rounded-xl flex items-center gap-3">
                <div className="min-w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-mono font-bold text-lg">
                  6+
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">My Projects</div>
                  <div className="text-xs text-slate-500">배포 및 공개 레포</div>
                </div>
              </div>
              <div className="bg-slate-900/20 border border-slate-900 p-4 rounded-xl flex items-center gap-3">
                <div className="min-w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono font-bold text-lg">
                  100%
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">Passion Rate</div>
                  <div className="text-xs text-slate-500">지속적인 학습과 열정</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
