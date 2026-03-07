'use client';
import AppLogo from '@/components/ui/app-logo';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import {
  BuildingStorefrontIcon,
  CalendarDateRangeIcon,
  CreditCardIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { CardActionArea } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { FC, useMemo } from 'react';

interface TabItem {
  label: string;
  icon: React.ReactNode;
  path: `/${string}`;
  variant: 'plain' | 'contained';
  disabled?: boolean;
}

type FrontLayoutTabsProps = object;

const tabs: Array<TabItem> = [
  {
    label: 'Tổng quan',
    icon: <Squares2X2Icon className='size-full' />,
    path: '/overview',
    variant: 'plain',
    disabled: true,
  },
  {
    label: 'Hoạt động',
    icon: <CalendarDateRangeIcon />,
    path: '/activities',
    variant: 'plain',
  },
  {
    label: 'Vận hành',
    icon: <AppLogo className='size-full' />,
    path: '/',
    variant: 'contained',
  },
  {
    label: 'Bán hàng',
    icon: <BuildingStorefrontIcon className='size-full' />,
    path: '/store',
    variant: 'plain',
    disabled: true,
  },
  {
    label: 'Doanh thu',
    icon: <CreditCardIcon className='size-full' />,
    path: '/revenue',
    variant: 'plain',
    disabled: true,
  },
];

const FrontLayoutTabs: FC<FrontLayoutTabsProps> = () => {
  const pathname = usePathname();

  const shouldShow = useMemo(() => tabs.some((tab) => tab.path === pathname), [pathname]);

  return (
    <>
      <div className={cn('h-[80px] transition-all duration-500', !shouldShow && 'h-0')} />
      <div
        className={cn(
          'fixed right-0 -bottom-1 left-0 z-100 flex h-[80px] items-center bg-[#0F1115]/90 transition-all duration-500',
          !shouldShow && 'translate-y-full',
        )}
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <CardActionArea
              className='h-full flex-1'
              component={Link}
              href={tab.path}
              key={tab.path}
              disabled={tab.disabled}
            >
              <div
                className={cn('text-neutral-1 flex size-full flex-col items-center justify-center gap-1 py-2', {
                  'text-primary': isActive,
                  'opacity-50': tab.disabled,
                })}
              >
                <div
                  className={cn({
                    'to-primary/20 from-primary/0 flex size-11 items-center justify-center rounded-full border border-white/10 bg-radial':
                      tab.variant === 'contained',
                  })}
                >
                  <div className={cn('size-5')}>{tab.icon}</div>
                </div>
                <span className='text-[9px] whitespace-nowrap'>{tab.label}</span>
              </div>
            </CardActionArea>
          );
        })}
      </div>
    </>
  );
};

export default FrontLayoutTabs;
