import React, { useState } from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
`;

const UploadButton = styled.button`
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

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log('파일 업로드:', file.name);
      // 실제 업로드 API 호출 로직 추가
    }
  };

  return (
    <UploadContainer>
      <h2>운동 인증샷 업로드</h2>
      <FileInput type="file" onChange={handleFileChange} />
      {file && <p>선택된 파일: {file.name}</p>}
      <UploadButton onClick={handleUpload}>업로드</UploadButton>
    </UploadContainer>
  );
};

export default UploadPage;
