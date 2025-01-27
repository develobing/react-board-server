import _ from 'lodash';
import { Users } from '../data/users.js';
import { populateUser } from './post.js';

export const toResponseComment = (comment) => {
  return populateToUser(populateUser(comment));
};

export const populateToUser = (item) => {
  item = _.cloneDeep(item);
  const targetUser = Users.find((user) => user.id === item.to);
  const { password, ...toUser } = targetUser || {};
  return { ...item, toUser };
};
