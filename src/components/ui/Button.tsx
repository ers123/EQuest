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
  primary: 'bg-gradient-primary text-white shadow-button hover:shadow-lg border-b-4 border-primary-dark active:border-b-0',
  secondary: 'bg-gradient-secondary text-white shadow-button-secondary hover:shadow-lg border-b-4 border-secondary-dark active:border-b-0',
  accent: 'bg-gradient-accent text-white shadow-lg hover:shadow-xl border-b-4 border-accent-dark active:border-b-0',
  gold: 'bg-gradient-gold text-amber-900 shadow-lg hover:shadow-xl border-b-4 border-gold-dark active:border-b-0',
  sky: 'bg-gradient-sky text-white shadow-lg hover:shadow-xl border-b-4 border-sky-dark active:border-b-0',
  outline: 'border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-card',
  ghost: 'hover:bg-gray-100 text-gray-600',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-base gap-2',
  lg: 'h-14 px-8 text-lg gap-2.5',
  xl: 'h-16 px-10 text-xl gap-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95, y: 2 }}
        className={cn(
          'relative inline-flex items-center justify-center rounded-2xl font-bold',
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
      sm: 'w-9 h-9',
      md: 'w-11 h-11',
      lg: 'w-14 h-14',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'inline-flex items-center justify-center rounded-full',
          'transition-all duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'ghost' ? 'hover:bg-gray-100 text-gray-600' : variantStyles[variant],
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
