interface Technology {
  name: string;
  icon: string;
}
interface TechStackProps {
  technologies: Technology[];
}
export const TechStack = ({ technologies }: TechStackProps) => {
  return (
    <div className="text-sm text-gray-400 dark:text-white space-y-1">
      {/* icons */}
      {technologies.length > 0 && (
        <div className="flex items-center space-x-4">
          {technologies.map((tech, index: number) => (
            <div key={index} className="flex items-center mt-1 space-x-1">
              <img src={tech.icon} alt={tech.name} className="w-10 h-10"></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
