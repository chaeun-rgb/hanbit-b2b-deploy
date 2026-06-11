import { readFile } from 'node:fs/promises';
import path from 'node:path';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'index.html');
    const html = await readFile(filePath);
    const filename = encodeURIComponent('hanbit-b2b-deploy.html');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="hanbit-b2b-deploy.html"; filename*=UTF-8''${filename}`
    );
    res.setHeader('Cache-Control', 'no-store');

    return res.status(200).send(html);
  } catch (error) {
    console.error('HTML download failed:', error);
    return res.status(500).json({ error: 'Failed to prepare HTML download' });
  }
}
