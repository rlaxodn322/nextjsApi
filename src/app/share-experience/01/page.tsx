'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
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

const PostList = styled.div`
  margin-top: 20px;
`;

const PostItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

const PostLink = styled.span`
  color: #3498db;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NewPostButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #2980b9;
  }
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  font-size: 14px;
`;

const CommunityExperiencePage = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: '오늘 5km 달리기 완주했어요!', likes: 5, comments: [] },
    { id: 2, title: '등산 후기 - 한라산 정상 도전!', likes: 10, comments: [] },
  ]);

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <ExperienceContainer>
      <Title>운동 경험 커뮤니티 게시판</Title>
      <Link href="/create-post">
        <NewPostButton>새 글 작성</NewPostButton>
      </Link>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <Link href={`/post/${post.id}`} passHref>
              <PostLink>{post.title}</PostLink>
            </Link>
            <LikeButton onClick={() => handleLike(post.id)}>
              ❤️ {post.likes}
            </LikeButton>
          </PostItem>
        ))}
      </PostList>
    </ExperienceContainer>
  );
};

export default CommunityExperiencePage;
