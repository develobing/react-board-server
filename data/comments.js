import { Users } from './users.js';

const defaultComments = [
  {
    id: 'comment1',
    postId: 'post1',
    content:
      '정말 유익한 글 입니다.\nReact.js에 대해 더 많은 것을 알 수 있었습니다.\n감사합니다.',
    userId: Users[1].id,
    to: '',
    date: new Date('2024-10-09 17:25:13'),
  },
  {
    id: 'comment2',
    postId: 'post3',
    content: '환영해주셔서 감사합니다.\nReact.js 화이팅!',
    userId: Users[0].id,
    to: '',
    date: new Date('2024-10-09 11:52:34'),
  },
  {
    id: 'comment3',
    postId: 'post3',
    content: '가입하셨군요.\n반갑습니다.\n게시판을 잘 만들어보아요.',
    userId: Users[1].id,
    to: '',
    date: new Date('2024-10-06 15:37:42'),
  },
  {
    id: 'comment4',
    postId: 'post3',
    content: '저도 반갑습니다!\n잘 부탁드립니다!',
    userId: Users[2].id,
    to: Users[1].id,
    date: new Date('2024-10-07 10:21:56'),
  },
];

export const Comments = [...defaultComments];
