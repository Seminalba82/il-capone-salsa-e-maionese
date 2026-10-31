// Classifica Top 10 – funzione serverless Vercel (Node) + Upstash Redis
// GET  /api/leaderboard            -> [{name,score,level,ts}, ...] (max 10)
// POST /api/leaderboard {name,score,level} -> classifica aggiornata
const { Redis } = require('@upstash/redis');

const KEY = 'capone:lb';
const MAX_SCORE = 100000;   // tetto di sicurezza: scarta punteggi assurdi
const KEEP = 100;           // quante voci tenere nel database

let redis;
function db() {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
    });
  }
  return redis;
}

async function top10() {
  const raw = await db().zrange(KEY, 0, 9, { rev: true });
  return raw.map((m) => (typeof m === 'string' ? JSON.parse(m) : m));
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      return res.status(200).json(await top10());
    }
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const name = String(b.name || 'CAPONE').toUpperCase().replace(/[^A-Z0-9 ÀÈÉÌÒÙ'\-]/g, '').trim().slice(0, 12) || 'CAPONE';
      const score = Math.floor(Number(b.score));
      const level = Math.floor(Number(b.level));
      if (!Number.isFinite(score) || score < 1 || score > MAX_SCORE || !Number.isFinite(level) || level < 1 || level > 200) {
        return res.status(400).json({ error: 'dati non validi' });
      }
      const entry = { name, score, level, ts: Date.now() };
      await db().zadd(KEY, { score, member: JSON.stringify(entry) });
      await db().zremrangebyrank(KEY, 0, -(KEEP + 1)); // tiene solo le migliori
      return res.status(200).json(await top10());
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'metodo non consentito' });
  } catch (e) {
    return res.status(500).json({ error: 'errore server' });
  }
};
