import express from 'express';
import _ from 'lodash';
import { Posts } from '../../data/posts.js';
import { Users } from '../../data/users.js';
import { auth } from '../../middlewares/auth.js';
import {
  createNewPost,
  filterPost,
  getPageResult,
  makePost,
  sortPosts,
} from '../../utils/post.js';

const router = express.Router();

// 게시글 전체 조회
router.get('/', auth, (req, res) => {
  const filteredPosts = filterPost(_.cloneDeep(Posts));
  const sortedPosts = sortPosts(filteredPosts);
  const { posts, pagination, error } = getPageResult(sortedPosts, req.query);
  const isSuccess = !error;

  res.json({
    isSuccess,
    message: isSuccess ? '게시글 전체 조회 성공' : error,
    data: {
      posts,
      pagination,
    },
  });
});

// 내 게시글 조회
router.get('/my', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const filteredPosts = filterPost(_.cloneDeep(Posts));
  const sortedPosts = sortPosts(filteredPosts);
  const myPosts = sortedPosts.filter((post) => post.userId === loginUserId);
  const { posts, pagination, error } = getPageResult(myPosts, req.query);
  const isSuccess = !error;

  res.json({
    isSuccess,
    message: isSuccess ? '내 게시글 조회 성공' : error,
    data: {
      posts,
      pagination,
    },
  });
});

// 게시글 상세 조회
router.get('/:id', auth, (req, res) => {
  const { id } = req.params;
  const post = Posts.find((post) => post.id === id);
  const isPostExist = post ? true : false;

  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시글이 없습니다.',
    });
    return;
  }

  res.json({
    isSuccess: true,
    message: '게시글 조회 성공',
    data: makePost(post),
  });
});

// 게시글 생성
router.post('/', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const { title, content } = req.body;

  // 필수 입력값 확인
  if (!title || !content) {
    res.status(400).json({
      isSuccess: false,
      message: '제목과 내용은 필수 입력값입니다.',
    });
    return;
  }

  // 새로운 게시글 생성
  const newPost = createNewPost({ title, content, userId: loginUserId });
  Posts.push(newPost);

  res.json({
    isSuccess: true,
    message: '게시글 생성 성공',
    data: makePost(newPost),
  });
});

// 답글 생성
router.post('/:postId/reply', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const { postId } = req.params;
  const { title, content } = req.body;
  const postIdx = Posts.findIndex((post) => post.id === postId);

  // 게시글이 존재여부 확인
  const isPostExist = postIdx !== -1;
  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시글이 없습니다.',
    });
    return;
  }

  // 새로운 답글 생성
  const newReply = createNewPost({
    type: 'reply',
    title,
    content,
    userId: loginUserId,
    postId,
  });
  Posts.push(newReply);

  // 게시글에 답글 추가
  Posts[postIdx].replies.push(newReply.id);

  res.json({
    isSuccess: true,
    message: '답글 생성 성공',
    data: makePost(newReply),
  });
});

// 게시글 수정
router.put('/:id', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const { id } = req.params;
  const updatePost = req.body;
  const postIdx = Posts.findIndex((post) => post.id === id);

  // 게시글이 존재여부 확인
  const isPostExist = postIdx !== -1;
  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시글이 없습니다.',
    });
    return;
  }

  // 게시글 작성자 확인
  const post = Posts[postIdx];
  const isPostOwner = post.userId === loginUserId;
  if (!isPostOwner) {
    res.status(403).json({
      isSuccess: false,
      message: '작성자만 수정 가능합니다.',
    });
    return;
  }

  // 게시글 수정
  Posts[postIdx] = {
    ...post,
    ...updatePost,
  };

  res.json({
    isSuccess: true,
    message: '게시글 수정 성공',
    data: makePost(Posts[postIdx]),
  });
});

// 게시글 조회수 증가
router.put('/:id/view', auth, (req, res) => {
  const { id } = req.params;
  const postIdx = Posts.findIndex((post) => post.id === id);

  // 게시글이 존재여부 확인
  const isPostExist = postIdx !== -1;
  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시글이 없습니다.',
    });
    return;
  }

  // 게시글 조회수 증가
  const post = Posts[postIdx];
  Posts[postIdx] = {
    ...post,
    view: post.view + 1,
  };

  res.json({
    isSuccess: true,
    message: '게시글 조회수 증가 성공',
    data: makePost(Posts[postIdx]),
  });
});

// 게시글 삭제
router.delete('/:id', auth, (req, res) => {
  const loginUserId = req.loginUserId;
  const { id } = req.params;
  const postIdx = Posts.findIndex((post) => post.id === id);

  // 게시글이 존재여부 확인
  const isPostExist = postIdx !== -1;
  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시글이 없습니다.',
    });
    return;
  }

  // 삭제 권한 확인 (게시글 작성자 / 관리자)
  const loginUser = Users.find((user) => user.id === loginUserId);
  const isPostOwner = Posts[postIdx].userId === loginUserId;
  const isAdmin = loginUser.role === 'admin';
  if (!isPostOwner && !isAdmin) {
    res.status(403).json({
      isSuccess: false,
      message: '작성자 또는 관리자만 삭제 가능합니다.',
    });
    return;
  }

  // 게시글 삭제
  Posts.splice(postIdx, 1);

  res.json({
    isSuccess: true,
    message: '게시글 삭제 성공',
  });
});

// 게시글 좋아요
router.put('/:id/like', auth, (req, res) => {
  const { id } = req.params;
  const loginUserId = req.loginUserId;
  const postIdx = Posts.findIndex((post) => post.id === id);

  // 게시글이 존재여부 확인
  const isPostExist = postIdx !== -1;
  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시글이 없습니다.',
    });
    return;
  }

  const post = Posts[postIdx];
  const isAlreadyLiked = post.likes.includes(loginUserId);
  const isAlreadyDisliked = post.dislikes.includes(loginUserId);

  // 이미 좋아요를 누른 경우, 좋아요 취소
  if (isAlreadyLiked)
    post.likes = post.likes.filter((userId) => userId !== loginUserId);
  // 좋아요를 누르지 않은 경우, 좋아요 추가
  else post.likes.push(loginUserId);

  // 이미 싫어요를 누른 경우, 싫어요 취소
  if (isAlreadyDisliked)
    post.dislikes = post.dislikes.filter((userId) => userId !== loginUserId);

  res.json({
    isSuccess: true,
    message: '게시글 좋아요 변경 성공',
    data: makePost(post),
  });
});

// 게시글 싫어요
router.put('/:id/dislike', auth, (req, res) => {
  const { id } = req.params;
  const loginUserId = req.loginUserId;
  const postIdx = Posts.findIndex((post) => post.id === id);

  // 게시글이 존재여부 확인
  const isPostExist = postIdx !== -1;
  if (!isPostExist) {
    res.status(404).json({
      isSuccess: false,
      message: '해당하는 게시글이 없습니다.',
    });
    return;
  }

  const post = Posts[postIdx];
  const isAlreadyLiked = post.likes.includes(loginUserId);
  const isAlreadyDisliked = post.dislikes.includes(loginUserId);

  // 이미 싫어요를 누른 경우, 싫어요 취소
  if (isAlreadyDisliked)
    post.dislikes = post.dislikes.filter((userId) => userId !== loginUserId);
  // 싫어요를 누르지 않은 경우, 싫어요 추가
  else post.dislikes.push(loginUserId);

  // 이미 좋아요를 누른 경우, 좋아요 취소
  if (isAlreadyLiked)
    post.likes = post.likes.filter((userId) => userId !== loginUserId);

  res.json({
    isSuccess: true,
    message: '게시글 싫어요 변경 성공',
    data: makePost(post),
  });
});

export default router;
