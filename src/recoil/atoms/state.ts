import { atom } from 'recoil';
import { ApiData, Message, PetData1, WeatherData1 } from '../../types/Post';
export const state = atom({
  key: 'state',
  default: [],
});

// 메시지 상태를 정의
export const chatState = atom<Message[]>({
  key: 'chatState', // 고유한 키
  default: [], // 초기 상태
});

export const toiletState = atom<ApiData[]>({
  key: 'toiletState',
  default: [],
});

export const petState = atom<PetData1[]>({
  key: 'petState',
  default: [],
});

export const secondToiletState = atom<ApiData[]>({
  key: 'secondToiletState',
  default: [],
});
export const weatherState = atom<WeatherData1[]>({
  key: 'weatherState',
  default: [],
});
