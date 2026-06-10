import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award, Star, History } from 'lucide-react';
import { TimelineItem } from '../types';

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  
  const getIcon = (type: 'work' | 'education' | 'award' | 'star') => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-4 h-4 text-indigo-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'award':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'star':
      default:
        return <Star className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="experience" className="py-20 border-t border-slate-900 bg-slate-950/20 relative" style={{ contentVisibility: 'auto' }}>
      <div className="absolute bottom-1/4 right-1/10 w-82 h-82 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-2 font-semibold">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Milestones & History</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-display font-extrabold text-white">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl mx-auto font-light">
            지금까지 걸어온 학업 여정과 제품 릴리즈, 수상 실적 데이터 모델입니다.
          </p>
        </div>

        {/* Timeline main tree */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-6 space-y-12 pb-4">
          {timeline.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item.id}
              className="relative pl-8 sm:pl-10"
            >
              {/* Timeline Indicator Hub */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg shadow-black/80 z-10 hover:scale-110 hover:border-indigo-500 transition-colors">
                {getIcon(item.iconType)}
              </div>

              {/* Item Card Body */}
              <div className="group bg-[#0d1222] border border-slate-850 hover:border-indigo-500/25 p-5 sm:p-6 rounded-2xl shadow-xl transition-all relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 font-mono mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <span className="inline-block self-start sm:self-center px-3 py-1 bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-indigo-400 rounded-full font-semibold">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Micro accent corner border */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t border-r border-transparent group-hover:border-indigo-500/10 rounded-tr-2xl transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
