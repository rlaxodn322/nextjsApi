'use client';
import React from 'react';
import Chat from '../../../components/Chat';
const Chatting: React.FC = () => {
  return (
    <div
      style={{
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '150px',
      }}
    >
      <Chat />
    </div>
  );
};

export default Chatting;
