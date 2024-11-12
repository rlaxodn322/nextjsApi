'use client';
import React from 'react';
import Helth from '../../../components/helth';
import styled from 'styled-components';
import Link from 'next/link'; // 페이지 간 이동을 위한 링크
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;
const Grid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  background: linear-gradient(135deg, #ffffff 0%, #d5dae0 100%);
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;
const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;
const Paragraph = styled.p`
  font-size: 1rem;
  color: #34495e;
  line-height: 1.6;
  text-align: center;
`;

const Button = styled.button`
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
const Weather: React.FC = () => {
  return (
    <>
      <Helth></Helth>
    </>
  );
};

export default Weather;
