// vite-middleware.js
import { cloudinaryProxy } from './api/cloudinary-proxy.js';

export default function cloudinaryMiddleware() {
  return {
    name: 'cloudinary-middleware',
    configureServer(server) {
      server.middlewares.use('/api/cloudinary-proxy', (req, res) => {
        cloudinaryProxy(req, res);
      });
    },
  };
}
