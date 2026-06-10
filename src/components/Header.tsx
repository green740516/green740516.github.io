import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Edit, Heart } from 'lucide-react';
import { ProfileDetails } from '../types';

interface HeaderProps {
  profile: ProfileDetails;
  onOpenPersonalizer: () => void;
}

export default function Header({ profile, onOpenPersonalizer }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to KST (Korean Standard Time) or dynamic locally
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('ko-KR', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ contentVisibility: 'auto' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0f19]/80 backdrop-blur-md border-b border-indigo-500/10 py-3 shadow-lg shadow-indigo-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 text-left focus:outline-none"
          id="btn-header-logo"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            {profile.englishName.substring(0, 1) || 'G'}
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:text-indigo-400 transition-colors">
              {profile.englishName}
            </span>
            <span className="hidden sm:block text-[10px] font-mono text-indigo-400/80 tracking-wide mt-[-2px]">
              {profile.title}
            </span>
          </div>
        </button>

        {/* Live Status and Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-400">
            {['About', 'Projects', 'Skills', 'Experience', 'Guestbook'].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec.toLowerCase())}
                className="hover:text-white transition-colors cursor-pointer relative py-1 focus:outline-none focus:text-indigo-400 group"
                id={`btn-nav-${sec.toLowerCase()}`}
              >
                {sec}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Time & Customizer Action */}
          <div className="flex items-center gap-3">
            {/* Live Clock Button */}
            <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-full px-3 py-1.5 text-xs font-mono select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400">KST</span>
              <span className="text-indigo-400 font-medium">{currentTime}</span>
            </div>

            {/* Customizer Panel Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenPersonalizer}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-3.5 py-1.5 text-xs font-medium shadow-lg shadow-indigo-500/20 active:translate-y-[1px] transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
              title="홈페이지 정보 실시간 편집기 열기"
              id="btn-edit-homepage"
            >
              <Edit className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">커스텀 편집</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
