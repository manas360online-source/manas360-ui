import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import authRoutes from './routes/authRoutes.js';

// Local dev quickstart:
// 1) Run server: npm run server
// 2) Health check: GET http://localhost:5000/health
// 3) Send OTP: POST http://localhost:5000/api/auth/send-otp (JSON: {"phoneNumber":"9876543210"})

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.use('/api/auth', authRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Internal server error.' });
});

const port = Number(process.env.PORT || 5000);

pool
  .connect()
  .then((client) => {
    console.log('Database connected');
    client.release();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });
