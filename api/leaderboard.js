// Classifica Top 10 MENSILE – funzione serverless Vercel (Node) + Upstash Redis
// Ogni mese ha la sua classifica (chiave capone:lb:AAAA-MM, mese secondo l'ora italiana):
// il 1° del mese si riparte da zero da soli, senza fare nulla.
//
// GET  /api/leaderboard              -> top 10 del mese corrente  [{name,score,level,ts}, ...]
// GET  /api/leaderboard?month=2026-11 -> top 10 di un mese passato
// POST /api/leaderboard {name,score,level} -> salva nel mese corrente e restituisce la top 10
// L'header di risposta X-Lb-Month dice di quale mese è la classifica (es. 2026-11).
const { Redis } = require('@upstash/redis');

const PREFIX = 'capone:lb:';
const TZ = 'Europe/Rome';
const MAX_SCORE = 100000;   // tetto di sicurezza: scarta punteggi assurdi
const KEEP = 100;           // quante voci tenere per ogni mese

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

function currentMonth() {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit' }).formatToParts(new Date());
  return p.find((x) => x.type === 'year').value + '-' + p.find((x) => x.type === 'month').value;
}

async function top10(month) {
  const raw = await db().zrange(PREFIX + month, 0, 9, { rev: true });
  return raw.map((m) => (typeof m === 'string' ? JSON.parse(m) : m));
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const q = req.query && req.query.month;
      const month = typeof q === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(q) ? q : currentMonth();
      res.setHeader('X-Lb-Month', month);
      return res.status(200).json(await top10(month));
    }
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const name = String(b.name || 'CAPONE').toUpperCase().replace(/[^A-Z0-9 ÀÈÉÌÒÙ'\-]/g, '').trim().slice(0, 12) || 'CAPONE';
      const score = Math.floor(Number(b.score));
      const level = Math.floor(Number(b.level));
      if (!Number.isFinite(score) || score < 1 || score > MAX_SCORE || !Number.isFinite(level) || level < 1 || level > 200) {
        return res.status(400).json({ error: 'dati non validi' });
      }
      const month = currentMonth();
      const entry = { name, score, level, ts: Date.now() };
      await db().zadd(PREFIX + month, { score, member: JSON.stringify(entry) });
      await db().zremrangebyrank(PREFIX + month, 0, -(KEEP + 1)); // tiene solo le migliori del mese
      res.setHeader('X-Lb-Month', month);
      return res.status(200).json(await top10(month));
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'metodo non consentito' });
  } catch (e) {
    return res.status(500).json({ error: 'errore server' });
  }
};
