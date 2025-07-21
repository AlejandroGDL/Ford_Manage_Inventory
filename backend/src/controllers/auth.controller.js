import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { generateToken } from '../libs/jwt.js';

dotenv.config();

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const userFound = await User.findOne({ username });

  if (userFound) {
    const passwordhash = await bcrypt.compare(password, userFound.password);
    if (passwordhash) {
      const token = await generateToken({ id: userFound._id });
      res.cookie('token', token);
      res.status(200).json({
        id: userFound._id,
        username: userFound.username,
        message: 'Login successful',
      });
      return;
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } else {
    return res.status(400).json({ message: 'Invalid registration data' });
  }
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = new User({ username, password: hashedPassword });
    const userSaved = await newUser.save();

    const token = await generateToken({ id: userSaved._id });
    res.cookie('token', token);
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      message: 'User registered successfully',
    });
  } else {
    return res.status(400).json({ message: 'Invalid registration data' });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.status(200).json({ message: 'Logout successful' });
};
