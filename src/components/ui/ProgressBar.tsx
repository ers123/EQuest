import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'accent' | 'gold' | 'sky';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelFormat?: 'percent' | 'value' | 'both';
  className?: string;
  animated?: boolean;
}

const variantGradients = {
  primary: 'from-primary to-primary-500',
  secondary: 'from-secondary to-secondary-400',
  accent: 'from-accent to-accent-light',
  gold: 'from-gold-dark to-gold',
  sky: 'from-sky-dark to-sky',
};

const sizeStyles = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  labelFormat = 'percent',
  className,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const formatLabel = () => {
    switch (labelFormat) {
      case 'value':
        return `${value}/${max}`;
      case 'both':
        return `${value}/${max} (${Math.round(percentage)}%)`;
      default:
        return `${Math.round(percentage)}%`;
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-bold text-gray-700">{formatLabel()}</span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-gray-100 rounded-full overflow-hidden shadow-inner',
          sizeStyles[size]
        )}
      >
        <motion.div
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full bg-gradient-to-r shadow-inner-glow',
            variantGradients[variant]
          )}
        />
      </div>
    </div>
  );
}

// Circular progress component
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'primary' | 'secondary' | 'accent' | 'gold';
  showValue?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = 'primary',
  showValue = true,
  className,
}: CircularProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: '#FF7043',
    secondary: '#66BB6A',
    accent: '#7C4DFF',
    gold: '#FFD54F',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}
