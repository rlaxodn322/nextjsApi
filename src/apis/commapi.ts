import axios from 'axios';
import { backUrl } from '../config/config';
import { Post1 } from '../types/Post';
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchPosts = async (): Promise<Post1[]> => {
  try {
    const response = await axios.get('/community');
    return response.data;
  } catch (error) {
    console.error('Falied posts', error);
    throw new Error('Fail');
  }
};

export const createPost = async (
  post: Omit<Post1, 'id' | 'date' | 'comments'>
): Promise<Post1> => {
  try {
    const response = await axios.post('/community', post);
    return response.data;
  } catch (error) {
    console.error('Fail');
    throw new Error('Fail');
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/community/${id}`);
  } catch (error) {
    console.error('Fail');
    throw new Error('Fail');
  }
};
