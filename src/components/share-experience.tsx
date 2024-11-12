import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ExperiencePageContainer = styled.div`
  padding: 20px;
`;

const ShareButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ShareExperiencePage = () => {
  return (
    <ExperiencePageContainer>
      <h2>운동 경험을 공유하세요!</h2>
      <Link href="/create-post">
        <ShareButton>새 글 작성</ShareButton>
      </Link>
    </ExperiencePageContainer>
  );
};

export default ShareExperiencePage;
