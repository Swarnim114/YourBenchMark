const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const { track, metricsHandler } = require('./metrics');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// CORS configuration (not needed when frontend and API share an origin behind the Ingress)
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://yourbenchmark.vercel.app',
  optionsSuccessStatus: 200
};

// Init Middleware
app.use(track);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/users', userRoutes);

// Prometheus metrics
app.get('/metrics', metricsHandler);

// Liveness: the process is up and serving requests
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

// Readiness: only take traffic while MongoDB is connected
app.get('/readyz', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.json({ status: 'ready' });
  }
  res.status(503).json({ status: 'not ready' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
