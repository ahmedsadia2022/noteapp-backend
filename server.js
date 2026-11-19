const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const cors = require('cors');


app.use(cors({
    origin: 'https://noteapp-frontend-alpha.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options('*', cors());

const authRoutes = require('./project/routes/authRoutes'); // Update paths if needed
const noteRoutes = require('./project/routes/noteRoutes');
const userRoutes = require('./project/routes/userRoutes');
const aggregationRoutes = require('./project/routes/aggregationRoutes'); // Update path if needed
const Post = require('./project/models/Post');

const app = express();
app.use(express.json()); // Allows us to accept JSON data in the body

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/aggregations', aggregationRoutes);
app.use(express.static(path.join(__dirname, 'public'))); 


app.get('/', (req, res) => res.send('API Running'));

// Use your chosen port
const PORT = process.env.PORT || 5003;

// TEMPORARY ROUTE FOR TESTING
app.post('/api/test-post', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
