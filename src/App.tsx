import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Command, ArrowUp, Stars, ChevronRight } from 'lucide-react';

import { ProfileDetails, Project, Skill, TimelineItem, GuestbookMessage } from './types';
import { INITIAL_PROFILE, INITIAL_SKILLS, INITIAL_PROJECTS, INITIAL_TIMELINE, INITIAL_GUESTBOOK } from './data';

import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import TimelineSection from './components/TimelineSection';
import GuestbookSection from './components/GuestbookSection';
import PersonalizationModal from './components/PersonalizationModal';

export default function App() {
  const [profile, setProfile] = useState<ProfileDetails>(INITIAL_PROFILE);
  const [guestbook, setGuestbook] = useState<GuestbookMessage[]>([]);
  const [isPersonalizerOpen, setIsPersonalizerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load initial settings
  useEffect(() => {
    const savedProfile = localStorage.getItem('green_homepage_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse profile', e);
      }
    }

    const savedGuestbook = localStorage.getItem('green_homepage_guestbook');
    if (savedGuestbook) {
      try {
        setGuestbook(JSON.parse(savedGuestbook));
      } catch (e) {
        setGuestbook(INITIAL_GUESTBOOK);
      }
    } else {
      setGuestbook(INITIAL_GUESTBOOK);
    }
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveProfile = (updated: Partial<ProfileDetails>) => {
    const newProfile = { ...profile, ...updated } as ProfileDetails;
    setProfile(newProfile);
    localStorage.setItem('green_homepage_profile', JSON.stringify(newProfile));
  };

  const handleResetProfile = () => {
    setProfile(INITIAL_PROFILE);
    localStorage.removeItem('green_homepage_profile');
  };

  const handleAddGuestMessage = (name: string, message: string, avatarSeed: string) => {
    const newMessage: GuestbookMessage = {
      id: `g_${Date.now()}`,
      name,
      message,
      createdAt: new Date().toISOString(),
      avatarSeed
    };
    const updated = [newMessage, ...guestbook];
    setGuestbook(updated);
    localStorage.setItem('green_homepage_guestbook', JSON.stringify(updated));
  };

  const handleDeleteGuestMessage = (id: string) => {
    const updated = guestbook.filter(m => m.id !== id);
    setGuestbook(updated);
    localStorage.setItem('green_homepage_guestbook', JSON.stringify(updated));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Absolute Decorative Glow Mesh */}
      <div className="absolute top-0 inset-x-0 h-112 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Header and status indicators */}
      <Header
        profile={profile}
        onOpenPersonalizer={() => setIsPersonalizerOpen(true)}
      />

      {/* Main Container Content */}
      <main className="pb-16 pt-16">
        
        {/* About Section */}
        <AboutSection profile={profile} />

        {/* Projects Showcase section */}
        <ProjectsSection projects={INITIAL_PROJECTS} />

        {/* Skill sets */}
        <SkillsSection skills={INITIAL_SKILLS} />

        {/* Timeline achievements */}
        <TimelineSection timeline={INITIAL_TIMELINE} />

        {/* Live Local synced guestbook */}
        <GuestbookSection
          messages={guestbook}
          onAddMessage={handleAddGuestMessage}
          onDeleteMessage={handleDeleteGuestMessage}
        />

      </main>

      {/* Footer credits and details */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-10 text-center relative overflow-hidden text-slate-500 text-xs font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <Command className="w-3.5 h-3.5 text-slate-600" />
            <span>&copy; {new Date().getFullYear()} {profile.englishName}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>in Korea</span>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setIsPersonalizerOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              커스텀 편집기
            </button>
          </div>
        </div>
      </footer>

      {/* Personalizer Drawer Panel */}
      <PersonalizationModal
        isOpen={isPersonalizerOpen}
        onClose={() => setIsPersonalizerOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />

      {/* Back to top bullet button */}
      <motion.button
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/20 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer ${
          showScrollTop ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        title="맨 위로 가기"
        id="btn-scroll-top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>

    </div>
  );
}
