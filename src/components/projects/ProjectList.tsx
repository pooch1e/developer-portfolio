/**
 * ProjectList — the /projects page; renders a ProjectCard for every entry in
 * the project data.
 */
import ProjectCard from './ProjectCard';
import { allProjects } from '@/data/projects';
export default function ProjectList() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {allProjects.map((project) => {
        return <ProjectCard key={project.title} {...project} />;
      })}
    </main>
  );
}
