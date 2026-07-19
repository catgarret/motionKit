import { G, ST, snapshotInlineStyles } from '../utils.js';

export default {
  create(el, opts) {
    const gsap = G();
    const scrollTrigger = ST();
    if (!gsap || !scrollTrigger) return this.fallback(el, opts);

    const restore = snapshotInlineStyles(el, ['transform', 'willChange']);
    const speed = opts.speed ?? 0.5;
    const axis = opts.axis || 'y';
    const distance = (opts.distance ?? 200) * Math.abs(speed);
    const from = { [axis]: speed < 0 ? distance : -distance };
    const to = {
      [axis]: speed < 0 ? -distance : distance,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: opts.start || 'top bottom',
        end: opts.end || 'bottom top',
        scrub: opts.scrub ?? true,
        invalidateOnRefresh: true,
        onUpdate: opts.onUpdate ? (self) => opts.onUpdate(self.progress, el, self) : undefined
      }
    };

    el.style.willChange = 'transform';
    const tween = gsap.fromTo(el, from, to);
    return {
      el,
      type: 'parallax',
      pause: () => tween.pause(),
      resume: () => tween.resume(),
      destroy: () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        restore();
      }
    };
  },

  reduced(el) {
    const restore = snapshotInlineStyles(el, ['transform']);
    const gsap = G();
    if (gsap) gsap.set(el, { x: 0, y: 0 });
    else el.style.transform = 'none';
    return { el, type: 'parallax', pause() {}, resume() {}, destroy: restore };
  },

  fallback(el) {
    const restore = snapshotInlineStyles(el, ['transform']);
    el.style.transform = 'none';
    return {
      el,
      type: 'parallax',
      pause() {},
      resume() {},
      destroy() { restore(); }
    };
  }
};
