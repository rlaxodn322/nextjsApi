'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// 스타일링된 카드 컨테이너
const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  box-sizing: border-box;
`;

// 카드 제목
const CardTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

// 스타일링된 그리드 컨테이너
const Grid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 5px;
`;

// 스타일링된 카드 아이템
const CardItem = styled.div`
  flex: 1;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

// 스타일링된 이미지
const StyledImage = styled.img`
  width: 50px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2); /* 이미지 크기를 1.2배로 확대 */
  }
`;

// 이미지 설명
const ImageDescription = styled.div`
  text-align: center;
  margin-top: 10px;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

const BlogCard = () => (
  <CardContainer>
    <CardTitle>Card Title</CardTitle>
    <Grid>
      <Link href="/board/01">
        <CardItem>
          <StyledImage
            src="/icons/blog.svg" // 실제 이미지 경로로 변경
            alt="Description"
          />
          <ImageDescription>
            <h3>Blog Title</h3>
            <p>Additional description or details can go here.</p>
          </ImageDescription>
        </CardItem>
      </Link>
      <Link href="/shop/01">
        <CardItem>
          <StyledImage
            src="/icons/shop.svg" // 실제 이미지 경로로 변경
            alt="Description"
          />
          <ImageDescription>
            <h3>Shop Title</h3>
            <p>Additional description or details can go here.</p>
          </ImageDescription>
        </CardItem>
      </Link>
      <Link href="/chat/01">
        <CardItem>
          <StyledImage
            src="/icons/chat.svg" // 실제 이미지 경로로 변경
            alt="Description"
          />
          <ImageDescription>
            <h3>Chat Title</h3>
            <p>Additional description or details can go here.</p>
          </ImageDescription>
        </CardItem>
      </Link>
    </Grid>
    <Grid>
      <Link href="/groupchat/01">
        <CardItem>
          <StyledImage
            src="/icons/group.svg" // 실제 이미지 경로로 변경
            alt="Description"
          />
          <ImageDescription>
            <h3>GroupChat Title</h3>
            <p>Additional description or details can go here.</p>
          </ImageDescription>
        </CardItem>
      </Link>
      <Link href="/community/01">
        <CardItem>
          <StyledImage
            src="/icons/comm.svg" // 실제 이미지 경로로 변경
            alt="Description"
          />
          <ImageDescription>
            <h3>community Title</h3>
            <p>Additional description or details can go here.</p>
          </ImageDescription>
        </CardItem>
      </Link>
      <Link href="/toilet/01">
        <CardItem>
          <StyledImage
            src="/icons/poop.svg" // 실제 이미지 경로로 변경
            alt="Description"
          />
          <ImageDescription>
            <h3>toilet Title</h3>
            <p>Additional description or details can go here.</p>
          </ImageDescription>
        </CardItem>
      </Link>
    </Grid>
  </CardContainer>
);

export default BlogCard;
