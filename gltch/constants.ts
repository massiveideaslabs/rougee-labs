import { Service, Feature, Step } from './types';

export const SERVICES: Service[] = [
  {
    id: 'smart-home',
    title: 'SMART HOMES',
    tagline: 'Your Home, Reimagined',
    description: 'Transform your living space with AI that learns your habits, optimizes energy usage, and creates the perfect ambiance—all through natural conversation.',
    features: ['Voice-controlled everything', 'Energy optimization', 'Security monitoring', 'Climate automation', 'Lighting scenes'],
    icon: 'Home',
    gradient: 'from-neon-cyan to-blue-500',
  },
  {
    id: 'restaurant',
    title: 'RESTAURANTS',
    tagline: 'Elevate Every Dining Experience',
    description: 'Streamline operations from kitchen to table. GLTCH manages reservations, optimizes seating, tracks inventory, and enhances guest experiences.',
    features: ['Smart reservations', 'Kitchen display systems', 'Inventory tracking', 'Staff scheduling', 'Customer insights'],
    icon: 'UtensilsCrossed',
    gradient: 'from-neon-orange to-red-500',
  },
  {
    id: 'small-business',
    title: 'SMALL BUSINESS',
    tagline: 'Enterprise AI, Startup Budget',
    description: 'Get the power of enterprise automation without the enterprise price tag. GLTCH scales with your business and handles the complexity.',
    features: ['Customer service AI', 'Appointment booking', 'Analytics dashboard', 'Workflow automation', 'Multi-channel support'],
    icon: 'Store',
    gradient: 'from-neon-green to-emerald-500',
  },
  {
    id: 'hotels',
    title: 'HOTELS',
    tagline: 'Hospitality Without Limits',
    description: 'Deliver five-star service at every touchpoint. From check-in to checkout, GLTCH creates memorable stays through intelligent automation.',
    features: ['Smart room controls', 'Concierge AI', 'Housekeeping optimization', 'Guest preferences', 'Revenue management'],
    icon: 'Hotel',
    gradient: 'from-neon-purple to-violet-500',
  },
  {
    id: 'apartments',
    title: 'APARTMENTS',
    tagline: 'Modern Living, Managed Smarter',
    description: 'Property management meets artificial intelligence. Handle maintenance, tenant communication, and building systems from one unified platform.',
    features: ['Maintenance requests', 'Access control', 'Utility monitoring', 'Tenant portal', 'Building analytics'],
    icon: 'Building2',
    gradient: 'from-pink-500 to-neon-purple',
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'custom-trained',
    title: 'Custom Trained AI',
    description: 'GLTCH is trained specifically for your industry, understanding the nuances of hospitality, retail, and property management.',
    icon: 'Brain',
  },
  {
    id: 'natural-language',
    title: 'Natural Language',
    description: 'Interact naturally through voice or text. GLTCH understands context, remembers preferences, and responds intelligently.',
    icon: 'MessageSquare',
  },
  {
    id: 'privacy-first',
    title: 'Privacy First',
    description: 'Your data stays yours. On-premise processing options and enterprise-grade encryption protect sensitive information.',
    icon: 'Shield',
  },
  {
    id: 'seamless-integration',
    title: 'Seamless Integration',
    description: 'Connect with existing systems, smart devices, and third-party services through our extensive API and integration library.',
    icon: 'Puzzle',
  },
  {
    id: '24-7-operation',
    title: '24/7 Operation',
    description: 'GLTCH never sleeps. Continuous monitoring, instant response, and proactive issue resolution around the clock.',
    icon: 'Clock',
  },
  {
    id: 'learning-system',
    title: 'Continuous Learning',
    description: 'The more you use GLTCH, the smarter it gets. Machine learning adapts to your specific needs and patterns.',
    icon: 'TrendingUp',
  },
];

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'CONNECT',
    description: 'Link your existing devices, systems, and data sources to the GLTCH platform through our simple setup wizard.',
  },
  {
    number: '02',
    title: 'CONFIGURE',
    description: 'Customize automation rules, set preferences, and define how GLTCH should handle different scenarios for your space.',
  },
  {
    number: '03',
    title: 'COMMUNICATE',
    description: 'Start interacting through voice, text, or the dashboard. GLTCH learns from every interaction to improve.',
  },
  {
    number: '04',
    title: 'CONTROL',
    description: 'Monitor performance, review insights, and let GLTCH handle the day-to-day while you focus on what matters.',
  },
];

export const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = {
  twitter: 'https://x.com/rougecoin?s=21',
  discord: 'https://discord.gg/487vQfMN',
};
