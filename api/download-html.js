import { readFile } from 'node:fs/promises';
import path from 'node:path';

function jsonForScript(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const root = process.cwd();
    const [htmlSource, coursesSource, promoSource] = await Promise.all([
      readFile(path.join(root, 'index.html'), 'utf8'),
      readFile(path.join(root, 'courses-data.json'), 'utf8'),
      readFile(path.join(root, 'promo-config.json'), 'utf8'),
    ]);
    const coursesData = JSON.parse(coursesSource);
    const promoConfig = JSON.parse(promoSource);
    const embeddedData = [
      '<script>',
      `window.__DOWNLOAD_COURSES_DATA__ = ${jsonForScript(coursesData)};`,
      `window.__DOWNLOAD_PROMO_CONFIG__ = ${jsonForScript(promoConfig)};`,
      '</script>',
    ].join('\n');
    const html = htmlSource
      .replace(
        '<script type="text/babel" data-presets="react">',
        `${embeddedData}\n<script type="text/babel" data-presets="react">`
      )
      .replace(
        "fetch('./courses-data.json')",
        "Promise.resolve({ json: async () => window.__DOWNLOAD_COURSES_DATA__ })"
      )
      .replace(
        "fetch('./promo-config.json')",
        "Promise.resolve({ json: async () => window.__DOWNLOAD_PROMO_CONFIG__ })"
      );
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
