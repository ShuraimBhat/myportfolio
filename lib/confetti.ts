import confetti from "canvas-confetti";

export function triggerTechConfetti() {
  const count = 50;
  const defaults = {
    origin: { y: 0.85 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // High-tech emerald & cyan palette
  const colors = ["#10b981", "#34d399", "#38bdf8", "#6ee7b7", "#0ea5e9"];

  fire(0.25, {
    spread: 26,
    startVelocity: 45,
    colors,
  });
  fire(0.2, {
    spread: 60,
    colors,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors,
  });
}

export function triggerDownloadConfetti() {
  const duration = 1.2 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ["#10b981", "#38bdf8", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}
