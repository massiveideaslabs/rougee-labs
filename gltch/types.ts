export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export enum SectionId {
  HERO = 'hero',
  SOLUTIONS = 'solutions',
  FEATURES = 'features',
  HOW_IT_WORKS = 'how-it-works',
  CONTACT = 'contact',
}
