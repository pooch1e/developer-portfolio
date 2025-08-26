import ProjectContainerWithProps from './ProjectContainerWithProps.tsx';
import { ncNewsProjectFrontEnd } from '../../data/projects.js';
import { ncNewsProjectBackEnd } from '../../data/projects.js';
import { sparkTables } from '../../data/projects.js';
import { madgeSplashPage } from '../../data/projects.js';
export default function PageContainer() {
  //add styles here
  return (
    <div>
      <ProjectContainerWithProps {...sparkTables} />
      <ProjectContainerWithProps {...ncNewsProjectFrontEnd} />
      <ProjectContainerWithProps {...ncNewsProjectBackEnd} />
      <ProjectContainerWithProps {...madgeSplashPage} />
    </div>
  );
}
