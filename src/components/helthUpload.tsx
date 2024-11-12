import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
const PhotoContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  font-size: 24px;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const PhotoItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LikeButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
`;

const CommentButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
`;
const CommunityPhotoPage = () => {
  const [photos, setPhotos] = useState([
    { id: 1, src: '/icons/blog.svg', likes: 3 },
    { id: 2, src: '/icons/chat.svg', likes: 5 },
  ]);

  const handleLike = (id: number) => {
    setPhotos(
      photos.map((photo) =>
        photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
      )
    );
  };

  return (
    <PhotoContainer>
      <Title>운동 인증샷 커뮤니티 게시판</Title>
      <label htmlFor="file-upload">
        <button>사진 업로드</button>
      </label>
      <input
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;
          if (file) {
            console.log('Uploaded file:', file);
          }
        }}
      />
      <PhotoGrid>
        {photos.map((photo) => (
          <PhotoItem key={photo.id}>
            <img
              src={photo.src}
              alt={`운동 인증샷 ${photo.id}`}
              style={{ width: '100%', height: '100%' }}
            />
            <LikeButton onClick={() => handleLike(photo.id)}>
              ❤️ {photo.likes}
            </LikeButton>
            <CommentButton>💬 댓글</CommentButton>
          </PhotoItem>
        ))}
      </PhotoGrid>
    </PhotoContainer>
  );
};

export default CommunityPhotoPage;
