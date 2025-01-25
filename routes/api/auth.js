import express from 'express';
import { Users } from '../../data/users.js';
import { generateToken } from '../../utils/auth.js';
import { generateRandomId } from '../../utils/common.js';

const MIN_PASSWORD_LENGTH = 3;
const router = express.Router();

// 유저 로그인
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 같은 이메일과 비밀번호를 가진 유저가 있는지 확인
  const isUserExist = Users.some(
    (user) => user.email === email && user.password === password
  );
  if (!isUserExist) {
    res.status(401).json({ isSuccess: false, message: '잘못된 정보입니다.' });
    return;
  }

  // 유저 조회
  const user = Users.find(
    (user) => user.email === email && user.password === password
  );

  // JWT 토큰 생성
  const token = generateToken({
    id: user.id,
  });

  res.json({
    isSuccess: true,
    message: '로그인 성공',
    data: { token },
  });
});

// 유저 회원가입
router.post('/register', (req, res) => {
  const newUser = req.body;

  // 이메일 형식 확인
  const emailRegexp = /\S+@\S+\.\S+/;
  if (!emailRegexp.test(newUser.email)) {
    res
      .status(400)
      .json({ isSuccess: false, message: '이메일 형식이 잘못되었습니다.' });
    return;
  }

  // 같은 이메일을 가진 유저가 있는지 확인
  const isUserExist = Users.find((user) => user.email === newUser.email);
  if (isUserExist) {
    res
      .status(409)
      .json({ isSuccess: false, message: '이미 존재하는 이메일입니다.' });
    return;
  }

  // 비밀번호 최소 글자 확인
  if (newUser.password.length < MIN_PASSWORD_LENGTH) {
    res.status(400).json({
      isSuccess: false,
      message: `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}글자 이상이어야 합니다.`,
    });
    return;
  }

  // 필수 항목 확인
  if (!newUser.email || !newUser.name || !newUser.password) {
    res.status(400).json({
      isSuccess: false,
      message: '필수 항목이 누락 되었습니다. ',
    });
    return;
  }

  // 유저 추가
  newUser.id = generateRandomId();
  newUser.role = newUser.role || 'user';
  Users.push(newUser);

  // JWT 토큰 생성
  const token = generateToken({
    id: newUser.id,
  });

  res.json({
    isSuccess: true,
    message: '회원가입 성공',
    data: { token },
  });
});

export default router;
