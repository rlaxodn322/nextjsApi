'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import dayjs from 'dayjs';
import BoardContainer from '../../../components/BoardContainer';
import ButtonContainer from '../../../components/ButtonContainer';
import PostList from '../../../components/PostList';
import PostItem from '../../../components/PostItem';
import WriteButton from '../../../components/WriteButton';
import PostModal from '../../../components/PostModal';
import { Post } from '../../../types/Post';
import Confetti from 'react-confetti';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../../../apis/board';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };

    loadPosts();
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

  const handleSubmit = async () => {
    try {
      if (editingPost) {
        const updatedPost = {
          ...editingPost,
          title: newPost.title,
          content: newPost.content,
          date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        };
        await updatePost(updatedPost);
        const updatedPosts = posts.map((post) =>
          post.id === editingPost.id ? updatedPost : post
        );
        setPosts(updatedPosts);
      } else {
        const newPostWithDate = {
          ...newPost,
          date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          likes: 0,
          comments: [],
        };
        const createdPost = await createPost(newPostWithDate);
        setPosts((prevPosts) => [...prevPosts, createdPost]);
      }
      setNewPost({ title: '', content: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleLike = async (id: number) => {
    try {
      const updatedPost = await likePost(id);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  return (
    <BoardContainer>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>게시판</h2>
      <ButtonContainer>
        <WriteButton onClick={() => openModal()}>글 작성</WriteButton>
      </ButtonContainer>
      <PostList>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={() => openModal(post)}
            onDelete={() => handleDelete(post.id)}
            onLike={() => handleLike(post.id)}
          />
        ))}
      </PostList>
      <PostModal
        isVisible={isModalOpen}
        title={editingPost ? '글 수정' : '새 글 작성'}
        post={newPost}
        onInputChange={handleInputChange}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
      {showConfetti && (
        <Confetti
          numberOfPieces={1000}
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.2}
          wind={0}
        />
      )}
    </BoardContainer>
  );
};

export default Blog;
