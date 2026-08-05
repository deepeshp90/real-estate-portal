

// import express from 'express'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import userRouter from './routes/user.route.js'
// import authRouter from './routes/auth.route.js'
// import cookieParser from 'cookie-parser'
// import listingRouter from './routes/listing.route.js'
// import cors from 'cors';
// import path from 'path';

// dotenv.config()

// mongoose.connect(process.env.MONGO).then(() => {
//     console.log('Connected to database')
// }).catch((err) => {
//     console.log(err)
// })

// const __dirname = path.resolve();
// const app = express()

// app.use(cors({
//     origin: ['http://localhost:5173', 'https://real-estate-portal-a88f.onrender.com'],
//     credentials: true,
// } ));

// app.use(express.json());
// app.use(cookieParser());

// // API Routes
// app.use('/api/user', userRouter)
// app.use('/api/auth', authRouter)
// app.use('/api/listing', listingRouter)

// // FIX: We use '..' to go UP one level from the 'api' folder to find the 'client' folder
// const clientPath = path.join(__dirname, '..', 'client', 'dist');
// app.use(express.static(clientPath));

// // FIX: Absolute safest way to handle frontend fallback without crashing Node v22
// app.use((req, res, next) => {
//   // If it's a GET request and NOT starting with /api, serve index.html
//   if (req.method === 'GET' && !req.url.startsWith('/api')) {
//     return res.sendFile(path.join(clientPath, 'index.html'));
//   }
//   next();
// });

// // Middleware for error handling
// app.use((err, req, res, next) => {
//     if (res.headersSent) return next(err);
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is running on port 3000')
// })
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

// Correct ESM directory resolution:
// __dirname will point directly to /opt/render/project/src/api
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://real-estate-portal-a88f.onrender.com'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Go up one directory from 'api' to root, then into 'client/dist'
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');

// Serve static assets
app.use(express.static(clientDistPath));

// Fallback all non-API requests to index.html
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      next(err);
    }
  });
});

// Middleware for error handling
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
