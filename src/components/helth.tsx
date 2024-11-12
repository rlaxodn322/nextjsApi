import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import HelthUploadPage from './helthUpload';
import axios from 'axios';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  overflow-x: hidden;
  overflow-y: hidden;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #d5dae0 100%);
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #34495e;
  line-height: 1.6;
  text-align: center;
`;

const Button = styled.button`
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

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const UploadButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;
const FileCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #d5dae0 100%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HelthPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<any[]>([]);

  useEffect(() => {
    // 파일 목록을 불러오기
    axios.get('http://localhost:3001/uploads').then((response) => {
      setUploads(response.data);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('http://localhost:3001/uploads', formData)
        .then((response) => {
          console.log('File uploaded:', response.data);
          setUploads((prev) => [...prev, response.data.upload]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('File upload error:', error);
        });
    } else {
      alert('파일을 선택해 주세요');
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/uploads/${id}`)
      .then(() => {
        setUploads(uploads.filter((upload) => upload.id !== id));
      })
      .catch((error) => {
        console.error('File delete error:', error);
      });
  };

  return (
    <Container>
      <Title>오늘의 헬스 팁</Title>
      <Grid>
        <Card>
          <Paragraph>
            오늘은 전신 스트레칭을 해보세요! 몸의 유연성을 높이고 부상을
            예방하는데 좋습니다.
          </Paragraph>
        </Card>
        <Card>
          <Paragraph>
            헬스를 할 때 충분한 수분 섭취는 필수입니다. 운동 전후로 물을 자주
            마시세요.
          </Paragraph>
        </Card>
      </Grid>
      <Title>오늘의 추천 운동</Title>
      <Grid>
        <Card>
          <Paragraph>푸시업: 상체 근력을 강화하는 운동입니다.</Paragraph>
        </Card>
        <Card>
          <Paragraph>스쿼트: 하체 근력을 강화하는 운동입니다.</Paragraph>
        </Card>
      </Grid>
      <Title>운동 경험 공유 및 제품 리뷰</Title>
      <Grid>
        <Card>
          <Link href="/share-experience/01">
            <Button>운동 경험 공유하기</Button>
          </Link>
        </Card>
        <Card>
          <Link href="/product-reviews">
            <Button>제품 리뷰하기</Button>
          </Link>
        </Card>
      </Grid>
      <Title>운동 인증샷 페이지</Title>
      <Card>
        <Button onClick={() => setIsModalOpen(true)}>운동 인증샷 업로드</Button>
      </Card>

      <Title>업로드된 파일들</Title>
      <Grid>
        {uploads.map((upload) => (
          <FileCard key={upload.id}>
            <span>{upload.filename}</span>
            <Button onClick={() => handleDelete(upload.id)}>삭제</Button>
          </FileCard>
        ))}
      </Grid>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <ModalContainer>
          <ModalContent>
            <h3>사진 업로드</h3>
            <input type="file" onChange={handleFileChange} />
            <UploadButton onClick={handleUpload}>업로드</UploadButton>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              닫기
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
};

export default HelthPage;
