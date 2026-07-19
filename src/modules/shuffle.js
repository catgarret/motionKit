import { observeOnce, scramblePainter, segmentText, snapshotAttributes } from '../utils.js';

function randomChar(chars, fallback) {
  if (!chars.length) return fallback;
  return chars[Math.floor(Math.random() * chars.length)] || fallback;
}

export default {
  create(el, opts) {
    const finalText = opts.text ?? el.textContent ?? '';
    const originalHTML = el.innerHTML;
    const restoreAttributes = snapshotAttributes(el, ['aria-label']);
    const chars = String(opts.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*');
    const speed = Math.max(12, Number(opts.speed ?? 34));
    const revealRate = Math.max(1, Number(opts.revealRate ?? 2));
    // Optional scramble styling: rainbow colors, an algorithmic palette range
    // (rainbowColors), or brightness-only flicker (scrambleFade).
    const painter = scramblePainter({
      rainbow: opts.rainbow,
      rainbowColors: opts.rainbowColors,
      scrambleFade: opts.scrambleFade
    });
    const graphemes = segmentText(finalText);
    let revealed = 0;
    let tick = 0;
    let alive = true;
    let running = false;
    let timer = null;
    let observer = null;

    el.setAttribute('aria-label', finalText);

    // Each grapheme lives in a fixed-width span so scrambled characters can
    // never change line wrapping (two-line text used to collapse mid-run).
    let cells = [];
    const buildCells = () => {
      el.innerHTML = '';
      cells = graphemes.map((char) => {
        if (/^\s$/.test(char)) {
          el.appendChild(document.createTextNode(char));
          return null;
        }
        const span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.style.cssText = 'display:inline-block;text-align:center;';
        span.textContent = char;
        el.appendChild(span);
        return span;
      });
      // Lock each cell to the width of its final character.
      cells.forEach((span) => {
        if (span) span.style.width = `${Math.ceil(span.getBoundingClientRect().width * 100) / 100}px`;
      });
      return cells;
    };

    const render = () => {
      cells.forEach((span, index) => {
        if (!span) return;
        if (index < revealed) {
          span.textContent = graphemes[index];
          painter?.clear(span);
        } else {
          span.textContent = randomChar(chars, graphemes[index]);
          painter?.paint(span);
        }
      });
    };

    const finish = () => {
      running = false;
      cells.forEach((span, index) => {
        if (!span) return;
        span.textContent = graphemes[index];
        painter?.clear(span);
      });
      opts.onComplete?.(el);
    };

    const step = () => {
      if (!alive || !running) return;
      render();
      tick += 1;
      if (tick % revealRate === 0) revealed += 1;
      if (revealed >= graphemes.length) {
        finish();
        return;
      }
      timer = setTimeout(step, speed);
    };

    const start = () => {
      clearTimeout(timer);
      revealed = 0;
      tick = 0;
      alive = true;
      running = true;
      buildCells();
      render();
      timer = setTimeout(step, speed);
    };

    observer = observeOnce(el, start, { threshold: Number(opts.threshold ?? 0.2), rootMargin: opts.rootMargin || '0px 0px -5% 0px' });

    return {
      el,
      type: 'shuffle',
      replay: start,
      pause: () => { alive = false; clearTimeout(timer); },
      resume: () => {
        if (alive || !running) return;
        alive = true;
        step();
      },
      destroy: () => {
        alive = false;
        running = false;
        clearTimeout(timer);
        observer?.disconnect();
        el.innerHTML = originalHTML;
        restoreAttributes();
      }
    };
  },
  reduced(el) {
    el.textContent = el.getAttribute('aria-label') || el.textContent;
  }
};
