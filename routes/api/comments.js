import express from 'express';
import { Comments } from '../../data/comments.js';
import { Posts } from '../../data/posts.js';
import { generateRandomId } from '../../utils/common.js';
import { auth } from '../../middlewares/auth.js';
import { populateUser } from '../../utils/post.js';
import { Users } from '../../data/users.js';

const router = express.Router();

// 내 댓글 조회
router.get('/my', auth, (req, res) => {
  const userId = req.loginUserId;
  const comments = Comments.filter((comment) => comment.userId === userId).map(
    populateUser
  );

  res.json({
    isSuccess: true,
    message: '내 댓글 조회 성공',
    data: comments,
  });
});

// 게시물에 댓글 조회
router.get('/posts/:postId', auth, (req, res) => {
  const { postId } = req.params;
  const comments = Comments.filter((comment) => comment.postId === postId).map(
    populateUser
  );

  res.json({
    isSuccess: true,
    message: '게시물 댓글 조회 성공',
    data: comments,
  });
});

// 게시물 댓글 작성
router.post('/posts/:postId', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const { postId } = req.params;
  const { content, to } = req.body;

  // 필수 입력값 확인
  if (!postId || !content) {
    res.status(400).json({
      isSuccess: false,
      message: '게시물 ID와 내용을 입력해주세요.',
    });
    return;
  }

  // 게시물 존재 여부 확인
  const post = Posts.find((post) => post.id === postId);
  const isPostExist = post ? true : false;
  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시물이 없습니다.',
    });
    return;
  }

  // 새로운 댓글 생성
  const newComment = {
    id: generateRandomId(),
    postId,
    content,
    userId: loginUserId,
    to,
    date: new Date().toISOString(),
  };

  Comments.push(newComment);

  res.json({
    isSuccess: true,
    message: '댓글 작성 성공',
    data: populateUser(newComment),
  });
});

// 댓글 수정
router.put('/:id', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const { id } = req.params;
  const commentIdx = Comments.findIndex((comment) => comment.id === id);

  // 게시글 작성자 확인
  const isCommentOwner = Comments[commentIdx].userId === loginUserId;
  if (!isCommentOwner) {
    res.status(403).json({
      isSuccess: false,
      message: '작성자만 수정 가능합니다.',
    });
    return;
  }

  // 필수 입력값 확인
  const { content, to } = req.body;
  if (!content) {
    res.status(400).json({
      isSuccess: false,
      message: '내용을 입력해주세요.',
    });
    return;
  }

  // 댓글 존재 여부 확인
  const comment = Comments.find((comment) => comment.id === id);
  const isCommentExist = comment ? true : false;
  if (!isCommentExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 댓글이 없습니다.',
    });
    return;
  }

  // 댓글 수정
  comment.content = content;
  comment.to = to;

  res.json({
    isSuccess: true,
    message: '댓글 수정 성공',
    data: populateUser(comment),
  });
});

// 댓글 삭제
router.delete('/:id', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const { id } = req.params;
  const commentIdx = Comments.findIndex((comment) => comment.id === id);

  // 댓글 존재 여부 확인
  const commentIndex = Comments.findIndex((comment) => comment.id === id);
  const isCommentExist = commentIndex !== -1;
  if (!isCommentExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 댓글이 없습니다.',
    });
    return;
  }

  // 삭제 권한 확인 (게시글 작성자 / 관리자)
  const loginUser = Users.find((user) => user.id === loginUserId);
  const isCommentOwner = Comments[commentIdx].userId === loginUserId;
  const isAdmin = loginUser.role === 'admin';
  if (!isCommentOwner && !isAdmin) {
    res.status(403).json({
      isSuccess: false,
      message: '작성자 또는 관리자만 삭제 가능합니다.',
    });
    return;
  }

  // 댓글 삭제
  Comments.splice(commentIndex, 1);

  res.json({
    isSuccess: true,
    message: '댓글 삭제 성공',
  });
});

export default router;
