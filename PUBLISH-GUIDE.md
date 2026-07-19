# 배포 가이드 (GitHub · GitHub Pages · CDN · npm)

이 문서는 Git을 몰라도 따라 할 수 있도록, GitHub 웹사이트에서 파일을 직접 올리는 방식을 기준으로 설명합니다. 터미널을 쓰는 방식(그리고 npm 배포)은 `VSCODE-GUIDE.md`에 정리해 두었습니다.

배포 순서는 다음과 같습니다.

1. GitHub 저장소에 파일 올리기
2. 저장소 정보(Description·Website·Topics) 채우기
3. GitHub Pages로 데모 공개
4. CDN으로 불러쓰기 (jsDelivr)
5. (선택) npm 패키지 배포

---

## 0. 미리 확인할 값

- GitHub 사용자: `catgarret`
- 저장소 이름: `motionKit`
- 저장소 주소: `https://github.com/catgarret/motionKit`
- 데모 주소(예정): `https://git.dongri.me/example/motionKit`
- npm 패키지 이름: `@dong-gri/motionkit`

---

## 1. GitHub에 파일 올리기 (웹, Git 불필요)

### 1-1. 저장소 만들기

1. `https://github.com/new` 접속
2. Repository name: `motionKit`
3. Public 선택
4. "Add a README file" 등은 **체크하지 않음** (우리가 직접 올립니다)
5. Create repository

### 1-2. 파일 업로드

저장소 페이지에서 `Add file` → `Upload files`를 누르고, 아래 "올릴 항목"을 폴더째 드래그해서 올립니다. 폴더 구조가 그대로 유지되도록 **폴더 자체를 드래그**하세요.

> 참고: 웹 업로드는 `.gitignore`가 적용되지 않습니다. 아래 "올리지 말 것"을 직접 빼고 올려야 합니다. 특히 `node_modules`는 절대 올리지 마세요(용량이 매우 크고 불필요).

#### 올릴 항목

폴더

- `dist/` (CDN·npm이 실제로 불러쓰는 결과물)
- `src/`
- `demo/`
- `docs/`
- `examples/`
- `scripts/`
- `tests/`

파일

- `logo.svg`
- `package.json`, `package-lock.json`
- `vite.config.js`, `vite.config.umd.js`, `eslint.config.js`
- `.gitignore`
- `README.md`, `README.en.md`, `README.jp.md`
- `LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`
- `FEATURE_CONTRACT.md`, `OWNER_REQUIREMENTS.md`, `ARCHITECTURE.md`
- `motionkit.features.json`, `motionkit.features.schema.json`, `motionkit.requirements.json`
- (선택) `AGENTS.md`, `CONTEXT.md`, `QA_REPORT.md`, `STABILIZATION_REPORT.md` — 내부 기록 문서입니다. 공개가 부담되면 올리지 않아도 됩니다.

#### 올리지 말 것

- `node_modules/` (필수 제외)
- `.DS_Store`
- `*.tgz`, `*.log`

업로드 후 아래 "Commit changes"에 간단히 `Initial upload`라고 적고 커밋합니다.

---

## 2. 저장소 정보 채우기 (English)

저장소 메인 페이지 오른쪽 상단의 톱니바퀴(About 옆) 또는 `Edit repository details`에서 아래 값을 붙여넣습니다.

**Description**

```
Configurable web interaction toolkit — 34 motion, media, scroll, loader, and text modules driven by data-mk-* attributes or a JavaScript API. Zero required dependencies.
```

**Website**

```
https://git.dongri.me/example/motionKit
```

**Topics** (공백으로 구분)

```
javascript animation motion interaction scroll parallax cursor lightbox marquee counter typewriter text-effect reveal web-animation vanilla-js ui frontend library
```

**Include in the home page** — `Releases`, `Packages`, `Deployments` 체크 여부는 취향입니다. 데모 링크가 이미 Website에 들어가므로 그대로 두어도 됩니다.

---

## 3. GitHub Pages로 데모 공개

1. 저장소 → `Settings` → 왼쪽 메뉴 `Pages`
2. `Build and deployment` → `Source`를 `Deploy from a branch`로 선택
3. `Branch`를 `main` / 폴더는 `/ (root)`로 선택 후 `Save`
4. 1~2분 뒤 상단에 게시 주소가 뜹니다. 데모는 아래 주소로 열립니다.

```
https://git.dongri.me/example/motionKit
```

데모가 `../dist/...` 상대경로로 라이브러리를 불러오므로, `dist/` 폴더를 함께 올렸다면 그대로 동작합니다.

---

## 4. CDN으로 불러쓰기

### 4-1. GitHub만으로 즉시 (npm 배포 불필요)

jsDelivr는 GitHub 저장소를 그대로 CDN으로 서빙합니다. 위 1번까지 마쳤다면 바로 사용할 수 있습니다.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/catgarret/motionKit@main/dist/motionkit.min.css">
<script src="https://cdn.jsdelivr.net/gh/catgarret/motionKit@main/dist/motionkit.umd.min.js"></script>
<script>
  MotionKit.autoInit();
</script>
```

버전 고정이 필요하면 `@main` 대신 태그(예: `@v0.8.0`)를 씁니다. 캐시 때문에 갱신이 늦으면 `@latest` 대신 커밋 해시나 태그를 쓰는 편이 안정적입니다.

### 4-2. npm 배포 후 (권장 CDN 경로)

5번에서 npm에 배포하면 아래 주소가 활성화됩니다.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dong-gri/motionkit/dist/motionkit.min.css">
<script src="https://cdn.jsdelivr.net/npm/@dong-gri/motionkit/dist/motionkit.umd.min.js"></script>
```

unpkg도 동일하게 동작합니다.

```html
<script src="https://unpkg.com/@dong-gri/motionkit/dist/motionkit.umd.min.js"></script>
```

---

## 5. npm 패키지 배포 (선택)

npm 배포는 터미널이 필요합니다. 자세한 단계는 `VSCODE-GUIDE.md`의 "npm 배포" 절을 참고하세요. 요약하면 다음과 같습니다.

```bash
npm login
npm run verify          # 빌드·테스트·계약 검증까지 한 번에
npm publish --access public
```

이 패키지는 스코프 패키지(`@dong-gri/...`)라서, 무료 계정에서 공개 배포하려면 반드시 `--access public`이 필요합니다. `package.json`에 이미 `publishConfig.access: public`을 넣어 두었으므로 옵션 없이 `npm publish`만 해도 공개로 올라갑니다.

배포 후 확인:

```
https://www.npmjs.com/package/@dong-gri/motionkit
```

---

## 6. 업데이트할 때

1. 코드를 수정하고 `npm run build`로 `dist/`를 다시 생성
2. 변경된 파일을 GitHub에 다시 업로드(웹) 또는 커밋·푸시(VSCode)
3. npm에도 반영하려면 `package.json`의 `version`을 올린 뒤(예: 0.8.0 → 0.8.1) `npm publish`

버전 규칙(Semantic Versioning): 버그 수정은 패치(0.0.x), 기능 추가는 마이너(0.x.0), 호환성이 깨지는 변경은 메이저(x.0.0)를 올립니다.
