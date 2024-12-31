import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import * as Minio from 'minio';
import multer from 'multer';

const app = express();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// Redis client
const redis = new Redis({
  host: process.env.REDIS_URL || 'redis',
  port: 6379,
  password: process.env.REDIS_PASSWORD || 'redis_password',
});

// MinIO client
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'minio',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || 'minio_user',
  secretKey: process.env.MINIO_SECRET_KEY || 'minio_password',
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Products endpoints
app.get('/products', async (req, res) => {
  try {
    const cacheKey = 'products:all';
    const cachedProducts = await redis.get(cacheKey);

    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await prisma.product.findMany({
      include: {
        variants: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    await redis.set(cacheKey, JSON.stringify(products), 'EX', 3600); // Cache for 1 hour
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Trips endpoints
app.get('/trips', async (req, res) => {
  try {
    const cacheKey = 'trips:all';
    const cachedTrips = await redis.get(cacheKey);

    if (cachedTrips) {
      return res.json(JSON.parse(cachedTrips));
    }

    const trips = await prisma.trip.findMany({
      include: {
        reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    await redis.set(cacheKey, JSON.stringify(trips), 'EX', 3600); // Cache for 1 hour
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Image upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const bucket = process.env.MINIO_BUCKET || 'matatu-images';
    const filename = `${Date.now()}-${req.file.originalname}`;

    // Upload file to MinIO
    await minioClient.putObject(bucket, filename, req.file.buffer);

    // Generate URL
    const imageUrl = `/images/${filename}`;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
