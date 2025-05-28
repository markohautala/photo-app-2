// Hela denna fil är tillför produktion - inte locally. Bara för Vercel

import { Buffer } from 'buffer';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Tillåt CORS från localhost och produktion
  const allowedOrigins = ['https://photo-app-2.vercel.app', 'http://localhost:5173'];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).end();
    return;
  }

  try {
    const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
    const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression: 'folder:vue-gallery',
          max_results: 100,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      res.status(response.status).json({ error: errText });
      return;
    }

    const data = await response.json();

    if (!data.resources) {
      res.status(500).json({ error: 'Resources saknas i Cloudinary-svaret' });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Gör så det funkar för både Vite (middleware) och Vercel (serverless)
export const cloudinaryProxy = handler;
