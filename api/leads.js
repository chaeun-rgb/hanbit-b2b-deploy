// Vercel Serverless Function — 리드 목록 안내
// GET /api/leads

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    message: '리드 데이터 확인 방법',
    guide: [
      '1. Vercel Dashboard (https://vercel.com) 로그인',
      '2. hanbit-b2b-deploy 프로젝트 선택',
      '3. Deployments > 최신 배포 클릭',
      '4. Functions 탭 > api/lead 클릭',
      '5. Logs에서 "=== NEW LEAD ===" 로 검색',
    ],
    note: '영구 저장이 필요하면 Vercel KV, Supabase, Google Sheets 연동을 추천합니다.'
  });
}
