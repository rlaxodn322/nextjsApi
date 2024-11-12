'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import ShareExperiencePage from '@/components/share-experience';
const ExperienceContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CommunityExperiencePage = () => {
  return (
    <ExperienceContainer>
      <ShareExperiencePage></ShareExperiencePage>
    </ExperienceContainer>
  );
};

export default CommunityExperiencePage;
