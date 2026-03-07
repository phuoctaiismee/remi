'use client';
import React, { ComponentProps, FC } from 'react';
import { useRouter } from '../hooks';
import Link from './link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppTopbarProps extends ComponentProps<'div'> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode | false;
  canBack?: boolean;
  canGoHome?: boolean;
  position?: 'fixed' | 'relative';
  onBack?: () => void;
}

const AppTopbar: FC<AppTopbarProps> = ({
  center: centerFromProps,
  left: leftFromProps,
  right: rightFromProps,
  className,
  canBack = true,
  canGoHome = true,
  position = 'fixed',
  onBack,
  title,
  ...props
}) => {
  const router = useRouter();
  const handleBack = onBack ?? router.back;

  const center = centerFromProps ? (
    centerFromProps
  ) : title ? (
    <h2 className='text-content-1 font-medium'>{title}</h2>
  ) : null;

  const left = leftFromProps ? (
    leftFromProps
  ) : canBack ? (
    <Button variant='ghost' size="icon" onClick={handleBack}>
      <ArrowLeft />
    </Button>
  ) : null;

  const right = rightFromProps ? (
    rightFromProps
  ) : typeof rightFromProps !== 'boolean' && canGoHome ? (
    <Link href='/'>
      <Button variant='ghost' size="icon">
        <HomeIcon />
      </Button>
    </Link>
  ) : null;


  return (
    <>
      {position === 'fixed' && <div className='h-[80px]' />}

      <header
        className={cn('bg-background top-0 left-0 z-100 w-full', className, {
          fixed: position === 'fixed',
          relative: position === 'relative',
        })}
        {...props}
      >
        <div className='relative flex h-[80px] items-center justify-between gap-2 border-b border-white/10 bg-[#161922] px-4'>
          <div>{left}</div>

          <div
            className={cn('absolute top-1/2 left-1/2 w-[calc(100%-140px)] -translate-1/2', {
              'left-[calc(50%-35px)] w-[calc(100%-70px)] px-6': !left,
            })}
          >
            {center}
          </div>

          <div>{right}</div>
        </div>
      </header>

    </>
  );
};

export default AppTopbar;
