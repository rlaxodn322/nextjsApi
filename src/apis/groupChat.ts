import axios from 'axios';
import { backUrl } from '../config/config';
import { Message } from '../types/Post';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export async function fetchmessage(): Promise<Message[]> {
  try {
    const response = await axios.get('/messages');
    if (!response.data) {
      console.log('data 없음');
      return [];
    } else {
      return response.data; // 전체 메시지 객체 반환
    }
  } catch (error) {
    console.error('api 호출 에러', error);
    throw error;
  }
}

export const sendmessage = async (message: string): Promise<Message> => {
  try {
    const response = await axios.post('/messages', { message });
    return response.data;
  } catch (error) {
    console.error('send error', error);
    throw error;
  }
};

export const deletemessage = async (id: number) => {
  try {
    await axios.delete(`/messages/${id}`);
  } catch (error) {
    console.error('delete error', error);
    throw new Error();
  }
};
