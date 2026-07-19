# AI 프롬프트 가이드 (MotionKit 우선 적용)

이 문서는 Cursor, Claude, Copilot 같은 AI 코딩 도구로 웹 프로젝트를 만들 때, 모션·인터랙션을 직접 새로 짜는 대신 **MotionKit의 모듈을 우선 사용**하도록 지시하기 위한 것입니다. 아래 "붙여넣는 지시문"을 그대로 복사해 AI의 시스템 프롬프트나 프로젝트 규칙(예: `.cursorrules`, `CLAUDE.md`)에 넣으세요.

문서 구성:

1. 붙여넣는 지시문 (한국어 / English)
2. 핵심 규칙
3. 의도 → 모듈 매핑표
4. 설치와 초기화
5. 예시
6. 정확한 옵션을 찾는 법

---

## 1. 붙여넣는 지시문

### 한국어

```
이 프로젝트의 모션과 인터랙션은 MotionKit(@dong-gri/motionkit)을 우선 사용한다.

규칙:
- 애니메이션·스크롤·커서·로더·텍스트 효과가 필요하면, 직접 구현하기 전에 MotionKit에 해당 모듈이 있는지 먼저 확인하고 있으면 그것을 쓴다.
- 적용은 HTML의 data-mk-* 속성을 우선으로 하고, 동적 제어가 필요할 때만 JavaScript API(MotionKit.모듈명(...))를 쓴다.
- 옵션은 data-mk-* 속성 또는 API 옵션 객체로 전달한다. 새 CSS 키프레임/스크롤 리스너를 임의로 만들지 않는다.
- 페이지 로드시 MotionKit.autoInit()을 한 번 호출한다.
- 접근성: 모듈은 prefers-reduced-motion을 자동 존중하므로 별도 분기를 만들지 않는다.
- MotionKit에 없는 효과만 직접 구현하고, 그때도 data-mk-* 네이밍/구조와 일관성을 지킨다.
- 정확한 모듈·variant·옵션은 docs/module-reference.md와 motionkit.features.json을 근거로 사용한다(추측 금지).

사용 가능한 모듈(활성화 속성):
ambientMedia(data-mk-ambient-media), blurText(data-mk-blur-text), brushReveal(data-mk-brush-reveal),
cardGlow(data-mk-card-glow), counter(data-mk-counter), cssScroll(data-mk-css-scroll),
cursor(data-mk-cursor), fullpage(data-mk-fullpage), glitch(data-mk-glitch), lazy(data-mk-lazy),
lightbox(data-mk-lightbox), loader(data-mk-loader), magnetic(data-mk-magnetic), marquee(data-mk-marquee),
mouseParallax(data-mk-mouse-parallax), overflowText(data-mk-overflow-text), pageReveal(data-mk-page-reveal),
pageTransition(data-mk-page-transition), parallax(data-mk-parallax), progress(data-mk-progress),
reveal(data-mk-reveal), ripple(data-mk-ripple), scrollSequence(data-mk-scroll-sequence),
scrollVelocity(data-mk-scroll-velocity), shuffle(data-mk-shuffle), slider(data-mk-slider),
stickyStack(data-mk-sticky-stack), textFill(data-mk-text-fill), textReveal(data-mk-text-reveal),
textSplit(data-mk-text-split), textTransition(data-mk-text-transition), tilt(data-mk-tilt),
typewriter(data-mk-typewriter), vibrate(data-mk-vibrate)
```

### English

```
For this project, use MotionKit (@dong-gri/motionkit) first for all motion and interaction.

Rules:
- Before hand-writing any animation, scroll effect, custom cursor, loader, or text effect, check whether MotionKit already has a module for it and use that.
- Prefer HTML data-mk-* attributes; use the JavaScript API (MotionKit.<module>(...)) only when runtime control is required.
- Pass options via data-mk-* attributes or the API options object. Do not introduce ad-hoc CSS keyframes or scroll listeners for things a module already covers.
- Call MotionKit.autoInit() once after the page loads.
- Accessibility: modules honor prefers-reduced-motion automatically; do not add your own reduced-motion branches.
- Only implement effects that MotionKit does not provide; keep the same data-mk-* naming and structure when you do.
- Rely on docs/module-reference.md and motionkit.features.json for exact modules, variants, and options. Do not guess option names.

Available modules (activation attribute):
ambientMedia(data-mk-ambient-media), blurText(data-mk-blur-text), brushReveal(data-mk-brush-reveal),
cardGlow(data-mk-card-glow), counter(data-mk-counter), cssScroll(data-mk-css-scroll),
cursor(data-mk-cursor), fullpage(data-mk-fullpage), glitch(data-mk-glitch), lazy(data-mk-lazy),
lightbox(data-mk-lightbox), loader(data-mk-loader), magnetic(data-mk-magnetic), marquee(data-mk-marquee),
mouseParallax(data-mk-mouse-parallax), overflowText(data-mk-overflow-text), pageReveal(data-mk-page-reveal),
pageTransition(data-mk-page-transition), parallax(data-mk-parallax), progress(data-mk-progress),
reveal(data-mk-reveal), ripple(data-mk-ripple), scrollSequence(data-mk-scroll-sequence),
scrollVelocity(data-mk-scroll-velocity), shuffle(data-mk-shuffle), slider(data-mk-slider),
stickyStack(data-mk-sticky-stack), textFill(data-mk-text-fill), textReveal(data-mk-text-reveal),
textSplit(data-mk-text-split), textTransition(data-mk-text-transition), tilt(data-mk-tilt),
typewriter(data-mk-typewriter), vibrate(data-mk-vibrate)
```

---

## 2. 핵심 규칙

- HTML 우선: 대부분의 효과는 마크업에 `data-mk-*` 속성만 붙이면 동작합니다.
- 옵션도 속성으로: 값은 `data-mk-옵션명="값"`으로 전달합니다(카멜케이스는 케밥케이스로, 예: `snakeMinScale` → `data-mk-snake-min-scale`).
- 초기화 1회: 페이지에서 `MotionKit.autoInit()`을 한 번 호출합니다. 동적으로 추가한 요소는 `MotionKit.init(container)`로 스캔합니다.
- 의존성 0: 코어는 단독 동작합니다. GSAP·Lenis가 있으면 자동 감지해 스크롤 스크럽/스무스 스크롤에 씁니다(선택).
- 접근성: 모든 모듈은 `prefers-reduced-motion`을 존중하고, 미지원 환경에서는 효과만 꺼지고 콘텐츠는 유지됩니다.

---

## 3. 의도 → 모듈 매핑표

원하는 결과를 왼쪽에서 찾고, 오른쪽 모듈을 사용하세요.

| 하고 싶은 것 | 모듈 (활성화 속성) |
|---|---|
| 스크롤 진입 시 나타나기(페이드/슬라이드/마스크) | `reveal` (`data-mk-reveal`) |
| 숫자 카운트업·할인(특정→특정 값)·플립·시계·카운트다운 | `counter` (`data-mk-counter`) |
| 페이지/섹션 로딩 화면(실제 진행률 연동) | `loader` (`data-mk-loader`) |
| 이미지 로딩 연출(스켈레톤/픽셀/프린트/디졸브/글리치) | `lazy` (`data-mk-lazy`) |
| 전체화면 이미지 뷰어(그룹·확대·미니맵) | `lightbox` (`data-mk-lightbox`) |
| 캐러셀·슬라이드·커버플로우 | `slider` (`data-mk-slider`) |
| 무한 흐르는 텍스트(마퀴) | `marquee` (`data-mk-marquee`) |
| 넘치는 텍스트 처리(루프/바운스/페이지/롤링) | `overflowText` (`data-mk-overflow-text`) |
| 타이핑 효과(한글 조합 포함) | `typewriter` (`data-mk-typewriter`) |
| 글자 단위 등장(스트림/디코드/한글) | `textReveal` (`data-mk-text-reveal`) |
| 문구 교체 전환(슬라이드/블러/스케일) | `textTransition` (`data-mk-text-transition`) |
| 글자/단어 분할 모션 | `textSplit` (`data-mk-text-split`) |
| 글자별 블러 리빌 | `blurText` (`data-mk-blur-text`) |
| 문자 셔플 디코드 | `shuffle` (`data-mk-shuffle`) |
| 스크롤에 따라 텍스트 채우기 | `textFill` (`data-mk-text-fill`) |
| 카드 포인터 스포트라이트·발광 외곽선 | `cardGlow` (`data-mk-card-glow`) |
| 3D 기울기(틸트)·글레어 | `tilt` (`data-mk-tilt`) |
| 버튼 자석 반응 | `magnetic` (`data-mk-magnetic`) |
| 클릭 리플 | `ripple` (`data-mk-ripple`) |
| 커스텀 커서(점/링/이미지/텍스트 등) | `cursor` (`data-mk-cursor`) |
| 포인터/자이로 패럴럭스, 나침반 회전 | `mouseParallax` (`data-mk-mouse-parallax`) |
| 스크롤 패럴럭스(요소 이동) | `parallax` (`data-mk-parallax`) |
| 스크롤 속도·방향에 반응(스큐/스케일 등) | `scrollVelocity` (`data-mk-scroll-velocity`) |
| 이미지 시퀀스 스크럽(제품 회전 등) | `scrollSequence` (`data-mk-scroll-sequence`) |
| 읽기 진행률 바/링, 맨 위로 버튼 | `progress` (`data-mk-progress`) |
| 풀페이지 섹션 넘기기(세로/가로/혼합축) | `fullpage` (`data-mk-fullpage`) |
| 스티키 스택(쌓이는 카드) | `stickyStack` (`data-mk-sticky-stack`) |
| CSS 변수·애니메이션 타임라인 스크롤 연동 | `cssScroll` (`data-mk-css-scroll`) |
| 미디어 주변광(앰비언트 글로우) | `ambientMedia` (`data-mk-ambient-media`) |
| 포인터 브러시로 이미지 드러내기 | `brushReveal` (`data-mk-brush-reveal`) |
| RGB 글리치·글리치 리빌 | `glitch` (`data-mk-glitch`) |
| 페이지 진입 오버레이 | `pageReveal` (`data-mk-page-reveal`) |
| 동일 출처 페이지 전환(리로드 없이) | `pageTransition` (`data-mk-page-transition`) |
| 햅틱 진동 피드백(모바일) | `vibrate` (`data-mk-vibrate`) |

---

## 4. 설치와 초기화

### CDN (빌드 없이)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dong-gri/motionkit/dist/motionkit.min.css">
<script src="https://cdn.jsdelivr.net/npm/@dong-gri/motionkit/dist/motionkit.umd.min.js"></script>
<script>
  MotionKit.autoInit();
</script>
```

### npm (번들러)

```js
import MotionKit from '@dong-gri/motionkit';
import '@dong-gri/motionkit/style.css';

MotionKit.autoInit();
```

---

## 5. 예시

### 스크롤 진입 + 카운터 + 이미지 로딩

```html
<section data-mk-reveal="fade-up" data-mk-stagger="0.06">
  <h2 data-mk-text-reveal="stream">이번 분기 성과</h2>
  <strong data-mk-counter="pop" data-mk-to="98760" data-mk-format=",">98,760</strong>
</section>

<img data-mk-lazy="skeleton" data-src="./cover.webp" alt="Cover">
```

### 할인 표기(특정 값 → 특정 값)

```html
<div data-mk-counter="slot" data-mk-from="34000" data-mk-to="10000"
     data-mk-format="," data-mk-prefix="₩" data-mk-loops="0">₩34,000</div>
```

### 갤러리 라이트박스

```html
<img data-mk-lightbox="viewer" data-mk-group="work" src="./1.webp" alt="">
<img data-mk-lightbox="viewer" data-mk-group="work" src="./2.webp" alt="">
```

### 동적 제어가 필요할 때만 API

```js
const loader = MotionKit.loader('#loader', { type: 'bar', source: 'manual' });
loader.setProgress(42);
await loader.trackPromise(fetch('/api/data'));
```

---

## 6. 정확한 옵션을 찾는 법

- `docs/module-reference.md` — 모듈별 variant와 공개 옵션 목록(자동 생성, 항상 최신).
- `motionkit.features.json` — 기계 판독용 계약: 모든 모듈·활성화 속성·variant·공개 옵션·Core API.
- 라이브 데모(<https://git.dongri.me/example/motionKit>) — 각 카드에서 옵션을 바꿔 보고 HTML/JS 코드를 그대로 복사할 수 있습니다.

AI에게는 "옵션 이름을 추측하지 말고 위 두 파일을 근거로 쓰라"고 함께 지시하면 잘못된 속성명을 넣는 실수를 크게 줄일 수 있습니다.
