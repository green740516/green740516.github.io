export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'other';
  level: number; // 0 to 100
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'web' | 'mobile' | 'design' | 'ai';
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  iconType: 'work' | 'education' | 'award' | 'star';
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  avatarSeed: string; // Used to generate or display random funny avatar icons
}

export interface ProfileDetails {
  name: string;
  englishName: string;
  title: string;
  bio: string;
  longBio: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  location: string;
  avatarUrl: string;
}
