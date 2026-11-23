import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'gold' | 'sky';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  accent: 'bg-accent text-white hover:bg-accent-dark',
  gold: 'bg-gold-light text-amber-900 hover:bg-gold',
  sky: 'bg-sky text-white hover:bg-sky-dark',
  outline: 'border border-ink/20 bg-white text-ink hover:bg-ink/5',
  ghost: 'hover:bg-ink/5 text-ink/75',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-11 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-base gap-2',
  lg: 'h-14 px-8 text-lg gap-2.5',
  xl: 'h-16 px-10 text-xl gap-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type="button"
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl font-semibold',
          'transition-all duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// Icon Button variant
interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'md', children, ...props }, ref) => {
    const sizeMap = {
      sm: 'w-11 h-11',
      md: 'w-11 h-11',
      lg: 'w-14 h-14',
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        whileTap={{ scale: 0.97 }}
        className={cn(
          'inline-flex items-center justify-center rounded-full',
          'transition-all duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'ghost' ? 'hover:bg-ink/5 text-ink/75' : variantStyles[variant],
          sizeMap[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';
