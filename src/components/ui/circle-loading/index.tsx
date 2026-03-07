import { cn } from '@/lib/utils';
import { ComponentProps, FC } from 'react';
import { Spinner } from '@/components/ui/spinner';

type CircleLoadingProps = ComponentProps<'div'> & {
  message?: string;
};

const CircleLoading: FC<CircleLoadingProps> = ({ className, message, ...props }) => {
  return (
    <div {...props} className={cn('flex min-h-50 flex-col items-center justify-center gap-2', className)}>
      <Spinner className='size-10 text-primary' />
      {message && <p className='text-neutral-2 text-center font-normal'>{message}</p>}
    </div>
  );
};

export default CircleLoading;
