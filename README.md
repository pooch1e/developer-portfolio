# Developer Portfolio

A modern, interactive developer portfolio built with React, Three.js, and Tailwind CSS. Features immersive 3D animations, responsive design, and smooth user experience across all devices.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [3D Models & Animations](#3d-models--animations)
- [Deployment](#deployment)
- [Development](#development)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

## Overview

This portfolio showcases my development skills through an interactive web experience that combines modern web technologies with engaging 3D visuals. The site serves as both a demonstration of technical capabilities and a platform to display projects and professional information.

## Features

### Core Features
- **Interactive 3D Home Page**: Spinning glitchy cube animation on the splash screen
- **3D Contact Experience**: Personal 3D scanned model integration on contact page
- **Theme Switching**: Seamless light/dark mode toggle
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Project Showcase**: Dedicated section highlighting development projects
- **Professional Links**: Direct integration with LinkedIn and GitHub profiles
- **Custom Domain**: Professional web presence with custom domain

### User Experience
- Smooth animations and transitions
- Fast loading times with Vite optimization
- Cross-browser compatibility
- Accessibility-focused design
- Mobile-first responsive approach

## Tech Stack

### Frontend Framework
- **React 18** - Component-based UI development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### 3D Graphics & Animation
- **Three.js** - WebGL 3D graphics library
- **Custom Shaders** - GLSL shaders

### Deployment & Infrastructure
- **Vercel** - Hosting and deployment platform
- **Custom Domain** - Professional web address

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── sections/        # Page sections (Hero, Projects, Contact)
│   │   ├── 3d/              # Three.js components and scenes
│   │   └── layout/          # Layout components (Header, Footer)
│   ├── assets/
│   │   ├── models/          # 3D model files
│   │   ├── textures/        # 3D textures and materials
│   │   └── images/          # Static images
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── styles/              # Global styles and Tailwind config
│   └── data/                # Static data (projects, content)
├── public/                  # Static assets
├── dist/                    # Production build output
└── vite.config.js          # Vite configuration
```

## 3D Models & Animations

### Home Page - Glitchy Cube
- **Model**: Procedurally generated cube geometry
- **Animation**: Continuous rotation with glitch effects
- **Materials**: Custom shaders for glitch aesthetic
- **Performance**: Optimized for 60fps across devices

### Contact Page - Personal 3D Model
- **Model**: 3D scanned personal model
- **Format**: Optimized for web (GLB/GLTF)
- **Interactions**: Mouse/touch controls for rotation
- **Loading**: Progressive loading with fallback

### Performance Optimizations
- Model compression and optimization
- Texture resolution scaling based on device
- Level-of-detail (LOD) implementation
- Efficient render loop management

## Deployment

The portfolio is deployed on **Vercel** with automatic deployments from the main branch.

### Deployment Process
1. Push changes to main branch
2. Vercel automatically builds and deploys
3. Custom domain updates within minutes

### Environment Setup
```bash
# Build command
npm run build

# Output directory
dist

# Install command
npm install
```

### Custom Domain Configuration
- Domain purchased and configured through domain registrar
- DNS settings pointed to Vercel servers
- SSL certificate automatically managed by Vercel

## Development

### Adding New Sections
1. Create component in `src/components/sections/`
2. Import and add to main layout
3. Update navigation if needed
4. Test responsiveness across devices

### Working with 3D Models
```javascript
// Loading a new 3D model
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function MyModel() {
  const gltf = useLoader(GLTFLoader, '/models/my-model.glb');
  return <primitive object={gltf.scene} />;
}
```

### Theme Implementation
The theme system uses CSS variables and Tailwind's dark mode:

```css
:root {
  --primary: #your-color;
  --background: #your-bg;
}

[data-theme='dark'] {
  --primary: #dark-color;
  --background: #dark-bg;
}
```

### Performance Monitoring
- Use React DevTools for component analysis
- Monitor Three.js performance with stats.js
- Lighthouse audits for overall performance

## Future Enhancements

### Immediate Improvements
- [ ] **Enhanced Projects Styling**
  - [ ] Interactive project cards with hover effects
  - [ ] Better typography and spacing
  - [ ] Project filtering and search functionality
  - [ ] Detailed project modal views

- [ ] **Advanced 3D Animations**
  - [ ] Particle systems and effects
  - [ ] Interactive 3D project previews
  - [ ] Physics-based animations
  - [ ] Scene transitions between pages

### Medium-term Goals
- [ ] **Content Management**
  - [ ] Blog section with markdown support
  - [ ] Dynamic project loading from CMS
  - [ ] Admin panel for content updates

- [ ] **User Experience**
  - [ ] Smooth page transitions
  - [ ] Loading animations and progress indicators
  - [ ] Sound design and audio feedback
  - [ ] Advanced accessibility features

### Long-term Vision
- [ ] **Interactive Features**
  - [ ] Real-time chat or contact form
  - [ ] Project collaboration tools
  - [ ] Mini-games or interactive demos

- [ ] **Performance & Analytics**
  - [ ] Advanced performance monitoring
  - [ ] User analytics and behavior tracking
  - [ ] A/B testing for different layouts

- [ ] **Technical Improvements**
  - [ ] Server-side rendering (SSR) migration
  - [ ] Progressive Web App (PWA) features
  - [ ] Advanced SEO optimizations

## Contact

- **Portfolio**: [your-domain.com](https://your-domain.com)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
- **Email**: your-email@domain.com

---

## Acknowledgments

- Three.js community for excellent documentation and examples
- Tailwind CSS for the utility-first approach
- Vercel for seamless deployment experience
- Open source contributors who made this project possible

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ and lots of ☕*