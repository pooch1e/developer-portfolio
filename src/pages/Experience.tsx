import { experienceList } from "@/data/experience";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
export default function ExperiencePage() {
  return (
    <section className="bg-bg-primary font-departure">
      <div className="h-full w-full p-8 box-border">
        <h3 className="text-2xl px-4">Experience</h3>
        
        <div className="flex flex-col gap-2 border border-dashed px-4">
          <h4 className="text-xl">Sentric/Believe Nov 2025 - Jan 2027</h4>
          {experienceList.map((item) => (
            <ExperienceCard
              title={item.title}
              subtitle={item.subtitle}
              listItems={item.listItems}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
