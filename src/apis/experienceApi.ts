import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchExperiences = async () => {
  const response = await axios.get('/experience');
  return response.data;
};

export const createExperience = async (title: string, description: string) => {
  const newPost = { title, description };
  const response = await axios.post('/experience', newPost);
  return response.data;
};

export const deleteExperience = async (id: number) => {
  await axios.delete(`/experience/${id}`);
};
