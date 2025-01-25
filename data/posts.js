import { Users } from './users.js';

const devs = Users.filter((user) => user.id.startsWith('dev'));
const defaultPosts = [
  {
    id: 'post1',
    type: 'post',
    title: 'React.js의 Hook 정리',
    content:
      'React.js의 여러 Hook을 알아봅시다..\nuseState(), useEffect(), useContext() 등등...\n그 외에도 다양한 Hook들이 있습니다.\n자세한 내용은 React.js 공식 문서를 참고하세요.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: ['reply1'],
    postId: null,
    date: new Date('2024-10-07 12:23:55'),
  },
  {
    id: 'post2',
    type: 'post',
    title: 'React.js 프로젝트 시작하기',
    content: 'React.js 프로젝트를 시작해봅시다!\nReact.js 화이팅!',
    userId: Users[1].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-05 15:37:29'),
  },
  {
    id: 'post3',
    type: 'post',
    title: '가입 인사',
    content: '안녕하세요.\n반갑습니다.\n저는 새로운 회원입니다.',
    userId: Users[2].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-05 12:11:32'),
  },
  {
    id: 'post4',
    type: 'post',
    title: '첫 번째 개발자 - React.js',
    content: '첫 번째 개발자 게시글 입니다.\nReact.js를 공부 중 입니다.',
    userId: devs[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-05 12:11:32'),
  },
  {
    id: 'post5',
    type: 'post',
    title: '첫 번째 개발자 - Node.js',
    content: '첫 번째 개발자 게시글 입니다.\nNode.js를 공부 중 입니다.',
    userId: devs[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-05 12:11:32'),
  },
  {
    id: 'post6',
    type: 'post',
    title: '두 번째 개발자 - React.js, Node.js',
    content:
      '두 번째 개발자 게시글 입니다.\nReact.js, Node.js를 공부 중 입니다.',
    userId: devs[1].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-05 12:11:32'),
  },
  {
    id: 'paging1',
    type: 'post',
    title: '페이징 테스트 게시글 - 1',
    content:
      '테스트 게시글 입니다.\n1번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-04 11:53:27'),
  },
  {
    id: 'paging2',
    type: 'post',
    title: '페이징 테스트 게시글 - 2',
    content:
      '테스트 게시글 입니다.\n2번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-03 16:28:53'),
  },
  {
    id: 'paging3',
    type: 'post',
    title: '페이징 테스트 게시글 - 3',
    content:
      '테스트 게시글 입니다.\n3번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-03 13:51:14'),
  },
  {
    id: 'paging4',
    type: 'post',
    title: '페이징 테스트 게시글 - 4',
    content:
      '테스트 게시글 입니다.\n4번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-03 10:29:35'),
  },
  {
    id: 'paging5',
    type: 'post',
    title: '페이징 테스트 게시글 - 5',
    content:
      '테스트 게시글 입니다.\n5번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-10-02 17:23:52'),
  },
  {
    id: 'paging6',
    type: 'post',
    title: '페이징 테스트 게시글 - 6',
    content:
      '테스트 게시글 입니다.\n6번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-30 14:29:21'),
  },
  {
    id: 'paging7',
    type: 'post',
    title: '페이징 테스트 게시글 - 7',
    content:
      '테스트 게시글 입니다.\n7번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-29 13:51:47'),
  },
  {
    id: 'paging8',
    type: 'post',
    title: '페이징 테스트 게시글 - 8',
    content:
      '테스트 게시글 입니다.\n8번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-27 09:52:33'),
  },
  {
    id: 'paging9',
    type: 'post',
    title: '페이징 테스트 게시글 - 9',
    content:
      '테스트 게시글 입니다.\n9번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-23 19:43:23'),
  },
  {
    id: 'paging10',
    type: 'post',
    title: '페이징 테스트 게시글 - 10',
    content:
      '테스트 게시글 입니다.\n10번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-23 15:27:51'),
  },
  {
    id: 'paging11',
    type: 'post',
    title: '페이징 테스트 게시글 - 11',
    content:
      '테스트 게시글 입니다.\n11번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-21 16:53:42'),
  },
  {
    id: 'paging12',
    type: 'post',
    title: '페이징 테스트 게시글 - 12',
    content:
      '테스트 게시글 입니다.\n12번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-21 10:36:29'),
  },
  {
    id: 'paging13',
    type: 'post',
    title: '페이징 테스트 게시글 - 13',
    content:
      '테스트 게시글 입니다.\n13번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-20 18:45:00'),
  },
  {
    id: 'paging14',
    type: 'post',
    title: '페이징 테스트 게시글 - 14',
    content:
      '테스트 게시글 입니다.\n14번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-19 10:23:00'),
  },
  {
    id: 'paging15',
    type: 'post',
    title: '페이징 테스트 게시글 - 15',
    content:
      '테스트 게시글 입니다.\n15번째 게시글 입니다.\n게시판 페이징을 위해 작성되었습니다.',
    userId: Users[0].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: null,
    date: new Date('2024-09-17 15:37:00'),
  },
  {
    id: 'reply1',
    type: 'reply',
    title: 'useState()에 대해 추가 질문이 있습니다.',
    content:
      'React.js의 Hook 중에서 useState()에 대해 궁금합니다.\nuseState()는 어떻게 사용하는 것인가요?',
    userId: Users[1].id,
    likes: [],
    dislikes: [],
    replies: [],
    postId: 'post1',
    date: new Date('2024-10-10 10:35:17'),
  },
];

export const Posts = [...defaultPosts];
