import * as LucideIcons from 'lucide-react';

export const getIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent ? <IconComponent size={16} /> : null;
};
