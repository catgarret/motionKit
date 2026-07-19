# Getting Started

## 1. 설치

### npm package / local tarball

```bash
npm install motionkit
# 또는
npm install ./motionkit-0.8.0.tgz
```

```js
import MotionKit from 'motionkit';
import 'motionkit/style.css';

MotionKit.autoInit();
```

### 브라우저 UMD

```html
<link rel="stylesheet" href="../dist/motionkit.css">
<script src="../dist/motionkit.umd.js"></script>
<script>
  MotionKit.autoInit();
</script>
```

UMD bundle은 필요한 runtime dependency를 포함하므로 GSAP·Lenis를 같은 페이지에 중복 로드하지 않습니다.

## 2. 첫 인터랙션

```html
<h1 data-mk-reveal="fade-up">안녕하세요</h1>
<span data-mk-counter="pop" data-mk-to="98760" data-mk-format=",">98,760</span>
<button data-mk-ripple>저장</button>
<img data-mk-lazy="skeleton" data-src="big.webp" data-mk-skeleton-variant="shimmer" alt="Example">
```

```js
const instance = MotionKit.create('reveal', '.hero', { preset: 'slide-up' });
instance?.pause();
instance?.resume();
instance?.replay?.();
instance?.destroy();
```

## 3. 자동 초기화

`MotionKit.autoInit()`은 등록된 **32개 모듈**의 활성화 속성을 스캔합니다. import만으로 자동 실행되지는 않습니다.

```js
MotionKit.scan(document.querySelector('#new-section'));
```

같은 요소와 같은 모듈을 다시 스캔해도 중복 인스턴스를 만들지 않습니다.

## 4. 모듈 조합

```html
<img
  data-mk-lazy="dissolve"
  data-mk-ambient-media="image-clone"
  data-mk-lightbox="viewer"
  data-src="motion-demo.gif"
  data-mk-animated="true"
  data-mk-group="motion"
  alt="Animated media"
>
```

GIF·APNG·animated WebP는 Lazy, Ambient, Lightbox 조합에서도 살아 있는 이미지 요소를 유지합니다.

## 5. 디자이너용 class-only Reveal

```html
<section
  data-mk-reveal="class"
  data-mk-class-only="true"
  data-mk-enter-class="is-visible"
  data-mk-leave-class="is-hidden"
>...</section>
```

MotionKit은 viewport 감지만 담당하고 실제 디자인은 CSS class로 제어할 수 있습니다.

## 6. Loader 진행률

```js
const loader = MotionKit.loader('.loader', { type: 'bar', source: 'manual' });
loader.setProgress(35);
await loader.trackPromise(fetch('/api/bootstrap'));
loader.complete();
```

`source`는 `manual`, `window`, `resources`, `promise`, `fetch`를 지원합니다.

## 7. Smooth Scroll 선택 사용

Smooth Scroll은 기본 비활성화입니다.

```js
MotionKit.enableSmooth({ lerp: 0.08, wheelMultiplier: 1 });
MotionKit.scrollTo('#section-2', { offset: -72 });
MotionKit.disableSmooth();
```

## 8. 설정과 수명주기

```js
MotionKit.config({
  respectReducedMotion: true,
  performance: 'auto',
  debug: false
});

MotionKit.replay('.title', 'shuffle');
MotionKit.destroyModule('.title', 'shuffle');
MotionKit.destroy('#route-container');
MotionKit.destroy();
```

## 9. 다음 문서

- [정확한 Module Reference](module-reference.md)
- [공통 옵션과 데이터 속성](common-options.md)
- [접근성](accessibility.md)
- [기능 계약](../FEATURE_CONTRACT.md)
- [소유자 요구사항](../OWNER_REQUIREMENTS.md)
