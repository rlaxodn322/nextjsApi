import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h3`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: none;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

interface CommentModalProps {
  isVisible: boolean;
  onClose: () => void;
  experience: any;
  newComment: string;
  setNewComment: (comment: string) => void;
  onAddComment: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isVisible,
  onClose,
  experience,
  newComment,
  setNewComment,
  onAddComment,
}) => {
  if (!isVisible) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>{experience.title}에 댓글을 추가하세요</ModalHeader>
        <CommentInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SubmitButton onClick={onAddComment}>댓글 추가</SubmitButton>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default CommentModal;
