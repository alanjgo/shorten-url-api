 
 // Définition des headers CORS
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

export default async function handler(req, res) {
  // Applique les headers CORS à toutes les réponses
  Object.entries(CORS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Réponse immédiate pour les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body || {};
    if (!url) {
      return res.status(400).json({ error: 'Missing url' });
    }

    const body = new URLSearchParams({ url });

    const upstream = await fetch('https://cleanuri.com/api/v1/shorten', {
      method: 'POST',
      headers: {
        CORS
      },
      body,
    });

    const data = await upstream.json();
    return res.status(upstream.ok ? 200 : upstream.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Proxy error' });
  }
}
