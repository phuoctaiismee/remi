'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';

export interface CardActionAreaProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType;
  disabled?: boolean;
  href?: string;
  // Allow extending other props seamlessly (like Link props)
  [key: string]: any;
}

export const CardActionArea = React.forwardRef<HTMLElement, CardActionAreaProps>(
  ({ className, children, component, disabled, ...props }, ref) => {
    const Component = component || 'button';
    const [ripples, setRipples] = React.useState<{ x: number; y: number; size: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      if (props.onClick) props.onClick(e);
    };

    const handleAnimationComplete = (id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'relative overflow-hidden cursor-pointer focus:outline-none',
          disabled && 'cursor-not-allowed pointer-events-none hover:bg-transparent dark:hover:bg-transparent',
          "active:scale-90 transition-all duration-300 ease-initial" ,
          className
        )}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute bg-foreground rounded-full pointer-events-none"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
              onAnimationComplete={() => handleAnimationComplete(ripple.id)}
            />
          ))}
        </AnimatePresence>
      </Component>
    );
  }
);
CardActionArea.displayName = 'CardActionArea';
