import ProjectCard from './ProjectCard.tsx';
import { ncNewsProjectFrontEnd } from '../../../data/projects.ts';
import { ncNewsProjectBackEnd } from '../../../data/projects.ts';
import { sparkTables } from '../../../data/projects.ts';
import { madgeSplashPage } from '../../../data/projects.ts';
import { kr8Project } from '../../../data/projects.ts';
import { openCurator } from '../../../data/projects.ts';
import { weatherMe } from '../../../data/projects.ts';
export default function ProjectList() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-700 transition-colors duration-300">
      <ProjectCard {...openCurator} />
      <ProjectCard {...kr8Project} />
      <ProjectCard {...sparkTables} />
      <ProjectCard {...weatherMe} />
      <ProjectCard {...ncNewsProjectFrontEnd} />
      <ProjectCard {...ncNewsProjectBackEnd} />
      <ProjectCard {...madgeSplashPage} />
    </main>
  );
}
