import confetti from 'canvas-confetti';

export function confetti75() {
  const green = getComputedStyle(document.documentElement).getPropertyValue('--green');
  const blue = getComputedStyle(document.documentElement).getPropertyValue('--blue');

  confetti({
    colors: [green, blue],
    gravity: 0.8,
    origin: { y: 0.8 },
    particleCount: 300,
    spread: 90,
    startVelocity: 60,
    ticks: 600,
  });
}

export function confetti90() {
  const red = '#b22222';
  const white = '#ffffff';
  const end = Date.now() + 6000;
  const half = 10;
  const full = 2 * half;
  let cycle = 0;

  (function frame() {
    const left = (cycle % full) === 0;
    const right = ((cycle + half) % full) === 0;
    const inc = Math.random() > 0.5 ? 1 : 0;
    cycle = cycle + inc;

    if (left) {
      confetti({
        colors: [red, white],
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
    }
    if (right) {
      confetti({
        colors: [red, white],
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

export function confetti105() {
  const yellow = '#ffff00';
  const orange = '#ff8c00';

  confetti({
    colors: [yellow, orange],
    gravity: 0.8,
    origin: { y: 0.8 },
    particleCount: 300,
    spread: 90,
    startVelocity: 60,
    ticks: 600,
  });
}

export function confetti120() {
  const purple = '#8a2be2';
  const pink = '#ff00ff';

  confetti({
    colors: [purple, pink],
    gravity: 0.8,
    origin: { y: 0.8 },
    particleCount: 300,
    spread: 90,
    startVelocity: 60,
    ticks: 600,
  });
}

export function confetti135() {
  const gold = '#cc9900';
  const silver = '#c0c0c0';
  const end = Date.now() + 6000;
  const half = 10;
  const full = 2 * half;
  let cycle = 0;

  (function frame() {
    const left = (cycle % full) === 0;
    const right = ((cycle + half) % full) === 0;
    const inc = Math.random() > 0.5 ? 1 : 0;
    cycle = cycle + inc;

    if (left) {
      confetti({
        colors: [gold, silver],
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
    }
    if (right) {
      confetti({
        colors: [gold, silver],
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

export function confetti150() {
  const defaults = { startVelocity: 20, spread: 360, ticks: 20, zIndex: 0 };
  const duration = 15 * 1000;
  const end = Date.now() + duration;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    const timeLeft = end - Date.now();
    const particleCount = 80 * (timeLeft / duration);

    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
