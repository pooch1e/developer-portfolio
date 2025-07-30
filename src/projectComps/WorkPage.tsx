import PageContainer from './PageContainer';
import ProjectContainerWithProps from './ProjectContainerWithProps';
import { ncNewsProject } from '../../data/projects.js';
export default function WorkPage() {
  return (
    <div>
      {/* <PageContainer /> */}
      <ProjectContainerWithProps {...ncNewsProject} />
    </div>
  );
}
