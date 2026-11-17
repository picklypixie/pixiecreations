# PixieFits — 사이트

App Store 제출·운영에 필요한 **개인정보 처리방침 URL**과 **지원 URL**, 그리고 앱 소개 페이지입니다.
빌드 과정이 없습니다. GitHub Pages에 그대로 올리면 됩니다.

```
index.html      소개 페이지        → App Store "마케팅 URL"
privacy.html    개인정보 처리방침  → App Store "개인정보 처리방침 URL" (필수)
support.html    고객지원           → App Store "지원 URL" (필수)
terms.html      이용약관 + 커뮤니티 규칙
style.css       스타일
lang.js         영문/한국어 전환 + 스크롤 등장
assets/         logo.png, favicon.svg
commission-factory-*.html   ⚠️ 제휴 네트워크 인증 파일 — 지우지 마세요
.nojekyll       GitHub Pages가 Jekyll로 처리하지 않도록
```

## ⚠️ `commission-factory-*.html` 은 건드리지 마세요

Commission Factory가 사이트 소유권을 확인하는 파일입니다. 루트에서 사라지면 제휴 계정 검증이
깨집니다. 파일명과 내용 모두 그대로 두세요.

## 화면 이미지는 스크린샷이 아니라 목업입니다

앱 UI가 계속 바뀌어서, 지난 스크린샷을 박아두면 금방 실제와 달라집니다. 그래서 폰 화면을
**HTML/CSS로 그렸습니다** (`index.html`의 `.mock` 블록, `style.css` 맨 아래).

- 이미지가 아니라 코드라서 어느 해상도에서도 선명하고, 용량이 거의 없습니다
- UI가 바뀌면 숫자와 글자만 고치면 됩니다
- 푸터에 "실제 스크린샷이 아니라 앱을 묘사한 이미지"라고 명시해 뒀습니다 — 정확하지 않은
  화면을 스크린샷인 것처럼 보이게 두면 안 되니까요

실제 스크린샷을 쓰고 싶어지면 `.mock` 블록을 `<img>`로 바꾸고 푸터의 해당 문장을 지우면 됩니다.

## 배포

```bash
cd site
git init
git add .
git commit -m "PixieFits site"
git branch -M main
git remote add origin https://github.com/<아이디>/<저장소>.git
git push -u origin main
```

GitHub → **Settings → Pages** → Source `Deploy from a branch`, Branch `main` / `/(root)`.

```
https://<아이디>.github.io/<저장소>/privacy.html   ← 개인정보 처리방침 URL
https://<아이디>.github.io/<저장소>/support.html   ← 지원 URL
```

## 처리방침이 실제 코드와 맞춰져 있습니다

템플릿이 아니라 `pickly-fresh/src`를 읽고 쓴 것입니다.

| 문서에 적힌 것 | 실제 |
|---|---|
| 사진 분석은 기기에서 | TensorFlow.js BodyPix + face-landmarks, 서버 전송 없음 |
| 피부 스캔 사진 저장 | Storage `skin/{uid}/{분석ID}.jpg` |
| 신체 치수·실루엣 | `users/{uid}`, 체형 계산은 온디바이스 |
| 커뮤니티는 공개 | `outfits`, 댓글, `reports` |
| 앱 이용 측정 | `analytics_events` (약 40종) + Google Analytics for Firebase |
| 구독 | RevenueCat + Apple |
| 날씨 | Open-Meteo |
| **제휴 수수료** | `lib/openExternal.ts` 의 Amazon 태그 `pixiefits-20` |

마지막 항목이 특히 중요합니다. **제휴 수수료는 공시 의무가 있는데** 기존 사이트에는 없었습니다.
지금은 푸터와 처리방침·약관 세 곳에 들어가 있습니다.

앱에서 저장 위치나 제휴 프로그램이 바뀌면 **이 문서도 같이 고쳐야 합니다.**

## 연락처

`pixiefitscs@gmail.com` — 세 문서에 들어 있고, 소스에는 HTML 엔티티로 인코딩돼 있습니다
(사람과 브라우저엔 평범한 `mailto:` 링크, 단순한 주소 수집 크롤러는 지나감).
바꾸실 때는 `mailto:` 를 검색하세요.

## 로컬 미리보기

```bash
cd site && python3 -m http.server 8000
```
