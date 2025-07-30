export interface ncNewsProjectType {
  title: string;
  description: string;
  technologies: [{ name: string; icon: string }];
  links: [{ label: string; url: string }];
}

export const ncNewsProject = {
  title: 'NC News',
  description:
    'A modern React-based news aggregation application built with React Router, Bootstrap, and custom hooks for state management.',
  technologies: [
    { name: 'React 18', icon: 'Code2' },
    { name: 'React Router', icon: 'Route' },
    { name: 'Bootstrap 5', icon: 'Palette' },
    { name: 'Context API', icon: 'Layers' },
    { name: 'Vite', icon: 'Zap' },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/pooch1e/nc-news-fe' },
    { label: 'Deployed', url: 'https://nc-news-jkram.netlify.app/' },
  ],
};
