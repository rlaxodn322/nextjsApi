'use client'; // This component will run on the client-side

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Input, Button, Popconfirm } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
// 게시판 전체 컨테이너
const BoardContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

// 게시글 목록 컨테이너
const PostList = styled.div`
  border-top: 1px solid #ddd;
`;

// 게시글 항목
const PostItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }
`;

// 글 작성 및 삭제 버튼
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

// 삭제 버튼 스타일
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

// 수정 버튼 스타일
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

// 포스트 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    // Load posts from local storage on initial render
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  const openModal = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      setNewPost({ title: post.title, content: post.content });
    } else {
      setEditingPost(null);
      setNewPost({ title: '', content: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingPost) {
      // Edit existing post
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id
          ? {
              ...post,
              title: newPost.title,
              content: newPost.content,
              date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }
          : post
      );
      setPosts(updatedPosts);
    } else {
      // Add new post
      const newPostWithDate = {
        ...newPost,
        id: posts.length + 1,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };
      const updatedPosts = [...posts, newPostWithDate];
      setPosts(updatedPosts);
    }
    localStorage.setItem('posts', JSON.stringify(posts));
    setNewPost({ title: '', content: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <BoardContainer>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>게시판</h2>
      <ButtonContainer>
        <WriteButton onClick={() => openModal()}>글 작성</WriteButton>
      </ButtonContainer>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>작성일: {post.date}</p>
            </div>
            <div>
              <EditButton
                icon={<EditOutlined />}
                onClick={() => openModal(post)}
              >
                수정
              </EditButton>
              <Popconfirm
                title="정말로 삭제하시겠습니까?"
                onConfirm={() => handleDelete(post.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteButton icon={<DeleteOutlined />}>삭제</DeleteButton>
              </Popconfirm>
            </div>
          </PostItem>
        ))}
      </PostList>
      <Modal
        title={editingPost ? '글 수정' : '새 글 작성'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
      >
        <Input
          name="title"
          placeholder="제목"
          value={newPost.title}
          onChange={handleInputChange}
          style={{ marginBottom: '10px' }}
        />
        <Input.TextArea
          name="content"
          placeholder="내용"
          value={newPost.content}
          onChange={handleInputChange}
          rows={4}
        />
      </Modal>
    </BoardContainer>
  );
};

export default Blog;
