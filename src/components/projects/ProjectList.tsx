import ProjectCard from './ProjectCard.tsx';
import { allProjects } from '../../../data/projects.ts';
export default function ProjectList() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-700 transition-colors duration-300">
      {allProjects.map((project) => {
        return <ProjectCard key={project.title} {...project} />;
      })}
    </main>
  );
}
