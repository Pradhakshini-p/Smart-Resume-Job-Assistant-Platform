const express = require('express');
const { getStats, getAllUsers } = require('../controllers/adminController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/stats', auth, getStats);
router.get('/users', auth, getAllUsers);

module.exports = router;
