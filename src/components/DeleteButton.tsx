import styled from 'styled-components';
import { Button } from 'antd';

const DeleteButton = styled(Button)`
  background-color: #ff4d4f;
  color: white;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e63946;
  }
`;

export default DeleteButton;
