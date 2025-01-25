import jwt from 'jsonwebtoken';

const tokenSecret = process.env.JWT_SECRET || 'jwt_secret';
const tokenExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

export const generateToken = (info) => {
  return jwt.sign(info, tokenSecret, { expiresIn: tokenExpiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (error) {
    return null;
  }
};
