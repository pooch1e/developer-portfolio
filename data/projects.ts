import reactIcon from '../src/assets/SVG/react-svgrepo-com.svg';
import bootstrapIcon from '../src/assets/SVG/bootstrap-fill-svgrepo-com.svg';
import apiIcon from '../src/assets/SVG/api-interface-svgrepo-com.svg';
import viteIcon from '../src/assets/SVG/vite-svgrepo-com.svg';
import nodeIcon from '../src/assets/SVG/node-js-svgrepo-com.svg';
import expressIcon from '../src/assets/SVG/express-svgrepo-com.svg';
import jestIcon from '../src/assets/SVG/jest-svgrepo-com.svg';
import postGresIcon from '../src/assets/SVG/postgresql-svgrepo-com.svg';
import nextJsIcon from '../src/assets/SVG/next-js-svgrepo-com.svg';
import tailwindIcon from '../src/assets/SVG/tailwind-svgrepo-com.svg';
import drizzleIcon from '../src/assets/SVG/drizzle-drizzling-rain-svgrepo-com.svg';
import threeDIcon from '../src/assets/SVG/3d-secure-svgrepo-com.svg';
import typeScriptIcon from '../src/assets/SVG/typescript-svgrepo-com.svg';
import sequelizeIcon from '../src/assets/SVG/Sequelize.svg';
import electronIcon from '../src/assets/SVG/Electron.svg';

import kr8 from '../src/assets/kr8_logo.png';
import civ from '../src/assets/sparkforge.png';
import ncNewsFrontendImage from '../src/assets/ncnews3.png';
import ncNewsBackendImage from '../src/assets/ncnewsbackend1.png';
import madgeWebsite from '../src/assets/madgeWebsite.png';
import gallery from '../src/assets/gallery.png';
import sun from '../src/assets/sun.png';


// Define interfaces for the data structure
export interface Technology {
  name: string;
  icon: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectType {
  title: string;
  image: string;
  description: string;
  technologies: Technology[];
  links: ProjectLink[];
}

export const kr8Project: ProjectType = {
  title: 'kr8 - WIP',
  image: kr8,
  description:
    'Kr8 is an application built for DJ purists who love the experience of digging through vinyl records and album artwork. The idea is: take your digital playlists and make them feel physical again.\n\nThe project is split into three parts:\n- Desktop (Electron + React): Import playlists from Rekordbox or Traktor, tweak track details, and curate your collection.\n- Backend (Express + Sequelize + Postgres): Provides a solid API layer for syncing, storage, and metadata.\n- Mobile (React Native + Expo): Lets you “dig” through your collection on the go, flipping through artwork as if you were crate digging in a record shop.\n\nCreated in collaboration with Simon Busby, this project is still in progress, with an MVP expected within the next month.',
  technologies: [
    { name: 'React', icon: reactIcon },
    { name: 'TailwindCss', icon: tailwindIcon },
    { name: 'Sequelize', icon: sequelizeIcon },
    { name: 'Electron', icon: electronIcon },
  ],
  links: [
    {
      label: 'GitHub - kr8 Server',
      url: 'https://github.com/bluesky2006/kr8-server',
    },
    {
      label: 'GitHub - kr8 Desktop',
      url: 'https://github.com/bluesky2006/kr8-desktop',
    },
    {
      label: 'GitHub - kr8 Mobile',
      url: 'https://github.com/bluesky2006/kr8-mobile',
    },
  ],
};

export const sparkTables: ProjectType = {
  title: 'SparkForge - WIP',
  image: civ,
  description:
    'An inspiration application for creating random prompts to improve creative writing and role playing games. Roll on tables of multiple prompts to create improvisational scenes. Built with Next.js, Typescript, Drizzle, Three.js, Tailwind and including a fully unit and intergration tested API. Future features planned are more CRUD capabilities, a 3d dice rolling function and Tailwind polish.',
  technologies: [
    { name: 'Next.Js', icon: nextJsIcon },
    { name: 'TailwindCss', icon: tailwindIcon },
    { name: 'TypeScript', icon: typeScriptIcon },
    { name: 'Drizzle', icon: drizzleIcon },
    { name: 'Three.js', icon: threeDIcon },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/pooch1e/spark-tables' },
    {
      label: 'Trello',
      url: 'https://trello.com/invite/b/6875061d3da65b5293154355/ATTI758768a3fb4c7b2a2af6d814be55739e080A0370/spark-table-dev-board',
    },
  ],
};

export const ncNewsProjectFrontEnd: ProjectType = {
  title: 'NC News',
  image: ncNewsFrontendImage,
  description:
    'A Reddit-style news platform built as part of the Northcoders bootcamp. Users can browse, filter, and sort articles, leave comments, and vote on content. It consumes a custom express API. I have recently refactored the whole project to improve component design and styling - utilising Tailwind instead of Bootstrap. This is deployed via Netlify and connects to a Render hosted Database and backend application. Please note - it may take a minute for the render server to load',
  technologies: [
    { name: 'React 18', icon: reactIcon },
    { name: 'Bootstrap 5', icon: bootstrapIcon },
    { name: 'Context API', icon: apiIcon },
    { name: 'Vite', icon: viteIcon },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/pooch1e/nc-news-fe' },
    { label: 'Deployed', url: 'https://nc-news-jkram.netlify.app/' },
  ],
};

export const ncNewsProjectBackEnd: ProjectType = {
  title: 'NC News Express API Application',
  image: ncNewsBackendImage,
  description:
    'A robust RESTful backend API for a Reddit-style news platform, built with Node.js, Express, and PostgreSQL. This project provides comprehensive article, topic, user, and comment management functionality with full CRUD operations.',
  technologies: [
    { name: 'Node.JS', icon: nodeIcon },
    { name: 'Express', icon: expressIcon },
    { name: 'PostGresql', icon: postGresIcon },
    { name: 'Jest', icon: jestIcon },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/pooch1e/NC-News-Project' },
    { label: 'Deployed', url: 'https://nc-news-api-qa14.onrender.com/' },
  ],
};

export const madgeSplashPage: ProjectType = {
  title: 'Artist Website',
  image: madgeWebsite,
  description:
    'Built a custom splash page and incoming website (WIP) for artist Madge Zhou. Page is built using React with Tailwind for styling and features some basic CSS animations.',
  technologies: [
    { name: 'React 18', icon: reactIcon },
    { name: 'TailwindCss', icon: tailwindIcon },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/pooch1e/madge-website' },
    { label: 'Deployed', url: 'https://www.madzoo.lol/' },
  ],
};

export const openCurator: ProjectType = {
  title: 'OpenGallery',
  image: gallery,
  description:
    'A digital platform for creating personalized virtual art exhibitions from world-renowned museum collections. OpenGallery allows users to search, discover, and curate custom art collections using APIs from Harvard Art Museums, Metropolitan Museum of Art, and Chicago Museum. Built for art lovers, researchers, and students, the platform features smart search across multiple collections, responsive design, and session-persistent favorites. Users can create their own virtual exhibitions and access direct links to original museum pages for each artwork.',
  technologies: [
    { name: 'Next.js', icon: nextJsIcon },
    { name: 'React', icon: reactIcon },
    { name: 'TypeScript', icon: typeScriptIcon },
    { name: 'TailwindCss', icon: tailwindIcon },
    { name: 'Jest', icon: jestIcon },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/pooch1e/open-curator' },
    { label: 'Deployed', url: 'https://www.opencurator.xyz/' },
  ],
};export const weatherMe: ProjectType = {
  title: 'Weather Me',
  image: sun, 
  description:
    'A modern, responsive weather application built with Next.js featuring real-time weather data, intelligent location search, and automatic geolocation detection. Users can search any city worldwide, view current conditions, hourly forecasts, and 7-day outlook. The app features server-side weather fetching for improved performance and SEO, client-side search for responsive interactions, and a clean arcade-style UI built with Tailwind CSS.',
  technologies: [
    { name: 'Next.js', icon: nextJsIcon },
    { name: 'React', icon: reactIcon },
    { name: 'TypeScript', icon: typeScriptIcon },
    { name: 'TailwindCss', icon: tailwindIcon },
    { name: 'Context API', icon: apiIcon },
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/pooch1e/weather-me' },
    {
      label: 'Deployed',
      url: 'https://weather-k12ll1to3-joel-krams-projects.vercel.app/',
    },
  ],
};
export const allProjects: ProjectType[] = [
  sparkTables,
  ncNewsProjectFrontEnd,
  ncNewsProjectBackEnd,
  madgeSplashPage,
  openCurator,
  weatherMe
];

export type ncNewsProjectType = ProjectType;
