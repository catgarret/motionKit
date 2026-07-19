import { lerp, snapshotInlineStyles } from '../utils.js';

export default {
  create(el, opts) {
    const parent = el.parentElement || el;
    const strength = opts.strength ?? 0.4;
    const radius = opts.radius ?? 100;
    const ease = opts.ease ?? 0.15;
    const restore = snapshotInlineStyles(el, ['transform', 'willChange']);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let active = false;
    let alive = true;
    let rafId = null;

    el.style.willChange = 'transform';

    const loop = () => {
      if (!alive) return;
      currentX = lerp(currentX, targetX, ease);
      currentY = lerp(currentY, targetY, ease);
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      const moving = Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1;
      if (active || moving) rafId = requestAnimationFrame(loop);
      else rafId = null;
    };

    const ensureLoop = () => {
      if (rafId == null && alive) rafId = requestAnimationFrame(loop);
    };

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(x, y);
      if (distance <= radius * 1.5) {
        active = true;
        targetX = x * strength;
        targetY = y * strength;
        ensureLoop();
      } else {
        active = false;
        targetX = 0;
        targetY = 0;
        ensureLoop();
      }
    };

    const onLeave = () => {
      active = false;
      targetX = 0;
      targetY = 0;
      ensureLoop();
    };

    parent.addEventListener('pointermove', onMove, { passive: true });
    parent.addEventListener('pointerleave', onLeave);

    return {
      el,
      type: 'magnetic',
      pause: () => {
        alive = false;
        if (rafId != null) cancelAnimationFrame(rafId);
        rafId = null;
      },
      resume: () => {
        if (!alive) {
          alive = true;
          ensureLoop();
        }
      },
      destroy: () => {
        alive = false;
        if (rafId != null) cancelAnimationFrame(rafId);
        parent.removeEventListener('pointermove', onMove);
        parent.removeEventListener('pointerleave', onLeave);
        restore();
      }
    };
  },
  reduced() {},
  fallback(el, opts) {
    return this.create(el, opts);
  }
};
