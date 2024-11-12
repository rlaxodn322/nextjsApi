import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  background-color: #f8f9fc;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const Grid = styled.div`
  display: grid;
  gap: 30px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  background: linear-gradient(135deg, #ffffff 0%, #eceff1 100%);
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
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
  padding: 30px;
  border-radius: 15px;
  width: 450px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1rem;

  &:hover {
    background-color: #c0392b;
  }
`;

const UploadButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1rem;

  &:hover {
    background-color: #27ae60;
  }
`;

const FileCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #eceff1 100%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const HelthPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<any[]>([]);

  useEffect(() => {
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
      <div>
        {/* 스트레칭 팁 카드 */}
        <Grid>
          {['전신 스트레칭으로 몸의 유연성 증가', '운동 전후 수분 섭취는 필수'].map((tip, index) => (
            <Card key={index}>
              <Paragraph>{tip}</Paragraph>
            </Card>
          ))}
        </Grid>

        {/* 추천 운동 제목 */}
        <Title>오늘의 추천 운동</Title>

        {/* 운동 추천 카드 */}
        <Grid>
          {[
            { title: '푸시업', description: '상체 근력 강화' },
            { title: '스쿼트', description: '하체 근력 강화' },
          ].map((exercise, index) => (
            <Card key={index}>
              <Paragraph>
                {exercise.title}: {exercise.description}
              </Paragraph>
            </Card>
          ))}
        </Grid>
      </div>
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
            <CloseButton onClick={() => setIsModalOpen(false)}>닫기</CloseButton>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
};

export default HelthPage;
