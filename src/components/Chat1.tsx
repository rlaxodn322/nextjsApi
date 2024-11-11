'use client';
import React, { useState, useEffect, useRef } from 'react';
import { deletemessage, fetchmessage, sendmessage } from '../apis/groupChat';
import { Message } from '../types/Post';
import { useRecoilState } from 'recoil';
import { chatState } from '../recoil/atoms/state';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chat1, setChat1] = useRecoilState(chatState); // Recoil 상태 사용
  const chatBoxRef = useRef<HTMLDivElement>(null); // 채팅 박스를 참조하는 ref

  useEffect(() => {
    // 컴포넌트가 마운트될 때 서버에서 데이터를 가져옴
    const fetchData = async () => {
      try {
        // 서버에서 데이터를 가져올 때 Message 배열을 반환한다고 가정
        const data: Message[] = await fetchmessage();
        console.log('서버에서 가져온 데이터:', data);
        setChat1(data);
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 채팅 내용이 변경될 때마다 스크롤을 맨 아래로 이동
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat1]);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        // 메시지를 전송하고 서버에서 새로운 메시지 객체를 반환한다고 가정
        const response: Message = await sendmessage(message);
        console.log('서버 응답:', response);
        setChat1((prevChat) => [...prevChat, response]);
        setMessage('');
      } catch (error) {
        console.error('메시지 전송 에러:', error);
      }
    }
  };
  const handleDelete = async (id: number) => {
    if (window.confirm('정말 이 채팅을 삭제하시겠습니까?')) {
      try {
        await deletemessage(id);
        setChat1((prevChat) => prevChat.filter((msg) => msg.id !== id));
      } catch (error) {
        console.error('삭제 에러:', error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox} ref={chatBoxRef}>
        {chat1.map((msg) => (
          <div key={msg.id} style={styles.message}>
            {msg.content} {/* 메시지의 내용을 표시 */}
            <button
              onClick={() => handleDelete(msg.id)}
              style={styles.deleteButton}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          전송
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  chatBox: {
    width: '100%',
    maxHeight: '300px',
    overflowY: 'auto' as 'auto',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  message: {
    position: 'relative' as 'relative', // 상대 위치 설정
    margin: '5px 0',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#e0e0e0',
  },
  deleteButton: {
    position: 'absolute' as 'absolute', // 절대 위치 설정
    right: '10px',
    top: '10px',
    padding: '5px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    cursor: 'pointer',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
  },
  button: {
    marginLeft: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Chat;
