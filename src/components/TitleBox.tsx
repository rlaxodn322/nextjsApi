import React, { useState, useEffect } from 'react';
import { Button, Input, Modal } from 'antd';
import styled from 'styled-components';
const TitleStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 300px;
  background-color: white;
`;
const DiaryEntry = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;
const TitleBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [diaryEntries, setDiaryEntries] = useState<string[]>([]);
  useEffect(() => {
    const savedEntries = JSON.parse(
      sessionStorage.getItem('diaryEntries') || '[]'
    );
    setDiaryEntries(savedEntries);
  }, []);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    const updatedEntries = [...diaryEntries, modalInput];
    setDiaryEntries(updatedEntries);
    localStorage.setItem('modalInput', modalInput);
    sessionStorage.setItem('modalInput', modalInput);
    setIsModalOpen(false);
    setModalInput('');
  };
  return (
    <>
      <TitleStyle>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '35px' }}>Title</h2>
          <h2 style={{ fontSize: '20px' }}>SubTitle</h2>
          <Button
            style={{ backgroundColor: 'gray', color: 'white' }}
            onClick={handleOpenModal}
          >
            Button
          </Button>
          <Button style={{ backgroundColor: 'black', color: 'white' }}>
            Button
          </Button>
        </div>
      </TitleStyle>
      <Modal
        title="Enter Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCloseModal}
      >
        <Input
          placeholder="Enter some text"
          value={modalInput}
          onChange={(e) => setModalInput(e.target.value)}
        ></Input>
      </Modal>
      <div style={{ padding: '20px', backgroundColor: 'white' }}>
        <h3>Diary Entries</h3>
        {diaryEntries.map((entry, index) => (
          <DiaryEntry key={index}>{entry}</DiaryEntry>
        ))}
      </div>
    </>
  );
};

export default TitleBox;
