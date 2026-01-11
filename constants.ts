import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'BASEPASS',
    category: 'Decentralized Ticketing',
    description: 'A fully decentralized on-chain event ticketing site built on Base chain designed for crypto events and conferences',
    technologies: ['Base', 'React', 'Solidity'],
    imageUrl: 'https://i.ibb.co.com/zhFGwTGq/Screenshot-2025-12-25-at-11-22-55.png',
    year: '2025',
    liveUrl: 'https://www.basepass.events',
  },
  {
    id: '2',
    title: 'TIA.AI',
    category: 'Sentiment Analysis',
    description: 'A sentiment analysis tool built on Base chain.',
    technologies: ['Base', 'React', 'AI'],
    imageUrl: 'https://i.ibb.co.com/Y4NcKrjJ/Screenshot-2026-01-10-at-13-42-17.png',
    year: '2025',
    liveUrl: 'https://tia-ai.netlify.app',
  },
  {
    id: '3',
    title: 'DEGEN SWAP',
    category: 'Decentralized Exchange',
    description: 'First-ever NFT marketplace and launcher on the Keeta blockchain',
    technologies: ['Keeta', 'React', 'IPFS'],
    imageUrl: 'https://i.ibb.co.com/CpkPPqFz/Screenshot-2025-12-10-at-02-14-30.png',
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
    imageUrl: 'https://i.ibb.co.com/Hp1Shhv7/Screenshot-2025-12-17-at-11-26-01.png',
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
    imageUrl: 'https://i.ibb.co.com/LDdk6nnX/Screenshot-2025-12-10-at-02-50-14.png',
    year: 'TBA'
  },
  {
    id: '6',
    title: 'ROUGEE APP',
    category: 'Crypto / Social Media',
    description: 'The original Rougee Labs product, Rougee was the first on-chain decentralized social media platform, reaching an ATH market cap of over $50M.',
    technologies: ['Solidity', 'Ethereum'],
    imageUrl: 'https://www.techcompanynews.com/wp-content/uploads/2023/01/rougee-featured.jpg',
    year: '2023'
  }
];

export const NAV_LINKS = [
  { label: 'Manifesto', href: '#hero' },
  { label: 'Protocols', href: '#work' },
  { label: 'Consensus', href: '#about' },
  { label: 'Signal', href: '#contact' },
];