import { ImgContainer } from './ImgContainer';
import image from '../assets/ncnews.png';
import { getIcon } from '../utils/getIcons';
import type { ncNewsProjectType } from '../../data/projects';
export default function ProjectContainerWithProps({
  title,
  description,
  technologies,
  links,
}: ncNewsProjectType) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-8 border-b-1">
      {/* Image */}
      <div>
        <ImgContainer imageUrl={image} />
      </div>
      <div className="lg:col-span-2 space-y-8 mt-2">
        <h4 className="text mb-2 w-[800px] text-black text-[11pt] font-['Neue'] tracking-[-0.3px]">
          {title}
        </h4>
        <p className="text-black text-[11pt] font-['Neue'] leading-relaxed">
          {description}
        </p>
        <div className="flex justify-between items-end">
          <div className="text-sm text-gray-400 space-y-1">
            {/* icons */}
            {technologies.length > 0 && (
              <div className="flex items-center space-x-4">
                {technologies.map((tech, index: number) => (
                  <div key={index} className="flex items-center space-x-1">
                    {getIcon(tech.icon)}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1.5">
          {links.map((link, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black hover:text-gray-600 transition-colors border-b border-black hover:border-gray-600">
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
