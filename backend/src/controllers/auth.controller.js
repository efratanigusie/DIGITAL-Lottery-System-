import { validateAndFormatEthiopianPhone } from "../utils/phone.util.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.util.js";


// REGISTER
export const register = async (req, res) => {
  try {
    let { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password required",
      });
    }

    // ✅ Validate Ethiopian phone
    const formattedPhone = validateAndFormatEthiopianPhone(phone);

    if (!formattedPhone) {
      return res.status(400).json({
        message: "Invalid Ethiopian phone number",
      });
    }

    const existingUser = await User.findOne({ phone: formattedPhone });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      phone: formattedPhone,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    let { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password required",
      });
    }

    // ✅ Normalize phone
    const formattedPhone = validateAndFormatEthiopianPhone(phone);

    if (!formattedPhone) {
      return res.status(400).json({
        message: "Invalid Ethiopian phone number",
      });
    }

    const user = await User.findOne({ phone: formattedPhone });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
