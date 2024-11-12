import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';
import HelthModal from '../components/helthModal';
const ExperiencePageContainer = styled.div`
  padding: 40px 20px;
  background-color: #f5f7fa;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ShareButton = styled.button`
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

const ExperienceList = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ExperienceCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ExperienceTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ExperienceDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  flex-grow: 1;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  margin-top: 15px;
  padding: 8px 20px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 30px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ShareExperiencePage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [description, setDescription] = useState('');
  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSubmit = async (title: string, description: string) => {
    const newPost = { title, description };

    try {
      // 새 경험을 서버에 전송
      await axios.post('http://localhost:3001/experience', newPost);

      // 경험을 리스트에 추가 (UI에서 새로 렌더링)
      setExperiences((prevExperiences) => [
        ...prevExperiences,
        { title, description }, // 서버에서 응답받은 데이터로 업데이트 가능
      ]);

      toggleModal(); // 모달 닫기
    } catch (error) {
      console.error('Error submitting the post:', error);
    }
  };

  useEffect(() => {
    // Assuming a backend API that returns experiences
    axios.get('http://localhost:3001/experience').then((response) => {
      setExperiences(response.data);
    });
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const filteredExperiences =
    selectedCategory === 'all'
      ? experiences
      : experiences.filter((exp) => exp.category === selectedCategory);
  return (
    <ExperiencePageContainer>
      <Title>운동 경험을 공유하세요!</Title>

      <FilterContainer>
        <FilterSelect onChange={handleCategoryChange} value={selectedCategory}>
          <option value="all">모든 카테고리</option>
          <option value="strength">근력 운동</option>
          <option value="cardio">유산소 운동</option>
          <option value="flexibility">유연성 운동</option>
        </FilterSelect>
      </FilterContainer>

      <ShareButton onClick={toggleModal}>새 글 작성</ShareButton>

      <ExperienceList>
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.title}-${experience.description}-${index}`}
            >
              {' '}
              {/* 고유한 key */}
              <ExperienceTitle>{experience.title}</ExperienceTitle>
              <ExperienceDescription>
                {experience.description.slice(0, 100)}...
              </ExperienceDescription>
              <ViewButton href={`/experiences/${experience.id}`}>
                자세히 보기
              </ViewButton>
            </ExperienceCard>
          ))
        ) : (
          <p>등록된 경험이 없습니다.</p>
        )}
      </ExperienceList>

      {/* 모달을 추가합니다 */}
      <HelthModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSubmit={handleSubmit}
      />
    </ExperiencePageContainer>
  );
};

export default ShareExperiencePage;
