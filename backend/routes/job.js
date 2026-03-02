const express = require('express');
const { getRecommendations } = require('../controllers/jobController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/recommendations', auth, getRecommendations);

module.exports = router;
