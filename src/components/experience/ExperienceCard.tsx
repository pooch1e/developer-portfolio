/**
 * ExperienceCard — one collapsible group of bullets. The title and subtitle
 * form the native <summary> toggle, so keyboard and screen-reader support come
 * from <details>.
 */
import { ChevronRight } from "lucide-react";
import type { ExperienceSection } from "@/data/experience";

interface ExperienceCardProps extends ExperienceSection {
  defaultOpen?: boolean;
}

export function ExperienceCard({
  title,
  subtitle,
  listItems,
  defaultOpen = false,
}: ExperienceCardProps): React.ReactElement {
  return (
    <details open={defaultOpen} className="group">
      <summary className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-highlight-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary">
        <span aria-hidden="true" className="row-span-2 flex h-7 items-center">
          <ChevronRight
            size={18}
            className="text-text-muted transition-transform duration-150 ease-out group-open:rotate-90 motion-reduce:transition-none"
          />
        </span>
        <h4 className="text-xl text-text-primary">{title}</h4>
        {subtitle ? (
          <span className="text-sm text-text-secondary">{subtitle}</span>
        ) : null}
      </summary>
      <ul className="list-['-_'] pl-12 pt-3 space-y-1 text-text-secondary leading-relaxed">
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </details>
  );
}
