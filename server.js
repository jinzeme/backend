import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Server } from 'socket.io';
import http from 'http'; // ✅ Required for correct Socket.io setup
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import messageRoutes from './routes/messages.js';
import postRoutes from './routes/posts.js';
import followRoutes from './routes/follows.js';
import db from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follows', followRoutes);

// ✅ Test MySQL connection
db.getConnection()
  .then((connection) => {
    console.log('✅ MySQL Connected Successfully');
    connection.release(); // Release connection to the pool
  })
  .catch((err) => {
    console.error('❌ MySQL Connection Error:', err.message);
    process.exit(1); // Exit server if DB connection fails
  });

// ✅ Create HTTP server to integrate with Socket.io
const httpServer = http.createServer(app);

// ✅ Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// ✅ Socket.io Authentication Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error('Authentication error'));
  }
});

// ✅ Socket.io Real-Time Messaging
io.on('connection', (socket) => {
  console.log('New client connected:', socket.user.username);

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', { ...message, sender: socket.user.username });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// ✅ Start the HTTP Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
