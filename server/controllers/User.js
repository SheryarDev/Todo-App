const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const register = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => {
      return {
        msg: error.msg,
      };
    });

    return res.status(400).json({ errors, data: null });
  }

  const { name, email, password } = req.body;


  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Email already in use',
        },
      ],
      data: null,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,

  });

  const token = await JWT.sign({ email: newUser.email,userId:newUser._id }, process.env.JWT_SECRET, {
    expiresIn: 360000,
  });

  res.status(200).json({
    errors: [],
    data: {
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,

      },
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      errors: [
        {
          msg: 'User Not Exist!',
        },
      ],
      data: null,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: 'invalid credentials',
        },
      ],
      data: null,
    });
  }

  const token = await JWT.sign({ email: user.email ,userId:user._id}, process.env.JWT_SECRET, {
    expiresIn: 360000,
  });

  return res.status(200).json({
    errors: [],
    data: {
      token,
      user,
    },
  });
};

const me = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      return res.status(200).json({
        errors: [],
        data: {
          user,
        },
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete user

const DeleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await User.findOneAndDelete({ email });
      if (user) {
        return res.json({ message: `${email} deleted successfully` });
      }
    } else {
      return res.json({ message: `${email} user not found` });
    }
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = { login, DeleteUser, me, register };
