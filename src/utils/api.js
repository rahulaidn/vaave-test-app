import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = () => api.get('/posts');
export const getPost = (postId) => api.get(`/posts/${postId}`);
export const getUser = (userId) => api.get(`/users/${userId}`);
export const searchPosts = (query) => api.get(`/posts?q=${query}`);

export default api;
