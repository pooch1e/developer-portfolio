import { ImageContainer } from './ImageContainer.tsx';
import type { ncNewsProjectType } from '../../../data/projects.ts';

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
          <div className="text-sm text-gray-400 dark:text-white space-y-1">
            {/* icons */}
            {technologies.length > 0 && (
              <div className="flex items-center space-x-4">
                {technologies.map((tech, index: number) => (
                  <div key={index} className="flex items-center mt-1 space-x-1">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-10 h-10"></img>
                    
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-5 mt-50 ">
          {links.map((link, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md text-black  hover:text-gray-600 dark:text-white transition-colors border-b border-black hover:border-gray-600">
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
