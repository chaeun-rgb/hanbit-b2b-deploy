# 한빛+ 기업교육 랜딩페이지

B2B 기업교육 신규 랜딩페이지입니다.

## 미리보기

- GitHub Pages: https://chaeun-rgb.github.io/hanbit-b2b-deploy/
- Vercel: https://hanbit-b2b-deploy.vercel.app/

## 파일 구조

- `index.html` — 단일 HTML 파일 (React CDN + Babel Standalone, 빌드 불필요)
- `api/contact.js` — 미사용 (폼 데이터는 Google Apps Script로 직접 전송)

## 폼 데이터 수집

상담신청 및 자료 다운로드 폼 제출 시 Google Sheets에 자동 저장됩니다.

- **Google Apps Script URL**: `https://script.google.com/macros/s/AKfycbypMwov2ygX9TLyKWh6-rpGBb9HWtEvWs7yUD2giWaXoPnvm-_ALTwgcY7uRHAusaqEBw/exec`
- **Google Sheets**: https://docs.google.com/spreadsheets/d/12FfGCNGTCR3b92rW-64J3n0mXSZyRTFgWlKISqUYHPM/edit
  - `상담신청` 시트: 회사명, 담당자명, 연락처, 관심분야, 예상인원, 희망시기, 추가문의
  - `자료다운로드` 시트 (자료별 탭 분리): 회사명, 담당자명, 연락처, 자료명

## 실서버 반영 시 주의사항

- 단일 `index.html` 파일이므로 정적 파일 서빙만 하면 됩니다.
- 별도 빌드 과정 없음.
- CORS 이슈 없음 (폼 데이터는 Google Apps Script GET 요청으로 처리).
- 외부 CDN 의존: React 18, Babel Standalone, Pretendard 폰트
