import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ExternalLink, Github, ZoomIn, X, Compass, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { value: 'all', label: 'ALL / 전체' },
    { value: 'ai', label: 'AI / Intelligent' },
    { value: 'web', label: 'Web Platform' },
    { value: 'mobile', label: 'Mobile & IoT' },
    { value: 'design', label: 'UX & Audio Art' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-t border-slate-900 bg-slate-950/20 relative" style={{ contentVisibility: 'auto' }}>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-2 font-semibold">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Project Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-display font-extrabold text-white">
              My Selected Lab Works
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl font-light">
              디지털 공간에 기여하기 위해 구현하고 릴리즈했던 핵심 프로젝트들을 소개합니다. 카드가 작동하며 완벽히 모킹된 시연 모달을 보실 수 있습니다.
            </p>
          </div>

          {/* Categories Horizontal Scrolling Container */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all focus:outline-none cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10 border border-indigo-500'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
                id={`btn-projects-filter-${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#0e1322] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-950/10 transition-all display-flex flex-col"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  {/* Glass visual hover shade */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="w-11 h-11 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all text-xs cursor-pointer"
                      title="프로젝트 디테일 보기"
                      id={`btn-view-project-${project.id}`}
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                  {project.featured && (
                    <span className="absolute top-3 left-3 bg-indigo-500/90 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-indigo-400/50 shadow-md">
                      FEATURED ⭐
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Links and expand action */}
                  <div className="mt-5 pt-4 border-t border-slate-900 flex items-center justify-between">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold focus:outline-none"
                    >
                      <span>자세히 보기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
                          title="Live Demo"
                        >
                          <span>Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative bg-[#0d1222] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-indigo-950/40 z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                  id="btn-close-project-modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d1222] to-transparent" />
                </div>

                {/* Info Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded text-indigo-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                    {activeProject.title}
                  </h3>

                  <div className="space-y-3">
                    <p className="text-sm font-light text-slate-200 leading-relaxed">
                      {activeProject.description}
                    </p>
                    {activeProject.longDescription ? (
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed border-l-2 border-indigo-500/40 pl-3 italic bg-slate-900/20 py-2 rounded-r-md">
                        {activeProject.longDescription}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-indigo-500/40 pl-3 italic bg-slate-900/20 py-2 rounded-r-md">
                        디테일 기능 구현 연구: 시스템 설계 상에서 지연 시간을 회피하기 위한 가벼운 상태 트리 구조 및 쿼리 파이프라인 리프팅을 최적화하여 구현하였습니다.
                      </p>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
                    <div className="text-xs font-mono text-slate-500">
                      Category: <span className="text-indigo-400 uppercase font-semibold">{activeProject.category}</span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial text-center flex items-center justify-center gap-2 px-4 py-2 border border-slate-850 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-xl font-medium transition-all"
                        >
                          <Github className="w-4 h-4" />
                          <span>소스 코드</span>
                        </a>
                      )}
                      
                      <a
                        href={activeProject.demoUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial text-center flex items-center justify-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-xl font-medium transition-all shadow-md shadow-indigo-600/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>라이브 데모 실행</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
