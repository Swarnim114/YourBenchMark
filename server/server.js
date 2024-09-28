const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// CORS configuration
const corsOptions = {
  origin: 'https://yourbenchmark.vercel.app', // Replace with your frontend's URL
  optionsSuccessStatus: 200
};

// Init Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/users', userRoutes);

// Constant PING to keep Render container alive
// app.get('/ping', (req, res) => {
//   res.send('pong');
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
