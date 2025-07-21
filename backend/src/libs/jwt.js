import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
      (err, token) => {
        if (err) {
          console.error('Error generating JWT:', err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
