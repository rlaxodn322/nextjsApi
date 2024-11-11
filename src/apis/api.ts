import axios from 'axios';
import { backUrl } from '../config/config';
import { ApiData, ApiData2 } from '@/types/Post';
import { NextApiRequest, NextApiResponse } from 'next';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchApiData = async (): Promise<ApiData> => {
  try {
    const response = await axios.get('/api1/data');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Fali ', error);
    throw new Error('Fali');
  }
};
export const fetchApiData1 = async (): Promise<ApiData> => {
  try {
    const response = await axios.get('/api1/data1');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Fali', error);
    throw new Error('Fali');
  }
};
export default async function handler(
  req: { method: string; body: { petId: any; comment: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          success?: boolean;
          comment?: { id: number; text: any };
          message?: string;
        }): void;
        new (): any;
      };
    };
  }
) {
  if (req.method === 'POST') {
    const { petId, comment } = req.body;
    // 댓글을 데이터베이스나 다른 저장소에 추가하는 로직을 작성
    // 예: DB에 댓글 추가하고, 성공적으로 추가된 댓글을 반환

    try {
      const newComment = { id: Date.now(), text: comment }; // 더미 데이터로 구현
      // 예: DB에 댓글 저장 후 반환
      return res.status(200).json({ success: true, comment: newComment });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: '댓글 추가 실패' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
export const fetchADST = async (): Promise<ApiData2> => {
  try {
    const response = await axios.get('api1/ADSTdata');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Fail', error);
    throw new Error('Fali');
  }
};
