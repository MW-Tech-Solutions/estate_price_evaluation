import { Home } from 'lucide-react';

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Property Pilot home">
      <div className="bg-primary p-2 rounded-md">
        <Home className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-lg font-bold font-headline tracking-tight text-foreground sm:text-xl">
        Property Pilot
      </span>
    </a>
  );
}
