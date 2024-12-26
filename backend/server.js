require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

const allowedOrigins = [process.env.BACKEND_URL, process.env.FRONTEND_URL, 'http://localhost:3000']; // Add all allowed origins

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies or authorization headers
};

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teams');

// Use routes
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  // console.log('Client connected');
  
  socket.on('playerSold', (data) => {
    io.emit('playerUpdated', data);
  });

  socket.on('disconnect', () => {
    // console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 