// Vercel serverless function: proxies NEA PSI from data.gov.sg and caches it at the edge.
// Optional: set DATA_GOV_SG_API_KEY in Vercel project settings for higher rate limits.
const UPSTREAM = 'https://api-open.data.gov.sg/v2/real-time/api/psi';

module.exports = async (req, res) => {
  try {
    const headers = {};
    if (process.env.DATA_GOV_SG_API_KEY) headers['x-api-key'] = process.env.DATA_GOV_SG_API_KEY;
    const r = await fetch(UPSTREAM, { headers });
    if (!r.ok) throw new Error('upstream ' + r.status);
    const json = await r.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(json);
  } catch (e) {
    res.status(502).json({ error: 'Could not reach data.gov.sg' });
  }
};
