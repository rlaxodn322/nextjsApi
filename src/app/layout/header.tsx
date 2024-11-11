import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
const divparents: React.CSSProperties = {
  margin: '0 auto',
  alignItems: 'center',
  width: '1250px',
  display: 'flex',
  justifyContent: 'space-between',
};
const divstyle: React.CSSProperties = {
  margin: '15px 45px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
};

const App: React.FC = () => (
  <>
    <div style={{ width: '100%', backgroundColor: 'white' }}>
      <div style={divparents}>
        <div style={{ width: '10%' }}>
          <Link href="../">
            <img src="/icons/man.svg" style={{ width: '40%' }}></img>
          </Link>
        </div>
        <div style={{ width: '80%', display: 'flex' }}>
          <Link href="/pet/01">
            <div style={divstyle}>유기견</div>
          </Link>
          {/* <Link href="/board/01">
            <div style={divstyle}>게시판</div>
          </Link>
          <Link href="/shop/01">
            <div style={divstyle}>쇼핑몰</div>
          </Link>
          <Link href="/chat/01">
            <div style={divstyle}>채팅방</div>{' '}
          </Link>
          <Link href="/groupchat/01">
            <div style={divstyle}>그룹챗</div>
          </Link>
          <Link href="/community/01">
            <div style={divstyle}>커뮤니티</div>
          </Link>
          <Link href="/toilet/01">
            <div style={divstyle}>똥싸개</div>
          </Link>
          <Link href="/adst/01">
            <div style={divstyle}>명소</div>
          </Link> */}
        </div>
      </div>
    </div>
  </>
);

export default App;
