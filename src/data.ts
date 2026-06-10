import { ProfileDetails, Project, Skill, TimelineItem, GuestbookMessage } from './types';

export const INITIAL_PROFILE: ProfileDetails = {
  name: "최그린",
  englishName: "Green Choi",
  title: "CEO of Greeny System | ITAD & Green Tech Innovator",
  bio: "그리니시스템(Greeny System)을 이끌며, ITAD 자산 순환 솔루션 설계와 탄소 크레딧 발행, 그리고 고농도 유가 금속 추출 공정 기술로 지속 가능한 미래를 엽니다.",
  longBio: "환경 가치 순환 전문 기업 그리니시스템의 최고경영자(CEO)입니다. 기업들의 불용 IT 자산을 안전하게 파쇄 및 처리하고 잔존 자산 가치를 완벽하게 정산하는 기법인 ITAD(IT Asset Disposition) 환경 파이프라인의 안전 설계, 도시광산의 핵심 핵심 가치인 유가 금속(금, 은, 팔라듐 등)의 무독성 습식 환원 정밀 추출 공정, 그리고 이 모든 친환경 탄소 저감 효과를 산출하여 발행하는 공인 탄소크레딧 유통 모델을 완성하는 데 기여하고 있습니다.",
  email: "cbngreen@gmail.com",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  location: "Seoul, South Korea",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=350&h=350"
};

export const INITIAL_SKILLS: Skill[] = [
  // Core Business Stack (Frontend Categories / Functional Categories)
  { id: 'sk1', name: 'ITAD Ecosystem Architecture', category: 'frontend', level: 96, color: 'from-emerald-500 to-teal-500' },
  { id: 'sk2', name: 'Carbon Credit Issuance Verification', category: 'frontend', level: 94, color: 'from-green-500 to-emerald-600' },
  { id: 'sk3', name: 'Valuable Metal Extraction Chemistry', category: 'frontend', level: 91, color: 'from-amber-400 to-amber-600' },
  { id: 'sk4', name: 'Environmental Compliance Auditing', category: 'frontend', level: 95, color: 'from-teal-400 to-indigo-500' },
  
  // Backend/Operations System
  { id: 'sk5', name: 'Supply Chain Operations & Logistics', category: 'backend', level: 90, color: 'from-blue-500 to-indigo-600' },
  { id: 'sk6', name: 'Carbon Pricing & Trading Models', category: 'backend', level: 88, color: 'from-cyan-500 to-blue-500' },
  { id: 'sk7', name: 'Precious Metals Recovery Systems', category: 'backend', level: 92, color: 'from-yellow-500 to-amber-500' },
  
  // Strategy & Design
  { id: 'sk8', name: 'Corporation Green ESG Consulting', category: 'design', level: 93, color: 'from-purple-500 to-indigo-600' },
  { id: 'sk9', name: 'R&D Management & Patents', category: 'design', level: 89, color: 'from-pink-500 to-rose-500' },
  { id: 'sk10', name: 'Circular Economy Strategy', category: 'other', level: 97, color: 'from-slate-600 to-slate-800' }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Integrated ITAD & Asset Cycle Platform',
    description: '기업의 불용 전자기기 수거 및 완전 안전 파쇄, 자산 평가 정보를 실시간 ESG 및 정산 대시보드로 조율해 주는 기업용 원스톱 ITAD 관리 서비스입니다.',
    longDescription: '하드디스크 파쇄 물리적 추적, 하이테크 원스톱 소거 등 안전과 환경 규제 기준을 동시에 만족시키는 자산 처리 순환 아키텍처입니다. 데이터 보안 무결성을 검증하며 친환경 성적 계수 수치(LCO2)를 보증합니다.',
    tags: ['ITAD', 'Enterprise ESG', 'Security Certification', 'Real-time Analytics'],
    category: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'p2',
    title: 'Real-time Verification Carbon Credit Ledger',
    description: 'IT 자원의 친환경 수거 및 고품질 원료 재생 공정에 투입되는 전력과 이산화탄소 저감량을 분석해 공인 탄소크레딧 발행 청원서로 연동하는 친환경 원장 시스템입니다.',
    longDescription: '각 기업 고객이 그리니시스템의 서비스를 통해 기여한 이산화탄소 절감 효과를 공정 가치 가중 단위로 계산하고, 글로벌 크레딧 발행 표준 요건에 맞춰 공인 리포트로 수출시켜 주는 엔터프라이즈 모듈입니다.',
    tags: ['Carbon Credits', 'Clean Development', 'Analytics Engine', 'Global Standards'],
    category: 'ai',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'p3',
    title: 'High-Purity Precious Metal Refining Optimizer',
    description: '도시광산 기판 및 하드웨어 구성 부품에서 유가 금속(금, 은, 팔라듐, 구리 등)을 정밀 농도로 화학 환원 및 추출하는 최첨단 공정 지표 모니터입니다.',
    longDescription: '폐기 전자기기에서 추출하는 유가 원소별 회수율 극대화 모니터링 프로그램입니다. 산성/염기 반응 수치 연동과 추출 탱크의 환경 위험 상황 감지를 안전 데이터 구조로 통제하는 크리티컬 UI입니다.',
    tags: ['Valuable Metals', 'Refining Tech', 'IoT Sensor Logging', 'Chemical Recovery'],
    category: 'design',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=400',
    demoUrl: '#',
    featured: false
  },
  {
    id: 'p4',
    title: 'Circular Resource Distribution Network',
    description: '다국적 금속 가공 공장 및 자산 처분 파트너사들과의 폐루프 원재료 교역망을 매칭 및 추적하는 리사이클 공급망 중개 포털입니다.',
    longDescription: '공급자와 수요 기업 간 잔존 경제 기여 기법을 적용하여 탄생했습니다. 지리적 운송 거리별 탄소 배출 모델을 차트화하고 유가 원자재 유통 경쟁력을 극대화하는 글로벌 네트워킹 플랫폼입니다.',
    tags: ['Supply Chain', 'Global Trade', 'D3 Soundscapes', 'CO2 Allocation'],
    category: 'mobile',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=400',
    githubUrl: 'https://github.com',
    featured: false
  }
];

export const INITIAL_TIMELINE: TimelineItem[] = [
  {
    id: 't1',
    period: '2024 - PRESENT',
    title: 'CEO / Founder',
    company: 'Greeny System (그리니시스템)',
    description: 'ITAD 전문 비즈니스 론칭, 연간 수만 대 규모의 친환경 전자기기 자산 가치 평가 체계 실현, 고농도 유가 금속 정제 공정 특허 기술 확보 및 고효율 탄소크레딧 연계 사업을 총괄 조정하고 있습니다.',
    iconType: 'work'
  },
  {
    id: 't2',
    period: '2021 - 2024',
    title: 'Chief Operations Architect',
    company: 'Ecocycle Solutions (친환경 자원 처리)',
    description: '도시광산 기판 분리 습식 환원 프로세스를 디자인하여 폐기 기판 속 핵심 자원 원소 환원 효율을 25% 가량 향상시켰습니다.',
    iconType: 'work'
  },
  {
    id: 't3',
    period: '2020',
    title: 'Best Eco-Innovation Award - Grand Prize',
    company: 'Global Green Energy League',
    description: '전기 무결성 가치 계산에 따른 탄소 배출 절감 도량법 산정 아이디어로 친환경 우수 실록 대상을 수상했습니다.',
    iconType: 'award'
  },
  {
    id: 't4',
    period: '2015 - 2020',
    title: 'B.S. in Green Chemical Engineering',
    company: 'Core Science Institute',
    description: '고순도 화학 공학 프로세스 설계와 순환형 원재료 유통 관리 학위를 수여받았습니다.',
    iconType: 'education'
  }
];

export const INITIAL_GUESTBOOK: GuestbookMessage[] = [
  {
    id: 'g1',
    name: '김우주',
    message: '대표집무실 분위기만큼이나 홈페이지가 굉장히 신뢰감 있고 완벽하네요! 그리니시스템 파이팅입니다! 👍',
    createdAt: '2026-06-08T14:22:00Z',
    avatarSeed: 'cosmic'
  },
  {
    id: 'g2',
    name: '최첨단 파트너',
    message: 'ITAD 대시보드를 보니 믿고 대규모 전자기기 처분을 맡길 수 있겠습니다. 유가금속 추출 효율이 대단하시네요. 조만간 미팅 희망합니다.',
    createdAt: '2026-06-10T09:12:00Z',
    avatarSeed: 'designer'
  }
];
