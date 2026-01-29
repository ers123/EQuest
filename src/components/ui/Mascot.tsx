import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'thinking' | 'excited' | 'waving';
  animate?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
};

export function Mascot({ size = 'md', mood = 'happy', animate = true, className }: MascotProps) {
  return (
    <motion.div
      className={cn('relative', sizeMap[size], className)}
      animate={animate ? { y: [0, -8, 0] } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <EddieFox mood={mood} />
    </motion.div>
  );
}

// Eddie the Fox SVG Component
function EddieFox({ mood }: { mood: string }) {
  const eyeVariants = {
    happy: { scaleY: 1 },
    thinking: { scaleY: 0.6 },
    excited: { scaleY: 1.2 },
    waving: { scaleY: 1 },
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#FF7043" />
      <circle cx="50" cy="50" r="44" fill="#FF8A65" />

      {/* Ears */}
      <path
        d="M20 35 L30 10 L40 30 Z"
        fill="#FF7043"
        stroke="#E64A19"
        strokeWidth="2"
      />
      <path
        d="M25 30 L30 18 L35 28 Z"
        fill="#FFB74D"
      />
      <path
        d="M80 35 L70 10 L60 30 Z"
        fill="#FF7043"
        stroke="#E64A19"
        strokeWidth="2"
      />
      <path
        d="M75 30 L70 18 L65 28 Z"
        fill="#FFB74D"
      />

      {/* Face (white patch) */}
      <ellipse cx="50" cy="60" rx="25" ry="22" fill="white" />
      <ellipse cx="50" cy="65" rx="18" ry="15" fill="#FFF8E1" />

      {/* Eyes */}
      <motion.g
        animate={eyeVariants[mood as keyof typeof eyeVariants]}
        transition={{ duration: 0.3 }}
      >
        {/* Left eye */}
        <ellipse cx="38" cy="48" rx="8" ry="9" fill="white" />
        <ellipse cx="39" cy="49" rx="5" ry="6" fill="#4A4A4A" />
        <circle cx="41" cy="47" r="2" fill="white" />

        {/* Right eye */}
        <ellipse cx="62" cy="48" rx="8" ry="9" fill="white" />
        <ellipse cx="61" cy="49" rx="5" ry="6" fill="#4A4A4A" />
        <circle cx="63" cy="47" r="2" fill="white" />
      </motion.g>

      {/* Nose */}
      <ellipse cx="50" cy="58" rx="5" ry="4" fill="#4A4A4A" />
      <ellipse cx="50" cy="57" rx="2" ry="1.5" fill="#6A6A6A" />

      {/* Mouth */}
      {mood === 'happy' || mood === 'excited' ? (
        <path
          d="M42 65 Q50 75 58 65"
          fill="none"
          stroke="#4A4A4A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ) : mood === 'thinking' ? (
        <ellipse cx="55" cy="67" rx="4" ry="3" fill="#4A4A4A" />
      ) : (
        <path
          d="M45 68 L55 68"
          fill="none"
          stroke="#4A4A4A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}

      {/* Cheek blush */}
      <circle cx="28" cy="55" r="6" fill="#FF8A80" opacity="0.5" />
      <circle cx="72" cy="55" r="6" fill="#FF8A80" opacity="0.5" />

      {/* Waving hand for waving mood */}
      {mood === 'waving' && (
        <motion.g
          animate={{ rotate: [0, 20, 0, 20, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ transformOrigin: '85px 75px' }}
        >
          <ellipse cx="88" cy="70" rx="8" ry="10" fill="#FF7043" />
          <ellipse cx="88" cy="70" rx="5" ry="7" fill="#FFB74D" />
        </motion.g>
      )}
    </svg>
  );
}

// Speech bubble component
interface SpeechBubbleProps {
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export function SpeechBubble({ children, position = 'right', className }: SpeechBubbleProps) {
  const positionStyles = {
    left: 'right-full mr-3',
    right: 'left-full ml-3',
    top: 'bottom-full mb-3',
    bottom: 'top-full mt-3',
  };

  const tailStyles = {
    left: 'right-0 translate-x-1/2 border-l-white border-l-8 border-y-8 border-y-transparent border-r-0',
    right: 'left-0 -translate-x-1/2 border-r-white border-r-8 border-y-8 border-y-transparent border-l-0',
    top: 'bottom-0 translate-y-1/2 border-t-white border-t-8 border-x-8 border-x-transparent border-b-0',
    bottom: 'top-0 -translate-y-1/2 border-b-white border-b-8 border-x-8 border-x-transparent border-t-0',
  };

  return (
    <div className={cn('absolute', positionStyles[position], className)}>
      <div className="relative bg-white rounded-2xl px-4 py-3 shadow-lg min-w-max">
        {children}
        <div
          className={cn(
            'absolute w-0 h-0',
            position === 'left' || position === 'right' ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2',
            tailStyles[position]
          )}
        />
      </div>
    </div>
  );
}

// Mascot with speech bubble
interface MascotWithSpeechProps extends MascotProps {
  message?: string;
  bubblePosition?: 'left' | 'right' | 'top' | 'bottom';
}

export function MascotWithSpeech({
  message,
  bubblePosition = 'right',
  ...mascotProps
}: MascotWithSpeechProps) {
  return (
    <div className="relative inline-block">
      <Mascot {...mascotProps} />
      {message && (
        <SpeechBubble position={bubblePosition}>
          <p className="text-gray-700 font-medium text-sm max-w-[200px]">
            {message}
          </p>
        </SpeechBubble>
      )}
    </div>
  );
}
