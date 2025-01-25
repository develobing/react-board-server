import express from 'express';
import { Users } from '../../data/users.js';
import { auth } from '../../middlewares/auth.js';

const router = express.Router();

// 유저 전체 조회
router.get('/', (req, res) => {
  res.json({
    isSuccess: true,
    message: '유저 전체 조회 성공',
    data: Users,
  });
});

// 유저 정보 조회
router.get('/:id', auth, (req, res) => {
  const { id } = req.params;
  const user = Users.find((user) => user.id === id);
  const isUserExist = user ? true : false;

  if (!isUserExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 유저가 없습니다.',
    });
    return;
  }

  res.json({
    isSuccess: true,
    message: '유저 조회 성공',
    data: user,
  });
});

export default router;
