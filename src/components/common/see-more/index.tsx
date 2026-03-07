'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { useToggle, useWindowSize } from 'usehooks-ts';
import { ChevronDown } from 'lucide-react';

interface SeeMoreProps extends PropsWithChildren {
  maxHeight: number;
  disabledOnDesktop?: boolean;
  overlayClassName?: string;
}

const DESKTOP_WIDTH = 1024;

const SeeMore: FC<SeeMoreProps> = ({ maxHeight, children, disabledOnDesktop = false, overlayClassName }) => {
  const [element, setElement] = useState<HTMLDivElement | undefined>();
  const [isOpen, toggle] = useToggle();

  const { width } = useWindowSize();

  const isOverflow = useMemo(() => {
    if (!element || !width) return false;
    if (disabledOnDesktop && width > DESKTOP_WIDTH) return false;
    return element.clientHeight > maxHeight;
  }, [disabledOnDesktop, element, maxHeight, width]);

  return (
    <div className='relative'>
      <div
        style={{
          ...(isOpen
            ? {
              height: element?.clientHeight,
            }
            : {
              ...(isOverflow
                ? {
                  height: maxHeight,
                }
                : {}),
            }),
        }}
        className='overflow-hidden transition-all'
      >
        <div
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //   @ts-expect-error
          ref={setElement}
        >
          {children}
        </div>
      </div>

      {isOverflow && (
        <div
          className={cn(
            'from-background/0 to-background absolute bottom-0 left-0 flex h-[80px] w-full items-end justify-center bg-gradient-to-b to-65%',
            { 'relative h-fit': isOpen },
            overlayClassName,
          )}
        >
          <Button

            color='secondary'
            onClick={toggle}
            size='sm'

          >
            {isOpen ? 'Thu gọn' : 'Xem thêm'}
            <ChevronDown
              className='transition-all'
              style={{
                ...(isOpen
                  ? {
                    rotate: '180deg',
                  }
                  : {}),
              }}
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeeMore;
