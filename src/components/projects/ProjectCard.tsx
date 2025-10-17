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
    <section className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 transition-colors duration-300 ease-linear dark:bg-zinc-700 rounded-lg">
      {/* Image Section */}
      <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0">
        <ImageContainer imageUrl={image} />
      </div>
      

      <div className="flex-1 flex flex-col gap-4 pr-6">
        <h4 className="text-2xl font-medium text-black dark:text-white tracking-[-0.3px] hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          {title}
        </h4>
        
        <p className="text-black dark:text-white leading-relaxed mb-4">
          {description}
        </p>
        
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
 
          {technologies.length > 0 && (
            <div className="sm:col-span-2">
              <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-2">
                Technologies
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-6 h-6"
                    />
                    <span className="text-sm text-black dark:text-white font-medium">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
      
          {links.length > 0 && (
            <div className="sm:col-span-2">
              <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-2">
                Links
              </span>
              <div className="flex flex-wrap gap-4">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors border-b border-black dark:border-white hover:border-gray-600 dark:hover:border-gray-300 pb-0.5"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
