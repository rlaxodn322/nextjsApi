import { backUrl } from '@/config/config';
import { PetData1 } from '@/types/Post';
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchPetData = async (): Promise<PetData1> => {
  try {
    const response = await axios.get('/pet/current');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Fail', error);
    throw new Error('Fail Pet');
  }
};
export const fetchPetData1 = async (numOfRows: number): Promise<PetData1> => {
  try {
    const response = await axios.post('/pet/fetch', { numOfRows });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Fail', error);
    throw new Error('Fail Pet');
  }
};
