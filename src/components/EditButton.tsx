import styled from 'styled-components';
import { Button } from 'antd';

const EditButton = styled(Button)`
  background-color: #ffc107;
  color: white;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003bb3;
  }
`;

export default EditButton;
