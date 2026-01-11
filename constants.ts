import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'BASEPASS',
    category: 'Decentralized Ticketing',
    description: 'A fully decentralized on-chain event ticketing site built on Base chain designed for crypto events and conferences',
    technologies: ['Base', 'React', 'Solidity'],
    imageUrl: '/images/project-1-basepass.png',
    year: '2025',
    liveUrl: 'https://www.basepass.events',
  },
  {
    id: '2',
    title: 'TIA.AI',
    category: 'Sentiment Analysis',
    description: 'A sentiment analysis tool built on Base chain.',
    technologies: ['Base', 'React', 'AI'],
    imageUrl: '/images/project-2-tia.png',
    year: '2025',
    liveUrl: 'https://tia-ai.netlify.app',
  },
  {
    id: '3',
    title: 'DEGEN SWAP',
    category: 'Decentralized Exchange',
    description: 'First-ever NFT marketplace and launcher on the Keeta blockchain',
    technologies: ['Keeta', 'React', 'IPFS'],
    imageUrl: '/images/project-3-degenswap.png',
    year: '2025',
    liveUrl: 'https://degenswap-seven.vercel.app/',
    codeUrl: 'https://github.com/cyberdreadx/pixel-degens-hub'
  },
  {
    id: '4',
    title: 'YODA WALLET',
    category: 'Web3 Wallet',
    description: 'Created a galactic themed responsive Keeta wallet that allows users to send, receive, and swap tokens on the Keeta chain.',
    technologies: ['Keeta', 'React'],
    imageUrl: '/images/project-4-yoda.png',
    year: '2025',
    liveUrl: 'https://lovable.dev/projects/66c22c17-5f99-4fe8-a3a0-b9a431184055?permissionView=main',
    codeUrl: 'https://github.com/cyberdreadx/babypaca?tab=readme-ov-file'
  },
  {
    id: '5',
    title: 'SONAR',
    category: 'Music Streaming',
    description: 'Fully decentralized music streaming platform with tokenized songs and play gating functions. Release date TBA.',
    technologies: ['Solidity', 'BASE', 'React', 'XCODE'],
    imageUrl: '/images/project-5-sonar.png',
    year: 'TBA'
  },
  {
    id: '6',
    title: 'ROUGEE APP',
    category: 'Crypto / Social Media',
    description: 'The original Rougee Labs product, Rougee was the first on-chain decentralized social media platform, reaching an ATH market cap of over $50M.',
    technologies: ['Solidity', 'Ethereum'],
    imageUrl: '/images/project-6-rougee.jpg',
    year: '2023'
  }
];

export const NAV_LINKS = [
  { label: 'Manifesto', href: '#hero' },
  { label: 'Protocols', href: '#work' },
  { label: 'Consensus', href: '#about' },
  { label: 'Signal', href: '#contact' },
];