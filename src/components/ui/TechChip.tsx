/**
 * TechChip — pill showing a technology name, with an optional icon. Shared by
 * project cards and the experience stack.
 */
interface TechChipProps {
  name: string;
  icon?: string;
}

export function TechChip({ name, icon }: TechChipProps) {
  return (
    <span className="flex items-center gap-2 bg-bg-secondary px-3 py-1.5 rounded-full border border-border-strong">
      {icon && <img src={icon} alt="" className="w-5 h-5" />}
      <span className="text-sm text-text-primary">{name}</span>
    </span>
  );
}
