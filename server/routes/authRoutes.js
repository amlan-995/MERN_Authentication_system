const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);
router.get('/me', protect, me);

module.exports = router;
