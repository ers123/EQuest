import confetti from 'canvas-confetti';
import { useCallback } from 'react';

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF7043', '#66BB6A', '#7C4DFF', '#FFD54F', '#29B6F6'],
    });

    // Second burst after a short delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF7043', '#66BB6A', '#7C4DFF', '#FFD54F', '#29B6F6'],
      });
    }, 150);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF7043', '#66BB6A', '#7C4DFF', '#FFD54F', '#29B6F6'],
      });
    }, 300);
  }, []);

  const fireStars = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'] as confetti.Shape[],
      colors: ['#FFD54F', '#FFC107', '#FF9800'],
    };

    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: 0.75,
    });
  }, []);

  const fireSchoolPride = useCallback(() => {
    const end = Date.now() + 500;

    const colors = ['#FF7043', '#FFD54F'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return { fireConfetti, fireStars, fireSchoolPride };
}
