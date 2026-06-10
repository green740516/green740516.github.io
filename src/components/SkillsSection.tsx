import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Code, Cpu, Layout, Layers, Lightbulb } from 'lucide-react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[1] || null);

  const categories = {
    frontend: { label: 'Frontend UI', icon: Layout, desc: '인터랙션 및 사용자 인터페이스 기술 스택' },
    backend: { label: 'Backend Server', icon: Cpu, desc: '서버 아키텍처 및 안전 데이터 핸들러' },
    design: { label: 'UX & Other Tools', icon: Layers, desc: '디자인 시스템 툴킷 및 생산성 협업 도구' }
  };

  // Helper to categorize
  const getSkillsByCategory = (cat: 'frontend' | 'backend' | 'design') => {
    return skills.filter(s => s.category === cat);
  };

  const getReviewForSkill = (name: string) => {
    const reviews: Record<string, string> = {
      'React (Next.js)': '컴포넌트 단위 설계 및 SSR/CSR 렌더링 라이프사이클 최적화 경험. 훅 패턴을 활용한 상태 관리 설계에 강점이 있습니다.',
      'TypeScript': '안전한 정적 타입을 도입해 런타임 버그를 90% 방지하고 코드 자동 정의 완성으로 생산성을 보강합니다.',
      'Tailwind CSS': '유틸리티 우선 클래스 기반으로 번들 용량을 극단적으로 최적화하며, 커스텀 테마 변수를 심층 제어 가능합니다.',
      'Motion (Framers)': 'Spring 물리 엔진과 제스처 트래킹 애니메이션을 통합해, 오감을 기분 좋게 자극하는 부드러운 전이를 만듭니다.',
      'Node.js / Express': '비동기 이벤트 루프 모델로 고속 정적 파일 및 미들웨어 응답 핸들러를 구축하고 확장성 높은 구조로 배치합니다.',
      'RESTful API & GraphQL': '서블릿 규격 준수 및 클라이언트-서버 간의 통신 패킷 오버헤드를 막는 엄격한 API 엔드포인트 세팅.',
      'PostgreSQL & Cloud SQL': '안정성 높은 트랜잭션, 명료한 테이블 스키마 인덱싱 튜닝 및 효율적인 ORM 관계 마이그레이션 기술.',
      'UI/UX Design (Figma)': '베지어 커브 그리드 정렬 및 기호적 컴포넌트 프레이밍 설계를 통해 오차 없는 UI 산출물을 제공합니다.',
      'Web Performance Optimization': 'Lighthouse 지표를 기반으로 이미지 CDN 리사이징, 자바스크립트 크랙 청크, 메모리 릭 수정을 수행합니다.'
    };
    return reviews[name] || '자체 프로젝트 및 아키텍처 설계에 투입되어 유의미한 효율 개선 성능을 증명한 필수 역량입니다.';
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-900 bg-slate-950/40 relative" style={{ contentVisibility: 'auto' }}>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-mono uppercase tracking-widest mb-2 font-semibold">
            <Award className="w-4 h-4 text-teal-400" />
            <span>Professional Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-display font-extrabold text-white">
            Skillsets & Technology Stack
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl font-light">
            주요 개발 도구와 보유 숙련도 지표입니다. 각 스킬 카드를 클릭하시면 백그라운드에서의 적용 상세 노트가 우측에 표시됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Columns: Progressive bars */}
          <div className="lg:col-span-7 space-y-8">
            {(['frontend', 'backend', 'design'] as const).map((catKey) => {
              const CategoryIcon = categories[catKey].icon;
              const catSkills = getSkillsByCategory(catKey);

              if (catSkills.length === 0) return null;

              return (
                <div key={catKey} className="bg-[#0c101d] border border-slate-850 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-900">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight">{categories[catKey].label}</h3>
                      <p className="text-[11px] text-slate-500 font-mono">{categories[catKey].desc}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {catSkills.map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => setSelectedSkill(skill)}
                        className={`group p-2 rounded-xl transition-all cursor-pointer border ${
                          selectedSkill?.id === skill.id
                            ? 'bg-indigo-500/5 border-indigo-500/30 shadow-sm'
                            : 'bg-transparent border-transparent hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5 px-1">
                          <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{skill.name}</span>
                          <span className="font-mono text-indigo-400 font-semibold">{skill.level}%</span>
                        </div>
                        
                        {/* Outer track */}
                        <div className="h-2 w-full bg-slate-900/80 rounded-full overflow-hidden">
                          {/* Inner filled track */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r rounded-full ${skill.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Mini Selected Skill Detail Inspector Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#0c101d] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              {/* Abs grid lines decor */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

              {selectedSkill ? (
                <div className="relative space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-400/10 border border-teal-400/20">
                        {selectedSkill.category} skill
                      </span>
                      <h4 className="text-xl font-display font-bold text-white mt-2">
                        {selectedSkill.name}
                      </h4>
                    </div>

                    <div className="w-16 h-16 rounded-full border-2 border-slate-850 flex items-center justify-center bg-slate-900 text-indigo-400 font-mono font-bold text-lg relative">
                      {selectedSkill.level}
                      <span className="text-xs text-slate-500 ml-0.5">%</span>
                      <div className="absolute -inset-1 bg-indigo-500/5 rounded-full blur animate-pulse" />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-xl space-y-3 border border-slate-850">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 font-mono">
                      <Lightbulb className="w-4 h-4 text-indigo-400" />
                      <span>HOW I DEPLOY THIS TECHNICAL ABILITY</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {getReviewForSkill(selectedSkill.name)}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span>숙련 수준 등급</span>
                      <span className="text-slate-300 font-mono font-medium">
                        {selectedSkill.level >= 90 ? 'Expert (보안 및 고급 튜닝 가능)' : 'Advanced (안정 개발 및 협업 가능)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>실무 투입도</span>
                      <span className="text-slate-300 font-mono font-medium">활발히 사용 중 (Active Stack)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-2">
                  <Code className="w-8 h-8 text-slate-600 mx-auto animate-bounce" />
                  <p className="text-sm text-slate-400 font-medium">스킬을 선택하여 실무 세부 적용 노트를 확인해 보세요.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
