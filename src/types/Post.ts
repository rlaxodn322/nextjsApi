export interface Post {
  createdAt: any;
  id: number;
  date: string;
  likes: number; // 좋아요 수
  //comments: Comment[]; // 댓글 배열
  title: string;
  content: string;
  comments: { id: number; author: string; content: string; date: string }[];
}
export interface Post1 {
  id: number;
  date: string;
  //comments: Comment[]; // 댓글 배열
  title: string;
  content: string;
  comments: { id: number; author: string; content: string; date: string }[];
}

export interface Comment {
  id: number;
  content: string;
  date: string;
}
export interface Message {
  data: any;
  id: number;
  content: string;
  text: string;
}

export interface ApiData {
  Publtolt: any;
  data: any;
  lat: number;
  lng: number;
  name: string;
  address: string;
  tel: string;

  money: string;
}
export interface ApiData2 {
  ADST: any;
  name: string;
  lat: number;
  lng: number;
  address: string;
  tel: string;
  money: string;
}

export interface PetData1 {
  kindCd?: string;
  popfile?: string;
  desertionNo?: string;
  happenDt?: string;
  happenPlace?: string;
  colorCd?: string;
  age?: string;
  weight?: string;
  noticeNo?: string;
  noticeSdt?: string;
  noticeEdt?: string;
  processState?: string;
  sexCd?: string;
  specialMark?: string;
  careNm?: string;
  careTel?: string;
  careAddr?: string;
  orgNm?: string;
  chargeNm?: string;
  [x: string]: any;
}
