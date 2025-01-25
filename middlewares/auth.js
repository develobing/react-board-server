import { verifyToken } from '../utils/auth.js';

const tokenSecret = process.env.JWT_SECRET || 'jwt_secret';

export const auth = (req, res, next) => {
  // Bearer 토큰 존재하는 지 확인
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    const loginUser = verifyToken(token);

    if (loginUser) {
      req.loginUserId = loginUser.id;
      next();
      return;
    }
  }

  res
    .status(401)
    .json({ isSuccess: false, message: '로그인이 필요한 서비스 입니다.' });
};

export const authorize = (role) => (req, res, next) => {
  // Bearer 토큰 존재하는 지 확인
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      if (token === tokenSecret) {
        if (role === 'admin') {
          next();
          return;
        }
      }
    }
  }

  res.status(401).json({ isSuccess: false, message: '접근 권한이 없습니다.' });
};
