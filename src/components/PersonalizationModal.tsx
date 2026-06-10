import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, Check, RotateCcw, Image, MapPin, Mail, User } from 'lucide-react';
import { ProfileDetails } from '../types';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileDetails;
  onSave: (updated: Partial<ProfileDetails>) => void;
  onReset: () => void;
}

const AVATAR_PRESETS = [
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350&h=350', label: '자연스러운 포트레이트' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=350&h=350', label: '미소 짓는 테크크래커' },
  { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=350&h=350', label: '차분한 블루 수트' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350&h=350', label: '스튜디오 인물 사진' },
  { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=350&h=350', label: '모노톤 모그라이더' }
];

export default function PersonalizationModal({ isOpen, onClose, profile, onSave, onReset }: PersonalizationModalProps) {
  const [name, setName] = useState(profile.name);
  const [englishName, setEnglishName] = useState(profile.englishName);
  const [title, setTitle] = useState(profile.title);
  const [bio, setBio] = useState(profile.bio);
  const [longBio, setLongBio] = useState(profile.longBio);
  const [email, setEmail] = useState(profile.email);
  const [location, setLocation] = useState(profile.location);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    
    const chosenAvatar = customAvatarUrl.trim() ? customAvatarUrl.trim() : avatarUrl;

    onSave({
      name: name.trim(),
      englishName: englishName.trim(),
      title: title.trim(),
      bio: bio.trim(),
      longBio: longBio.trim(),
      email: email.trim(),
      location: location.trim(),
      avatarUrl: chosenAvatar
    });

    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      onClose();
    }, 1500);
  };

  const handleResetToDefault = () => {
    if (confirm('홈페이지 설정값을 기본 프리셋으로 초기화할까요?')) {
      onReset();
      // Reset local states to force refresh in form
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040815]"
          />

          {/* Sidebar Panel Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#0b0f19] border-l border-slate-800/80 h-full flex flex-col justify-between shadow-2xl z-20"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-900 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <h3 className="font-display font-bold text-slate-100 text-sm sm:text-base">개인 정보 실시간 편집</h3>
              </div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                id="btn-close-personalizer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleApply} className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-5">
              
              <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono font-semibold uppercase text-indigo-400">Personalization Engine</span>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  이 폼에서 마음에 들도록 핵심 문구를 바꾸면, 헤더/소개글/아바타 등 전체 홈페이지 요소들이 실시간으로 변신합니다!
                </p>
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5 flex items-center gap-1">
                    <User className="w-3 h-3 text-indigo-400" />
                    <span>한글 성명</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5">
                    영문 명칭
                  </label>
                  <input
                    type="text"
                    required
                    value={englishName}
                    onChange={(e) => setEnglishName(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5">
                  직무 타이틀 (서브텍스트)
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Bio & LongBio */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5">
                  한 줄 소개글 (Hero Bio)
                </label>
                <textarea
                  required
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5">
                  상세 내역 기술 (Description Expanded)
                </label>
                <textarea
                  required
                  rows={4}
                  value={longBio}
                  onChange={(e) => setLongBio(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none scrollbar-thin"
                />
              </div>

              {/* Coordinates: Mail & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-emerald-400" />
                    <span>이메일 주소</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-400" />
                    <span>거주 도시</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Avatar Preset Images Selection */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-2 flex items-center gap-1">
                  <Image className="w-3.5 h-3.5 text-indigo-400" />
                  <span>아바타 인물 프리셋 선택</span>
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                  {AVATAR_PRESETS.map((p, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => {
                        setAvatarUrl(p.url);
                        setCustomAvatarUrl('');
                      }}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 min-w-12 transition-all cursor-pointer ${
                        avatarUrl === p.url && !customAvatarUrl
                          ? 'border-indigo-500 scale-102 ring-2 ring-indigo-500/20'
                          : 'border-slate-850 hover:border-slate-700'
                      }`}
                      title={p.label}
                    >
                      <img src={p.url} alt={p.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Or manual URL */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5">
                  직접 커스텀 이미지 URL 입력 (선택)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

            </form>

            {/* Footer buttons banner */}
            <div className="p-5 border-t border-slate-900 bg-slate-950/60 space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:text-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 transition-all focus:outline-none cursor-pointer"
                  title="원래 기본값으로 되돌리기"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>초기화</span>
                </button>

                <button
                  onClick={handleApply}
                  type="button"
                  className="flex-grow flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2.5 text-xs font-semibold shadow-lg shadow-indigo-600/10 transition-all focus:outline-none cursor-pointer"
                  id="btn-apply-personalizer"
                >
                  {showSavedFeedback ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>저장되었습니다! 🌟</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>페이지에 즉시 적용</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
