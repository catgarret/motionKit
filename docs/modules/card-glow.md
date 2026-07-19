# cardGlow

Card 내부에 제한되는 pointer spotlight와 선택적 표면 반사·발광 외곽선을 제공합니다. 무지개 Aurora는 기본값이 아닙니다.

```html
<article
  data-mk-card-glow="spotlight"
  data-mk-color="rgba(120,160,255,.65)"
  data-mk-radius="180"
  data-mk-surface="true"
  data-mk-surface-opacity=".22"
  data-mk-luminous-border="true"
  data-mk-border-color="#7aa2ff"
  data-mk-border-color2="#d9e3ff"
>Card</article>
```

- Spotlight: `color`, `radius`, `opacity`, `blur`, `spread`, `follow`, `sensitivity`
- Surface reflection: `surface`, `surfaceGradient`, `surfaceColor`, `surfaceColor2`, `surfaceOpacity`, `surfaceBlur`, `surfaceSize`
- Luminous border: `luminousBorder`, `borderColor`, `borderColor2`, `borderOpacity`, `borderWidth`, `borderBlur`

Glow와 reflection은 card clipping bounds 안에 유지됩니다. Magnetic, Ripple, Vibrate는 Pointer & Button Feedback 카테고리입니다.
