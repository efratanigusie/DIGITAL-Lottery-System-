const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { generateToken } = require('../utils/jwt.util');

/**
 * @desc    Register user using phone number
 * @route   POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { fullName, phone, password } = req.body;

    // 1. Validate input
    if (!fullName || !phone || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // 2. Check if phone already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        message: 'Phone number already registered'
      });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
      fullName,
      phone,
      password: hashedPassword
    });

    // 5. Generate JWT token
    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        kycStatus: user.kycStatus
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * @desc    Login user using phone number
 * @route   POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 1. Validate input
    if (!phone || !password) {
      return res.status(400).json({
        message: 'Phone and password are required'
      });
    }

    // 2. Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid phone number or password'
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid phone number or password'
      });
    }

    // 4. Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        kycStatus: user.kycStatus
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
