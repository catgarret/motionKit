# slider

버튼, 키보드, pointer drag, autoplay를 지원하는 slider입니다.

| variant | 동작 |
|---|---|
| `slide` | 일반 수평 slide |
| `coverflow` | 중앙 active slide와 양옆 preview를 depth/rotation/scale로 표시 |

```html
<div data-mk-slider="coverflow" data-mk-gap="24" data-mk-rotate="34" data-mk-depth="120">
  <article class="mk-slide">1</article>
  <article class="mk-slide">2</article>
  <article class="mk-slide">3</article>
</div>
```

`index`는 현재 slide를 반영하는 live getter입니다. 이전/다음 button, ArrowLeft/ArrowRight, drag, hover pause, autoplay, `onChange`를 지원합니다. `destroy()` 후 생성 button/track/style/listener가 남지 않아야 합니다.
