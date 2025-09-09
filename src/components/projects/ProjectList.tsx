import { Link, useLocation } from 'react-router-dom';
import ProjectCard from './ProjectCard.tsx';
import { ncNewsProjectFrontEnd } from '../../../data/projects.ts';
import { ncNewsProjectBackEnd } from '../../../data/projects.ts';
import { sparkTables } from '../../../data/projects.ts';
import { madgeSplashPage } from '../../../data/projects.ts';
import { kr8Project } from '../../../data/projects.ts';

export default function ProjectList() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerClasses = isHomePage
    ? 'p-12 bg-transparent z-40 w-full relative transition-colors duration-300 ease-linear'
    : 'p-12 bg-white dark:bg-zinc-700 z-40 w-full relative transition-colors duration-300 ease-linear';
  return (
    <>
      <div className={headerClasses}>
        <div className="text mb-2 text-black text-1xl dark:text-white font-sixtyfour tracking-[-0.3px]">
          <h1 className="underline text-2xl">
            <Link to="/" aria-label="Joel Kram - Home page">
              Joel Kram
            </Link>
          </h1>
          <p className="text-base" role="doc-subtitle">
            Junior Fullstack Software Developer
          </p>
        </div>
      </div>
      <main className="min-h-screen bg-white dark:bg-zinc-700 transition-colors duration-300">
        <ProjectCard {...kr8Project} />
        <ProjectCard {...sparkTables} />
        <ProjectCard {...ncNewsProjectFrontEnd} />
        <ProjectCard {...ncNewsProjectBackEnd} />
        <ProjectCard {...madgeSplashPage} />
      </main>
    </>
  );
}
