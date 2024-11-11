'use client'; // 이 지시어를 맨 위에 추가하세요

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 10px 0;
`;

const NavContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1250px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  width: 10%;

  img {
    width: 40%;

    @media (max-width: 480px) {
      width: 80%;
    }
  }
`;

const NavLinks = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const NavLink = styled.div`
  margin: 15px 45px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin: 10px 20px;
  }

  @media (max-width: 480px) {
    margin: 5px 10px;
  }
`;

const App: React.FC = () => (
  <HeaderContainer>
    <NavContainer>
      <LogoContainer>
        <Link href="../">
          <img src="/icons/man.svg" alt="Logo" />
        </Link>
      </LogoContainer>
      <NavLinks>
        <Link href="/pet/01">
          <NavLink>유기견</NavLink>
        </Link>
        <Link href="/weather/01">
          <NavLink>날씨</NavLink>
        </Link>
        {/* <Link href="/board/01">
          <NavLink>게시판</NavLink>
        </Link>
        <Link href="/shop/01">
          <NavLink>쇼핑몰</NavLink>
        </Link>
        <Link href="/chat/01">
          <NavLink>채팅방</NavLink>
        </Link>
        <Link href="/groupchat/01">
          <NavLink>그룹챗</NavLink>
        </Link>
        <Link href="/community/01">
          <NavLink>커뮤니티</NavLink>
        </Link>
        <Link href="/toilet/01">
          <NavLink>똥싸개</NavLink>
        </Link>
        <Link href="/adst/01">
          <NavLink>명소</NavLink>
        </Link> */}
      </NavLinks>
    </NavContainer>
  </HeaderContainer>
);

export default App;
