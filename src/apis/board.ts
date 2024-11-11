import axios from 'axios';
import { backUrl } from '../config/config';
import { Message, Post } from '../types/Post';

// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

// 게시물 목록 가져오기
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get('/boards');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

// 게시물 생성하기
export const createPost = async (
  post: Omit<Post, 'id' | 'date' | 'likes' | 'comments'>
): Promise<Post> => {
  try {
    const response = await axios.post('/boards', post);
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error('Failed to create post');
  }
};

// 게시물 업데이트하기
export const updatePost = async (post: Post): Promise<Post> => {
  try {
    const response = await axios.put(`/boards/${post.id}`, post);
    return response.data;
  } catch (error) {
    console.error('Failed to update post:', error);
    throw new Error('Failed to update post');
  }
};

// 게시물 삭제하기
export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/boards/${id}`);
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw new Error('Failed to delete post');
  }
};

// 게시물에 좋아요 추가하기
export const likePost = async (id: number): Promise<Post> => {
  try {
    const response = await axios.post(`/boards/${id}/like`);
    return response.data;
  } catch (error) {
    console.error('Failed to like post:', error);
    throw new Error('Failed to like post');
  }
};
