import { combineReducers } from 'redux';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POST_SUCCESS,
  FETCH_USER_SUCCESS,
} from '../actions';

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  posts: postsReducer,
  post: postReducer,
  user: userReducer,
});
