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

import dungeons from '../src/assets/dungeons.png';
import ncNewsFrontendImage from '../src/assets/ncnews.png';
import ncNewsBackendImage from '../src/assets/ncnewsbackend.png';
export interface ncNewsProjectType {
  title: string;
  image: string;
  description: string;
  technologies: [{ name: string; icon: string }];
  links: [{ label: string; url: string }];
}

export const sparkTables = {
  title: 'SparkForge - WIP',
  image: dungeons,
  description:
    'An inspiration application for creating random prompts to improve creative writing and role playing games. Built with Next.js, Typescript, Drizzle, Three.js, Tailwind and including a fully unit and intergration tested API. Future features planned are more CRUD capabilities, a 3d dice rolling function and tailwind polish',
  technologies: [
    { name: 'Next.Js', icon: nextJsIcon },
    { name: 'TailwindCss', icon: tailwindIcon },
    { name: 'TypeScript', icon: typeScriptIcon },
    { name: 'Drizzle', icon: drizzleIcon },
    { name: 'Three.js', icon: threeDIcon },
  ],
  links: [{ label: 'GitHub', url: 'https://github.com/pooch1e/spark-tables' }],
};

export const ncNewsProjectFrontEnd = {
  title: 'NC News',
  image: ncNewsFrontendImage,
  description:
    'A Reddit-style news platform built as part of the Northcoders bootcamp. Users can browse, filter, and sort articles, leave comments, and vote on content. It consumes a custom express API. The project also includes comprehensive integration testing with Jest and Supertest, and is deployed via Render. Please note - it may take a minute for the render server to load',
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
export const ncNewsProjectBackEnd = {
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
