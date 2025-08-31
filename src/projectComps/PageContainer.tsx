import ProjectContainerWithProps from './ProjectContainerWithProps.tsx';
import { ncNewsProjectFrontEnd } from '../../data/projects.js';
import { ncNewsProjectBackEnd } from '../../data/projects.js';
import { sparkTables } from '../../data/projects.js';
import { madgeSplashPage } from '../../data/projects.js';
import { kr8Project } from '../../data/projects.js';
export default function PageContainer() {
  //add styles here
  return (
    <div>
      <ProjectContainerWithProps {...kr8Project} />
      <ProjectContainerWithProps {...sparkTables} />
      <ProjectContainerWithProps {...ncNewsProjectFrontEnd} />
      <ProjectContainerWithProps {...ncNewsProjectBackEnd} />
      <ProjectContainerWithProps {...madgeSplashPage} />
    </div>
  );
}
