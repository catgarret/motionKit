# Module Catalog

공개 모듈은 정확히 **32개**입니다. 각 모듈은 `MotionKit.<name>(target, options)`와 대응하는 `data-mk-*` 활성화 속성을 제공합니다.

| 모듈 | 속성 | 핵심 역할 |
|---|---|---|
| `parallax` | `data-mk-parallax` | X/Y scroll parallax |
| `mouseParallax` | `data-mk-mouse-parallax` | pointer/gyro movement |
| `reveal` | `data-mk-reveal` | viewport content entrance |
| `counter` | `data-mk-counter` | slot/plain/digit/final-value pop |
| `lazy` | `data-mk-lazy` | image loading/reveal effects |
| `textSplit` | `data-mk-text-split` | character/word split motion |
| `blurText` | `data-mk-blur-text` | blur text reveal |
| `shuffle` | `data-mk-shuffle` | replayable decode |
| `typewriter` | `data-mk-typewriter` | type/erase loop |
| `textReveal` | `data-mk-text-reveal` | stream/char/word/line/bounce/hangul |
| `textTransition` | `data-mk-text-transition` | measured rotating text/items |
| `magnetic` | `data-mk-magnetic` | magnetic pointer response |
| `ripple` | `data-mk-ripple` | Material click ripple |
| `marquee` | `data-mk-marquee` | loop/hover/scroll response |
| `overflowText` | `data-mk-overflow-text` | loop/bounce/rewind/once/page/rolling |
| `loader` | `data-mk-loader` | overlay/slot/circular/bar loading UI |
| `tilt` | `data-mk-tilt` | 3D tilt/glare |
| `cursor` | `data-mk-cursor` | custom pointer |
| `textFill` | `data-mk-text-fill` | scroll fill |
| `stickyStack` | `data-mk-sticky-stack` | vertical/horizontal/zindex/floating |
| `scrollVelocity` | `data-mk-scroll-velocity` | direction/speed response |
| `progress` | `data-mk-progress` | page/element progress |
| `slider` | `data-mk-slider` | slide/coverflow controls |
| `ambientMedia` | `data-mk-ambient-media` | image clone / video-sampled ambient glow |
| `pageReveal` | `data-mk-page-reveal` | page entrance overlay |
| `glitch` | `data-mk-glitch` | RGB slice/digital glitch |
| `cardGlow` | `data-mk-card-glow` | bounded spotlight and optional variants |
| `lightbox` | `data-mk-lightbox` | full-viewport grouped viewer with zoom/minimap/custom UI |
| `pageTransition` | `data-mk-page-transition` | same-origin document transition |
| `vibrate` | `data-mk-vibrate` | device vibration feedback |
| `cssScroll` | `data-mk-css-scroll` | CSS scroll progress |
| `scrollSequence` | `data-mk-scroll-sequence` | Canvas frame sequence |

## 카테고리 원칙

- Counter와 Loader를 분리합니다. `circular`와 `bar`는 Loader입니다.
- Lazy는 이미지 로드/노출 효과입니다. `slide-up`과 `wipe`는 viewport Reveal입니다.
- Card Interaction은 Card Glow/Tilt, Pointer & Button Feedback은 Magnetic/Ripple/Vibrate/Mouse Parallax입니다.
- 데모는 모든 공개 모듈과 핵심 variant를 확인하는 QA 표면입니다.

정확한 variant와 공개 option은 [`../module-reference.md`](../module-reference.md), 삭제·재해석 금지 동작은 [`../../OWNER_REQUIREMENTS.md`](../../OWNER_REQUIREMENTS.md)를 확인합니다.
