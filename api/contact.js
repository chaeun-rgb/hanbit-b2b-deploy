// Vercel Serverless Function — 기업교육 상담 신청 API
// POST /api/contact 로 호출
// 동일한 Google Apps Script로 전송 (lead.js와 동일 시트)

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxf2r3fDEgv1eXUGCUid0GBulPuVeF0q8X9NOSnF-r3WZVsCC3m6h-FZdmMaKv3EUb4sQ/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { company, name, contact, interest, headcount, timing, message, timestamp } = req.body || {};

  if (!company || !name || !contact) {
    return res.status(400).json({ error: 'company, name, contact are required' });
  }

  const contactData = {
    type: '상담신청',
    company,
    name,
    contact,
    interest: interest || '-',
    headcount: headcount || '-',
    timing: timing || '-',
    message: message || '-',
    timestamp: timestamp || new Date().toISOString(),
  };

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    console.log('=== CONTACT FORM SUBMITTED ===', JSON.stringify(contactData));
  } catch (err) {
    console.error('Google Sheet 전송 실패:', err.message);
  }

  return res.status(200).json({
    success: true,
    message: '상담 신청이 정상적으로 접수되었습니다.',
  });
}
