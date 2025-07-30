import ProjectContainerWithProps from './ProjectContainerWithProps';
import { ncNewsProject } from '../../data/projects.js';
export default function WorkPage() {
  return (
    <div>
      <ProjectContainerWithProps {...ncNewsProject} />
    </div>
  );
}
