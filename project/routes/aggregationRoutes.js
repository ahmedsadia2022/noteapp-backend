const express = require('express');
const router = express.Router();
const { groupUsersByInterests, getUserPosts } = require('../controllers/aggregationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');


router.get('/group-by-interests', protect, adminOnly, groupUsersByInterests);

router.get('/user-posts/:userId', protect, getUserPosts);

module.exports = router;