import ProjectContainerWithProps from './ProjectContainerWithProps';
import { ncNewsProjectFrontEnd } from '../../data/projects.js';
import { ncNewsProjectBackEnd } from '../../data/projects.js';
export default function PageContainer() {
  //add styles here
  return (
    <div>
      <ProjectContainerWithProps {...ncNewsProjectFrontEnd} />
      <ProjectContainerWithProps {...ncNewsProjectBackEnd} />
    </div>
  );
}
