import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 400px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TextAreaField = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`;

const SelectField = styled.select`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  align-self: flex-end;

  &:hover {
    background-color: #2980b9;
  }
`;

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, category: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('strength'); // 기본 카테고리 설정

  if (!isVisible) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(title, description, category);
    setTitle('');
    setDescription('');
    setCategory('strength'); // 모달을 닫을 때 카테고리 초기화
  };

  const handleClose = () => {
    onClose();
    setTitle('');
    setDescription('');
    setCategory('strength');
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>새 경험 작성</ModalTitle>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextAreaField
            placeholder="경험 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <SelectField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="strength">근력 운동</option>
            <option value="cardio">유산소 운동</option>
            <option value="flexibility">유연성 운동</option>
          </SelectField>
          <SubmitButton type="submit">작성 완료</SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
