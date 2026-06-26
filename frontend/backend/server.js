const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => res.send("Backend running!"));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));