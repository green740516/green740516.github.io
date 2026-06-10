import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Trash2, Smile, Clock, Notebook } from 'lucide-react';
import { GuestbookMessage } from '../types';

interface GuestbookSectionProps {
  messages: GuestbookMessage[];
  onAddMessage: (name: string, message: string, avatarSeed: string) => void;
  onDeleteMessage: (id: string) => void;
}

export default function GuestbookSection({ messages, onAddMessage, onDeleteMessage }: GuestbookSectionProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [avatarSeed, setAvatarSeed] = useState('smile');

  const avatarStyles = [
    { seed: 'smile', label: '차분가', emoji: '🧑‍💻' },
    { seed: 'rocket', label: '모험가', emoji: '🚀' },
    { seed: 'magic', label: '마법사', emoji: '🧙' },
    { seed: 'palette', label: '예술가', emoji: '🎨' },
    { seed: 'alien', label: '외계인', emoji: '👽' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddMessage(name.trim(), message.trim(), avatarSeed);
    setName('');
    setMessage('');
  };

  const getEmojiBySeed = (seed: string) => {
    const found = avatarStyles.find(a => a.seed === seed);
    return found ? found.emoji : '💬';
  };

  const formatMessageTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('ko-KR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return '최근';
    }
  };

  return (
    <section id="guestbook" className="py-20 border-t border-slate-900 bg-slate-950/40 relative" style={{ contentVisibility: 'auto' }}>
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-2 font-semibold">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Interactive Guestbook</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-display font-extrabold text-white">
            Guestbook & Feedback
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl mx-auto font-light">
            방문하신 흔적이나 격려의 메세지를 자유롭게 남겨주세요. 남기신 글은 브라우저 공간(`localStorage`)에 즉각 저장 및 동기화됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Write Section Form Card */}
          <div className="md:col-span-5 bg-[#0d1222] border border-slate-850 p-6 rounded-2xl shadow-xl">
            <h3 className="text-base font-display font-semibold text-white mb-4 flex items-center gap-2">
              <Notebook className="w-4 h-4 text-indigo-400" />
              메시지 남기기
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-medium">
                  작성자 이름 / 닉네임
                </label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김코딩, 홍길동"
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-sans"
                />
              </div>

              {/* Message text */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-medium">
                  메시지 내용
                </label>
                <textarea
                  required
                  maxLength={250}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="포트폴리오에 어울리는 응원글이나 메시지를 보내주세요!"
                  rows={4}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-sans resize-none"
                />
                <div className="text-[10px] text-right text-slate-500 font-mono mt-1">
                  {message.length} / 250 자
                </div>
              </div>

              {/* Avatar Seed picker */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-medium">
                  동반 아바타 타입 선택
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {avatarStyles.map((av) => (
                    <button
                      type="button"
                      key={av.seed}
                      onClick={() => setAvatarSeed(av.seed)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs focus:outline-none transition-all cursor-pointer ${
                        avatarSeed === av.seed
                          ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-900 border-slate-80/60 text-slate-400 hover:text-slate-200'
                      }`}
                      title={av.label}
                    >
                      <span className="text-lg mb-0.5 leading-none">{av.emoji}</span>
                      <span className="text-[9px] font-mono text-slate-500 scale-90">{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Btn */}
              <button
                type="submit"
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10"
                id="btn-guestbook-submit"
              >
                <Send className="w-3.5 h-3.5" />
                <span>방명록 메시지 전송</span>
              </button>
            </form>
          </div>

          {/* List Messages Panel */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-mono text-slate-400 flex items-center gap-2 font-semibold">
                <span>RECENT TESTIMONIALS</span>
                <span className="bg-slate-900 border border-slate-800 text-[10px] px-2 py-0.5 rounded text-indigo-400 font-mono">
                  {messages.length}개
                </span>
              </h3>
            </div>

            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 bg-slate-900/20 border border-slate-900 rounded-2xl"
                  >
                    <Smile className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-bounce" />
                    <p className="text-xs text-slate-400">아직 등록된 메시지가 없습니다. 첫 번째 발자취를 남겨보세요!</p>
                  </motion.div>
                ) : (
                  messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-[#0d1222]/80 border border-slate-850 p-4 rounded-xl flex items-start gap-3.5 hover:border-slate-800 transition-all shadow-md"
                    >
                      {/* Avatar sphere */}
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-xl select-none min-w-10">
                        {getEmojiBySeed(msg.avatarSeed)}
                      </div>

                      {/* Content block */}
                      <div className="flex-grow space-y-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                            {msg.name}
                          </span>
                          
                          {/* Trash button */}
                          <button
                            onClick={() => onDeleteMessage(msg.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 rounded-lg bg-transparent hover:bg-rose-500/10 transition-all focus:outline-none cursor-pointer"
                            title="메시지 삭제"
                            id={`btn-delete-msg-${msg.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-slate-200 text-xs sm:text-sm font-light break-all leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>

                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono pt-1">
                          <Clock className="w-3 h-3 text-slate-600" />
                          <span>{formatMessageTime(msg.createdAt)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
