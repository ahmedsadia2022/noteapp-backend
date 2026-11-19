const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// 1. Initialize Express FIRST
const app = express();

// 2. THEN apply CORS and other middleware
app.use(cors({
    origin: 'https://noteapp-frontend-alpha.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json());

// 3. THEN your routes
const authRoutes = require('./project/routes/authRoutes');
const noteRoutes = require('./project/routes/noteRoutes');
const userRoutes = require('./project/routes/userRoutes');
const aggregationRoutes = require('./project/routes/aggregationRoutes');
const Post = require('./project/models/Post'); // (Remove this later if you deleted the test route)

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/aggregations', aggregationRoutes);

// 4. Database connection and app.listen at the bottom
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
