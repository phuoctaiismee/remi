'use client';

import { CardActionArea } from '@/components/ui/card-action-area';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, Settings, User, LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';

interface TabItem {
  icon: LucideIcon;
  path: `/${string}`;
}

const tabs: Array<TabItem> = [
  {
    icon: Home,
    path: '/',
  },
  {
    icon: LayoutGrid,
    path: '/schedule',
  },
  {
    icon: Settings,
    path: '/settings',
  },
  {
    icon: User,
    path: '/profile',
  },
];

type FrontLayoutTabsProps = object;

const FrontLayoutTabs: FC<FrontLayoutTabsProps> = () => {
  const pathname = usePathname();

  const shouldShow = useMemo(() => tabs.some((tab) => tab.path === pathname), [pathname]);

  return (
    <>
      {/* Spacer to prevent content from hiding behind the navbar */}
      <div className={cn('h-[100px] transition-all duration-500', !shouldShow && 'h-0')} />

      <div
        className={cn(
          'fixed bottom-6 left-1/2 z-100 flex w-[calc(100%-2.5rem)] -translate-x-1/2 items-center justify-between rounded-[32px] border border-neutral-800 bg-neutral-900 p-2 shadow-2xl transition-all duration-500',
          !shouldShow && 'translate-y-[150%] opacity-0'
        )}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path;

          return (
            <CardActionArea
              component={Link}
              key={tab.path}
              href={tab.path}
              className={cn(
                'flex size-14 items-center justify-center rounded-full transition-colors',
                isActive
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              )}
            >
              <Icon className="size-6" />
            </CardActionArea>
          );
        })}
      </div>
    </>
  );
};

export default FrontLayoutTabs;
