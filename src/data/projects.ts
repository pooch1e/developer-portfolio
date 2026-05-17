import {
  reactIcon,
  bootstrapIcon,
  apiIcon,
  viteIcon,
  nodeIcon,
  expressIcon,
  jestIcon,
  postGresIcon,
  nextJsIcon,
  tailwindIcon,
  drizzleIcon,
  threeDIcon,
  typeScriptIcon,
  sequelizeIcon,
  electronIcon,
  cssIcon,
  jsIcon,
  gopherIcon,
  threejsIcon,
} from '@/assets/SVG';

import kr8 from '@/assets/kr8_logo.png';
import civ from '@/assets/sparkforge.png';
import ncNewsFrontendImage from '@/assets/ncnews3.png';
import ncNewsBackendImage from '@/assets/ncnewsbackend1.png';
import madgeWebsite from '@/assets/madgeWebsite.png';
import gallery from '@/assets/gallery.png';
import sun from '@/assets/sun.png';
import balloons from '@/assets/balloons.png';
import gopher from '@/assets/gopher.png';
import threeJs from '@/assets/threjsExperiments.png';

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
  title: "kr8 - WIP",
  image: kr8,
  description:
    "Kr8 is an application built for DJ purists who love the experience of digging through vinyl records and album artwork. The idea is: take your digital playlists and make them feel physical again.\n\nThe project is split into three parts:\n- Desktop (Electron + React): Import playlists from Rekordbox or Traktor, tweak track details, and curate your collection.\n- Backend (Express + Sequelize + Postgres): Provides a solid API layer for syncing, storage, and metadata.\n- Mobile (React Native + Expo): Lets you \"dig\" through your collection on the go, flipping through artwork as if you were crate digging in a record shop.\n\nCreated in collaboration with Simon Busby, this project is still in progress, with an MVP expected within the next month.",
  technologies: [
    { name: "React", icon: reactIcon },
    { name: "TailwindCss", icon: tailwindIcon },
    { name: "Sequelize", icon: sequelizeIcon },
    { name: "Electron", icon: electronIcon },
  ],
  links: [
    {
      label: "GitHub - kr8 Server",
      url: "https://github.com/bluesky2006/kr8-server",
    },
    {
      label: "GitHub - kr8 Desktop",
      url: "https://github.com/bluesky2006/kr8-desktop",
    },
    {
      label: "GitHub - kr8 Mobile",
      url: "https://github.com/bluesky2006/kr8-mobile",
    },
  ],
};

export const sparkTables: ProjectType = {
  title: "SparkForge - WIP",
  image: civ,
  description:
    "An inspiration application for creating random prompts to improve creative writing and role playing games. Roll on tables of multiple prompts to create improvisational scenes. Built with Next.js, Typescript, Drizzle, Three.js, Tailwind and including a fully unit and intergration tested API. Future features planned are more CRUD capabilities, a 3d dice rolling function and Tailwind polish.",
  technologies: [
    { name: "Next.Js", icon: nextJsIcon },
    { name: "TailwindCss", icon: tailwindIcon },
    { name: "TypeScript", icon: typeScriptIcon },
    { name: "Drizzle", icon: drizzleIcon },
    { name: "Three.js", icon: threeDIcon },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/pooch1e/spark-tables" },
    {
      label: "Trello",
      url: "https://trello.com/invite/b/6875061d3da65b5293154355/ATTI758768a3fb4c7b2a2af6d814be55739e080A0370/spark-table-dev-board",
    },
  ],
};

export const ncNewsProjectFrontEnd: ProjectType = {
  title: "NC News",
  image: ncNewsFrontendImage,
  description:
    "A Reddit-style news platform built as part of the Northcoders bootcamp. Users can browse, filter, and sort articles, leave comments, and vote on content. It consumes a custom express API. I have recently refactored the whole project to improve component design and styling - utilising Tailwind instead of Bootstrap. This is deployed via Netlify and connects to a Render hosted Database and backend application. Please note - it may take a minute for the render server to load",
  technologies: [
    { name: "React 18", icon: reactIcon },
    { name: "Bootstrap 5", icon: bootstrapIcon },
    { name: "Context API", icon: apiIcon },
    { name: "Vite", icon: viteIcon },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/pooch1e/nc-news-fe" },
    { label: "Deployed", url: "https://nc-news-jkram.netlify.app/" },
  ],
};

export const ncNewsProjectBackEnd: ProjectType = {
  title: "NC News Express API Application",
  image: ncNewsBackendImage,
  description:
    "A robust RESTful backend API for a Reddit-style news platform, built with Node.js, Express, and PostgreSQL. This project provides comprehensive article, topic, user, and comment management functionality with full CRUD operations.",
  technologies: [
    { name: "Node.JS", icon: nodeIcon },
    { name: "Express", icon: expressIcon },
    { name: "PostGresql", icon: postGresIcon },
    { name: "Jest", icon: jestIcon },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/pooch1e/NC-News-Project" },
    { label: "Deployed", url: "https://nc-news-api-qa14.onrender.com/" },
  ],
};

export const madgeSplashPage: ProjectType = {
  title: "Artist Website",
  image: madgeWebsite,
  description:
    "Built a custom splash page and incoming website (WIP) for artist Madge Zhou. Page is built using React with Tailwind for styling and features some basic CSS animations.",
  technologies: [
    { name: "React 18", icon: reactIcon },
    { name: "TailwindCss", icon: tailwindIcon },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/pooch1e/madge-website" },
    { label: "Deployed", url: "https://www.madzoo.lol/" },
  ],
};

export const trudiBirthdayWebsite: ProjectType = {
  title: "Birthday Website",
  image: balloons,
  description:
    "Built vanilla birthday website with HTML, CSS and Javascript. Includes little interactive animations, garish details and messages from friends.",
  technologies: [
    { name: "Javascript", icon: jsIcon },
    { name: "CSS", icon: cssIcon },
  ],
  links: [
    { label: "Github", url: "https://github.com/pooch1e/trudiBirthdayCard" },
    { label: "Deployed", url: "https://trudibirthday.studio/" },
  ],
};

export const openCurator: ProjectType = {
  title: "OpenGallery",
  image: gallery,
  description:
    "A digital platform for creating personalized virtual art exhibitions from world-renowned museum collections. OpenGallery allows users to search, discover, and curate custom art collections using APIs from Harvard Art Museums, Metropolitan Museum of Art, and Chicago Museum. Built for art lovers, researchers, and students, the platform features smart search across multiple collections, responsive design, and session-persistent favorites. Users can create their own virtual exhibitions and access direct links to original museum pages for each artwork.",
  technologies: [
    { name: "Next.js", icon: nextJsIcon },
    { name: "React", icon: reactIcon },
    { name: "TypeScript", icon: typeScriptIcon },
    { name: "TailwindCss", icon: tailwindIcon },
    { name: "Jest", icon: jestIcon },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/pooch1e/open-curator" },
    { label: "Deployed", url: "https://www.opencurator.xyz/" },
  ],
};

export const weatherMe: ProjectType = {
  title: "Weather Me",
  image: sun,
  description:
    "A modern, responsive weather application built with Next.js featuring real-time weather data, intelligent location search, and automatic geolocation detection. Users can search any city worldwide, view current conditions, hourly forecasts, and 7-day outlook. The app features server-side weather fetching for improved performance and SEO, client-side search for responsive interactions, and a clean arcade-style UI built with Tailwind CSS.",
  technologies: [
    { name: "Next.js", icon: nextJsIcon },
    { name: "React", icon: reactIcon },
    { name: "TypeScript", icon: typeScriptIcon },
    { name: "TailwindCss", icon: tailwindIcon },
    { name: "Context API", icon: apiIcon },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/pooch1e/weather-me" },
    {
      label: "Deployed",
      url: "https://weather-k12ll1to3-joel-krams-projects.vercel.app/",
    },
  ],
};

export const taskCli: ProjectType = {
  title: "Task-CLI",
  image: gopher,
  description:
    "A local-first CLI tool for tracking user stories, tasks, and subtasks — powered by LLM story generation. Describe a feature in plain English and task-cli generates a structured user story with acceptance criteria, tasks, and subtasks, stored in a local SQLite database. Supports 5 LLM providers: DeepSeek, OpenAI, Gemini, and free-to-use options via pi or opencode. Ships as a single zero-dependency binary for macOS and Linux.",
  technologies: [{ name: "Golang", icon: gopherIcon }],
  links: [
    { label: "Github", url: "https://github.com/pooch1e/task-cli" },
    {
      label: "Releases",
      url: "https://github.com/pooch1e/task-cli/releases/latest",
    },
  ],
};

export const threeJsExperiments: ProjectType = {
  title: "ThreeJs Experiments",
  image: threeJs,
  description:
    "A creative coding portfolio of interactive 3D experiments and custom WebGL/GLSL shaders, built with React 19 and Three.js. Features 17+ named shader experiments including a particle galaxy, GPGPU flow fields, procedural terrain, holographic materials, particle morphing, and more — each with hand-rolled GLSL implementations. Also includes p5.js sketches with Web Audio API FFT and beat detection. Backed by a Go REST API (Chi router) with JWT session authentication and a PostgreSQL database.",
  technologies: [
    { name: "React", icon: reactIcon },
    { name: "ThreeJs", icon: threejsIcon },
    { name: "Golang", icon: gopherIcon },
  ],
  links: [
    { label: "Github", url: "https://github.com/pooch1e/threeJsPortfolio" },
  ],
};

export const allProjects: ProjectType[] = [
  threeJsExperiments,
  taskCli,
  openCurator,
  kr8Project,
  sparkTables,
  weatherMe,
  ncNewsProjectFrontEnd,
  ncNewsProjectBackEnd,
  trudiBirthdayWebsite,
  madgeSplashPage,
];

export type ncNewsProjectType = ProjectType;
