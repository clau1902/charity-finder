export type Category =
  | 'environment'
  | 'education'
  | 'health'
  | 'animals'
  | 'humanitarian'
  | 'arts'
  | 'community';

export interface Charity {
  id: string;
  name: string;
  description: string;
  category: Category;
  rating: number; // 1-5 stars
  website: string;
  location: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'environment', label: 'Environment', icon: '🌍' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'animals', label: 'Animals', icon: '🐾' },
  { id: 'humanitarian', label: 'Humanitarian', icon: '🤝' },
  { id: 'arts', label: 'Arts & Culture', icon: '🎨' },
  { id: 'community', label: 'Community', icon: '🏘️' },
];
