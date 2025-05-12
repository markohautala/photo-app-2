// backend/api/images.js
import express from 'express';
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config(); // Load .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary ENV:', process.env.CLOUDINARY_CLOUD_NAME);

const router = express.Router();

router.get('/images', async (req, res) => {
  try {
    const result = await cloudinary.v2.search
      .expression('resource_type:image') // <- Make sure folder name matches in Cloudinary
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const images = result.resources.map(img => ({
      id: img.asset_id,
      url: img.secure_url,
    }));

    res.status(200).json(images);
  } catch (err) {
    console.error('Cloudinary fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

export default router;
