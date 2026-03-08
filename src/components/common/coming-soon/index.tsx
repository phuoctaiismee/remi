'use client';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { FC } from 'react';

type ComingSoonProps = object;

const ComingSoon: FC<ComingSoonProps> = () => {
  return (
    <div className='absolute flex size-full flex-col items-center justify-center gap-6 p-16 text-center bg-background'>
      <div className='flex flex-col items-center gap-4'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-primary drop-shadow-sm'>
            Coming Soon
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <p className='text-lg md:text-xl text-muted-foreground max-w-[500px]'>
            We&apos;re working on something awesome! Check back later for updates.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      >
        <Button variant='default' size='lg' className='mt-4' asChild>
          <Link href='/'>
            <ArrowLeft className='mr-2 size-4' />
            Go Back
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
