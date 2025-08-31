interface ProjectLinks {
  url: string;
  label: string;
}
interface ProjectLinkProps {
  links: ProjectLinks[];
}
export const ProjectLinks = ({ links }: ProjectLinkProps) => {
  return (
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
  );
};
