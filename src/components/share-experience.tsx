import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  fetchExperiences,
  createExperience,
  deleteExperience,
} from '../apis/experienceApi';
import HelthModal from './helthModal';
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

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
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
  margin-top: 10px;
  padding: 4px 12px; /* 패딩을 줄여 버튼의 크기를 더 작게 */
  background-color: #3498db;
  color: white;
  font-size: 0.85rem; /* 글꼴 크기를 조금 더 작게 */
  text-decoration: none;
  border-radius: 15px; /* 둥근 모서리를 줄임 */
  width: 100px; /* 버튼 너비를 고정하여 너무 길어지지 않게 */
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  padding: 4px 12px;
  background-color: #e74c3c;
  color: white;
  font-size: 0.85rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 100px; /* 버튼 너비를 고정 */
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #c0392b;
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
    try {
      const newExperience = await createExperience(title, description);
      setExperiences((preEx) => [...preEx, newExperience]);
      toggleModal();
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const experiencesData = await fetchExperiences();
        setExperiences(experiencesData);
      } catch (error) {
        console.error('ERROR', error);
      }
    };
    loadExperiences();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteExperience(id);
      setExperiences((preExper) =>
        preExper.filter((experiences) => experiences.id !== id)
      );
    } catch (error) {
      console.error('Error', error);
    }
  };
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
          filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id}>
              <ExperienceTitle>{experience.title}</ExperienceTitle>
              <ExperienceDescription>
                {experience.description.slice(0, 100)}...
              </ExperienceDescription>
              <ViewButton href={`/experiences/${experience.id}`}>
                자세히 보기
              </ViewButton>
              <DeleteButton onClick={() => handleDelete(experience.id)}>
                삭제
              </DeleteButton>
            </ExperienceCard>
          ))
        ) : (
          <p>등록된 경험이 없습니다.</p>
        )}
      </ExperienceList>

      {/* Modal 컴포넌트 추가 */}
      <HelthModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSubmit={handleSubmit}
      />
    </ExperiencePageContainer>
  );
};

export default ShareExperiencePage;
