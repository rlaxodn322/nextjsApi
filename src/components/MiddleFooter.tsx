import React from 'react';
import styled from 'styled-components';

const MainBox = styled.div`
  width: 1200px;
  height: 400px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;
const SubBox = styled.div`
  margin: 10px;
  height: 90%;
  width: 20%;
  //border: 1px solid lightgray;
`;
const TitleBox = styled.div`
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const ImgBox = styled.div`
  display: flex;
`;
const Img2 = styled.img`
  width: 15%;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const StoryBox = styled.div`
  cursor: pointer;
  margin-top: 5px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const MiddleFooter: React.FC = () => {
  return (
    <>
      <MainBox>
        <SubBox>
          <div>
            <Img2
              style={{ width: '15%', marginBottom: '30px' }}
              src="icons/sns.svg"
            ></Img2>{' '}
          </div>
          <ImgBox style={{ display: 'flex' }}>
            <Img2
              style={{ width: '15%', marginRight: '10px' }}
              src="icons/facebook.svg"
            ></Img2>
            <Img2
              style={{ width: '15%', marginRight: '10px' }}
              src="icons/naver.svg"
            ></Img2>
            <Img2
              style={{ width: '15%', marginRight: '10px' }}
              src="icons/youtube.svg"
            ></Img2>
            <Img2
              style={{ width: '15%', marginRight: '10px' }}
              src="icons/insta.svg"
            ></Img2>
          </ImgBox>
        </SubBox>
        <SubBox>
          <TitleBox>Use cases</TitleBox>
          <StoryBox>US design</StoryBox>
          <StoryBox>UI design</StoryBox>
          <StoryBox>Wireframing</StoryBox>
          <StoryBox>Diagramming</StoryBox>
          <StoryBox>Brainstorming</StoryBox>
          <StoryBox>Online whiteboard</StoryBox>
          <StoryBox>Team collaboration</StoryBox>
        </SubBox>
        <SubBox>
          <TitleBox>Use cases</TitleBox>
          <StoryBox>Design</StoryBox>
          <StoryBox>Prototyping</StoryBox>
          <StoryBox>Development features</StoryBox>
          <StoryBox>Design systems</StoryBox>
          <StoryBox>Collaboration features</StoryBox>
          <StoryBox>Design process</StoryBox>
          <StoryBox>FigJam</StoryBox>
        </SubBox>
        <SubBox>
          <TitleBox>Resources</TitleBox>
          <StoryBox>Blog</StoryBox>
          <StoryBox>Best practices</StoryBox>
          <StoryBox>Colors</StoryBox>
          <StoryBox>Color wheel</StoryBox>
          <StoryBox>Support</StoryBox>
          <StoryBox>Developers</StoryBox>
          <StoryBox>Resource library</StoryBox>
        </SubBox>
      </MainBox>
    </>
  );
};

export default MiddleFooter;
