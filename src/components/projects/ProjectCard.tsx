import { ImageContainer } from './ImageContainer.tsx';
import type { ncNewsProjectType } from '../../../data/projects.ts';
import { TechStack } from './TechStack.tsx';
import { ProjectLinks } from './ProjectLinks.tsx';

export default function ProjectCard({
  title,
  image,
  description,
  technologies,
  links,
}: ncNewsProjectType) {
  return (
    <div className=" p-4 grid grid-cols-1 lg:grid-cols-3 gap-12 py-8 border-b-1 transition-colors duration-300 ease-linear dark:bg-zinc-700 ">
      {/* Image */}
      <div>
        <ImageContainer imageUrl={image} />
      </div>
      <div className="lg:col-span-2 space-y-8 mt-2 ">
        <h4 className="text mb-2 text-black text-2xl font-['Arial'] dark:text-white tracking-[-0.3px]">
          {title}
        </h4>
        <p className="text-black text-1xl font-['Neue'] dark:text-white leading-relaxed mr-1 text-justify">
          {description}
        </p>
        <div className="flex justify-between items-end ">
          <TechStack technologies={technologies}></TechStack>
        </div>

        <ProjectLinks links={links} />
      </div>
    </div>
  );
}
