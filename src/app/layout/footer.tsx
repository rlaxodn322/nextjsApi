'use client'; // 이 지시어를 맨 위에 추가하세요

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  padding: 10px;

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>taewoo</div>
    </FooterContainer>
  );
};

export default Footer;
