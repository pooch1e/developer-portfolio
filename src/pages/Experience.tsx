import { jobs } from "@/data/experience";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { TechChip } from "@/components/ui/TechChip";
export default function ExperiencePage() {
  return (
    <section className="bg-bg-primary text-text-primary">
      <div className="h-full w-full p-8 box-border">
        <div className="flex flex-col gap-8">
          {jobs.map((job, jobIndex) => (
            <article
              key={job.company}
              className="flex flex-col gap-6 border border-dashed p-6"
            >
              <h3 className="text-xl">
                {job.company}{" "}
                <span className="text-text-muted">{job.period}</span>
              </h3>

              <div>
                <span className="block text-text-muted text-xs uppercase tracking-wider mb-2">
                  Stack
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {job.stack.map((tech) => (
                    <TechChip key={tech.name} name={tech.name} icon={tech.icon} />
                  ))}
                </div>
              </div>

              {job.sections.map((section, sectionIndex) => (
                <ExperienceCard
                  key={section.title}
                  {...section}
                  defaultOpen={jobIndex === 0 && sectionIndex === 0}
                />
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
