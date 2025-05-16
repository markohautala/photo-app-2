import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

// Ladda miljövariabler från .env
dotenv.config();

const app = express();
const PORT = 3001;

// Hämta Cloudinary credentials från miljövariabler
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('❌ Saknade Cloudinary-credentials i .env');
  process.exit(1);
}

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.get('/api/images', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          expression: 'folder:vue-gallery',
          max_results: 100
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cloudinary API error: ${response.statusText} - ${errText}`);
    }

    const data = await response.json();
    if (!data.resources) {
      throw new Error('Resources saknas i Cloudinary-svaret');
    }

    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: error.message,
      details: error.stack
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server körs på http://localhost:${PORT}`);
});
