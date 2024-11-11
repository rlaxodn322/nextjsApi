import React from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
const ImgStyle = styled.div`
  width: 1200px;
  height: 300px;
  background: lightgray;
`;
const ImgBox: React.FC = () => {
  return (
    <>
      <ImgStyle>
        <div>
          <Carousel></Carousel>
        </div>
      </ImgStyle>
    </>
  );
};

export default ImgBox;
