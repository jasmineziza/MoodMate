'use client';

import { usePathname } from 'next/navigation';
import { MoodButton } from '@/components/buttons/MoodButton';
import { StatsButton } from '@/components/buttons/StatsButton'; 
import { CopingButton } from '@/components/buttons/CopingButton';
import { HelpButton } from '@/components/buttons/HelpButton';
import { HomeButton } from './buttons/HomeButton';

export const Navbar = () => {
  const pathname = usePathname();

  const items = [
    { path: '/mood', Button: MoodButton },
    { path: '/stats', Button: StatsButton },
    { path: '/coping', Button: CopingButton },
    { path: '/help', Button: HelpButton },
    { path: '/homepage',  Button: HomeButton },
  ];

  return (
    <nav className="flex items-center justify-center gap-24 py-8 bg-white shadow-md z-50">
      {items.map(({ path, Button }) => {
        const isActive = pathname === path;

        return (
          <div key={path} className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 transition-all`}
            >
              <Button isActive={isActive} />
            </div>
          </div>
        );
      })}
    </nav>
  );
};
