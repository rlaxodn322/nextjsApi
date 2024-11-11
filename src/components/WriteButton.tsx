import styled from 'styled-components';
import { Button } from 'antd';

const WriteButton = styled(Button)`
  padding: 0px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default WriteButton;
