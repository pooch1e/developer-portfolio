interface ExperienceProps {
  title: string;
  subtitle?: string;
  listItems: string[];
}
export function ExperienceCard({
  title,
  subtitle,
  listItems,
}: ExperienceProps): React.ReactElement {
  return (
    <div className="flex flex-col font-departure gap-2">
      <h3 className="text-xl">{title}</h3>
      {subtitle ? <h4 className="text-sm">{subtitle}</h4> : null}
      <div className="border">
        {listItems && (
          <ul>
            {listItems.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
