import { getPosts, getPost, getUser, searchPosts } from '../utils/api';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await getPosts();
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

export const fetchPost = (postId) => async (dispatch) => {
  try {
    const response = await getPost(postId);
    dispatch({ type: FETCH_POST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  try {
    const response = await getUser(userId);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

export const search = (query) => async (dispatch) => {
  try {
    const response = await searchPosts(query);
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error searching posts:', error);
  }
};
