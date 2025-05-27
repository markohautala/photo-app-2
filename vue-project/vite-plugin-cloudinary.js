// vite-plugin-cloudinary.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export default function cloudinaryMiddleware() {
  return {
    name: 'cloudinary-proxy',
    configureServer(server) {
      server.middlewares.use('/api/cloudinary-proxy', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
        const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
        const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

        try {
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

          const body = await response.text();
          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(body);
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}
