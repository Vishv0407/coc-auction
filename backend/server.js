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
    origin: [process.env.BACKEND_URL, process.env.FRONTEND_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: [process.env.BACKEND_URL, process.env.FRONTEND_URL, 'http://localhost:3000'],
}));

app.use(express.json());

// Import routes
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teams');
const transactionLogsRouter = require('./routes/transactionLogs');

// Use routes
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/logs', transactionLogsRouter);

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

app.get("/", (req,res) => {
  return res.json({
      success: true,
      message: "Boooooooooom, your server is started"
  })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 