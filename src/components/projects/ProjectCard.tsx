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
    <section className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 transition-colors duration-300 ease-linear bg-surface border border-border-primary shadow-sm">
      {/* Image Section */}
      <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 overflow-hidden border border-border-primary">
        <ImageContainer imageUrl={image} />
      </div>


      <div className="flex-1 flex flex-col gap-4 pr-6">
        <h4 className="text-2xl font-semibold text-text-primary tracking-[-0.3px] transition-colors">
          {title}
        </h4>

        <p className="text-text-secondary leading-relaxed mb-4">
          {description}
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

          {technologies.length > 0 && (
            <div className="sm:col-span-2">
              <span className="block text-text-muted text-xs uppercase tracking-wider mb-2 font-medium">
                Technologies
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2 bg-bg-secondary px-3 py-1.5 rounded-full border border-border-primary">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-5 h-5"
                    />
                    <span className="text-sm text-text-primary font-medium">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}


          {links.length > 0 && (
            <div className="sm:col-span-2 mt-2">
              <span className="block text-text-muted text-xs uppercase tracking-wider mb-2 font-medium">
                Links
              </span>
              <div className="flex flex-wrap gap-4">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-text-primary hover:text-accent border-b border-border-primary hover:border-accent pb-0.5 transition-all"
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
