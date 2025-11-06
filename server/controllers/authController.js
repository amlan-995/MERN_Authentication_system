const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const Token = require('../models/Token');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Please provide name, email and password' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    // create verification token
    const tokenString = crypto.randomBytes(32).toString('hex');
    await Token.create({ userId: user._id, token: tokenString });

    const verifyUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify/${tokenString}`;
    try {
      await sendEmail({
        to: user.email,
        subject: 'Verify your account',
        text: `Click to verify: ${verifyUrl}`,
        html: `<p>Click <a href="${verifyUrl}">here</a> to verify your account.</p>`
      });
    } catch (e) {
      console.warn('Email not sent:', e.message);
    }

    res.status(201).json({ message: 'User registered. Check email for verification (if mail configured).' });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const dbToken = await Token.findOne({ token });
    if (!dbToken) return res.status(400).json({ message: 'Invalid or expired token' });
    const user = await User.findById(dbToken.userId);
    if (!user) return res.status(400).json({ message: 'User not found' });
    user.isVerified = true;
    await user.save();
    await Token.deleteOne({ _id: dbToken._id });
    res.json({ message: 'Email verified' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Provide email and password' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email first' });
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    next(err);
  }
};
