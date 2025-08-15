import _ from 'lodash';
import { Comments } from '../data/comments.js';
import { Users } from '../data/users.js';
import { generateRandomId } from './common.js';

const POST_TYPES = ['title', 'content', 'title_content', 'user'];

// 게시글에 Reply를 해당 게시글 아래에 포함하여 순서대로 정렬하여 반환
export const organizePosts = (posts, ownerId = null) => {
  const clonedPosts = _.cloneDeep(posts);
  const filteredPosts = filterPost(clonedPosts);
  const sortedPosts = sortPosts(filteredPosts);
  let organizedPosts = [];

  sortedPosts.forEach((post) => {
    const replies = post.replies.map((replyId) => {
      const reply = clonedPosts.find((post) => post.id === replyId);
      return reply;
    });

    organizedPosts = [...organizedPosts, post, ...replies];
  });

  // ownerId가 있으면 ownerId로 필터링
  const targetPosts = organizedPosts.filter((post) =>
    ownerId ? post.userId === ownerId : true
  );

  return targetPosts;
};

// 게시물을 페이징 처리하여 반환
export const getPageResult = (items, query) => {
  // board: 'notice', 'free', 'qna' ...
  // type: title, content, title_content, user
  const {board, type = 'title', keyword, page = 1, size = 10 } = query;

  // board 필터링
  if (board) {
    items = items.filter((item) => item.board === board);
  }


  // 검색어 확인
  const isTypeValid = POST_TYPES.includes(type);
  if (isTypeValid && keyword) {
    const lowerKeyword = keyword.toLowerCase();
    items = items.filter((item) => {
      // 작성자(user) 검색
      if (type === 'user') {
        const populatedPost = populateUser(item);
        return populatedPost.user.name.toLowerCase().includes(lowerKeyword);
      }

      // 제목 + 내용 검색
      else if (type === 'title_content') {
        return Object.keys(item).some((key) => {
          const isTargetKey = ['title', 'content'].includes(key);
          if (isTargetKey) {
            return item[key].toLowerCase().includes(lowerKeyword);
          }
        });
      }

      // 그 외(제목, 내용) 검색
      return item[type].toLowerCase().includes(lowerKeyword);
    });
  }

  // 유효한 페이지 확인
  const { error, isValid } = checkValidPage(items, query);
  if (!isValid) {
    return {
      posts: [],
      pagination: { total: 0, size, page, lastPage: 0 },
      error,
    };
  }

  // 페이징 처리
  const total = items.length;
  const lastPage = Math.ceil(total / size);
  const posts = items.slice((page - 1) * size, page * size).map(toResponsePost);
  const pagination = { total, size, page, lastPage };

  return { posts, pagination };
};

export const checkValidPage = (items, query) => {
  const { type = 'title', page = 1, size = 10 } = query;

  // type 확인
  const isTypeValid = POST_TYPES.includes(type);
  if (!isTypeValid) {
    return {
      isValid: false,
      error: 'type은 title, content, title_content, user 중 하나여야 합니다.',
    };
  }

  // page, size 확인
  const isPageValid = page > 0 && Number.isInteger(Number(page));
  const isSizeValid = size > 0 && Number.isInteger(Number(size));
  if (!isPageValid || !isSizeValid) {
    return {
      isValid: false,
      error: 'page와 size는 1 이상의 정수여야 합니다.',
    };
  }

  // 유효한 경우
  return { isValid: true };
};

export const toResponsePost = (post) => {
  const postComments = Comments.filter((comment) => comment.postId === post.id);
  post.comment = postComments.length;
  return populateUser(post);
};

export const sortPosts = (posts) => {
  const sortedPosts = sortByDate(posts);
  return sortedPosts;
};

export const sortByDate = (items, isAsc = false) =>
  items.sort((a, b) =>
    isAsc
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export const populateUser = (item) => {
  item = _.cloneDeep(item);
  const targetUser = Users.find((user) => user.id === item.userId);
  const { password, ...user } = targetUser || {};
  return { ...item, user };
};

export const createNewPost = ({
  type = 'post',
  title = '',
  content = '',
  userId,
  parentId = null,
}) => {
  return {
    id: generateRandomId(),
    type,
    title,
    content,
    userId,
    parentId,
    likes: [],
    dislikes: [],
    replies: [],
    view: 0,
    date: new Date().toISOString(),
    isDeleted: false,
  };
};

export const filterPost = (posts, type = 'post') => {
  return posts.filter((post) => post.type === type);
};
