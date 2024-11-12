import { backUrl } from '@/config/config';
import { WeatherData1 } from '@/types/Post';
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchWeatherData = async (
  lat: number,
  lng: number
): Promise<WeatherData1> => {
  try {
    const response = await axios.get('/weather/current', {
      params: { lat, lng },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Fail', error);
    throw new Error('Fail weather');
  }
};
// export const fetchPetData1 = async (
//   numOfRows: number,
//   selectedRegion: string
// ): Promise<PetData1> => {
//   try {
//     const response = await axios.post('/pet/fetch', {
//       numOfRows,
//       selectedRegion,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Fail', error);
//     throw new Error('Fail Pet');
//   }
// };
