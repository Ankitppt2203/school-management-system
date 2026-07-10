import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type IconName = keyof typeof Icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] ?? Icons.Circle;
  return <Cmp {...props} />;
}

export function iconExists(name: string): boolean {
  return name in Icons;
}

export const iconList = Object.keys(Icons) as IconName[];
