import User from '../model/user.model.js';

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        return res.status(200).json({ message: 'Login successful' });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    })
    .catch((error) => {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    });
};

export const registerUser = (req, res) => {
  const { username, password } = req.body;
  // Logic for user registration
  if (username && password) {
    const newUser = new User({ username, password });
    newUser
      .save()
      .then(() => {
        return res
          .status(201)
          .json({ message: 'User registered successfully' });
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
      });
  }
  return res.status(400).json({ message: 'Invalid registration data' });
};
