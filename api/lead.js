// Vercel Serverless Function — 리드 수집 API
// POST /api/lead 로 호출
// 데이터는 Vercel Dashboard > Deployments > Functions > Logs 에서 확인 가능

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxf2r3fDEgv1eXUGCUid0GBulPuVeF0q8X9NOSnF-r3WZVsCC3m6h-FZdmMaKv3EUb4sQ/exec';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { company, name, email, resource, slotId, timestamp } = req.body || {};

  if (!company || !name || !email) {
    return res.status(400).json({ error: 'company, name, email are required' });
  }

  const leadData = {
    company,
    name,
    email,
    resource: resource || '-',
    slotId: slotId || '-',
    timestamp: timestamp || new Date().toISOString(),
  };

  // Google Sheet로 전송
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    console.log('=== LEAD SENT TO GOOGLE SHEET ===', JSON.stringify(leadData));
  } catch (err) {
    console.error('Google Sheet 전송 실패:', err.message);
  }

  return res.status(200).json({
    success: true,
    message: '리드가 정상적으로 접수되었습니다.'
  });
}
