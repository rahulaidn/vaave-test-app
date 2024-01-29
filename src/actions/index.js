import { getPosts, getPost, getUser, searchPosts } from '../utils/api';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await getPosts();
    const postsWithUserDetails = await Promise.all(
      response.data.map(async (post) => {
        const userResponse = await getUser(post.userId);
        post.username = userResponse.data.username;
        post.fullName = userResponse.data.name;
        return post;
      })
    );
    console.log(response.data,"hello")
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: postsWithUserDetails });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

export const fetchPost = (postId) => async (dispatch) => {
  try {
    const response = await getPost(postId);
    const userResponse = await getUser(response.data.userId);
    response.data.username = userResponse.data.username;
    dispatch({ type: FETCH_POST_SUCCESS, payload: response.data });
    console.log(response.data, "data found");
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

// export const search = (query) => async (dispatch) => {
//   try {
//     const response = await searchPosts(query);
//     dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data });
//   } catch (error) {
//     console.error('Error searching posts:', error);
//   }
// };

export const search = (query) => async (dispatch) => {
  try {
    const response = await searchPosts(query);
    const postsWithUserDetails = await Promise.all(
      response.data.map(async (post) => {
        const userResponse = await getUser(post.userId);
        post.username = userResponse.data.username;
        post.fullName = userResponse.data.name;
        return post;
      })
    );
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: postsWithUserDetails });
  } catch (error) {
    console.error('Error searching posts:', error);
  }
};