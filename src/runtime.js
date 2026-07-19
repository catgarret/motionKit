import gsapPackage from 'gsap';
import ScrollTriggerPackage from 'gsap/ScrollTrigger.js';

const resolveDefault = (value) => value?.default || value?.gsap || value;

let gsapInstance = resolveDefault(gsapPackage);
let scrollTriggerInstance = resolveDefault(ScrollTriggerPackage);

function registerScrollTrigger() {
  if (!gsapInstance || !scrollTriggerInstance || typeof gsapInstance.registerPlugin !== 'function') return;
  try {
    gsapInstance.registerPlugin(scrollTriggerInstance);
  } catch (_error) {
    // GSAP safely ignores duplicate registrations in browsers. Some SSR/test
    // environments can still throw, so registration remains best-effort.
  }
}

registerScrollTrigger();

export function setAnimationEngine({ gsap, ScrollTrigger } = {}) {
  if (gsap) gsapInstance = resolveDefault(gsap);
  if (ScrollTrigger) scrollTriggerInstance = resolveDefault(ScrollTrigger);
  registerScrollTrigger();
}

export function getGSAP() {
  if (gsapInstance) return gsapInstance;
  if (typeof window !== 'undefined') return window.gsap || null;
  return null;
}

export function getScrollTrigger() {
  if (scrollTriggerInstance) return scrollTriggerInstance;
  if (typeof window !== 'undefined') return window.ScrollTrigger || null;
  return null;
}
