// ============================================================
// Confetti burst effect for celebrations
// ============================================================

const COLORS = ['#f471b5', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#fb923c'];

export function launchConfetti(count: number = 60) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}
