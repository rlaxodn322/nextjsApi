'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { fetchPosts, createPost, deletePost } from '../apis/commapi';
import { Post1 } from '@/types/Post';
import Pagination from './Pagination'; // Pagination 컴포넌트 import

const POSTS_PER_PAGE = 6;

const Comm: React.FC = () => {
  const [posts, setPosts] = useState<Post1[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    };

    loadPosts();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      try {
        const createdPost = await createPost(newPost);
        setPosts((prevPosts) => [...prevPosts, createdPost]);
        setNewPost({ title: '', content: '' });
        setCurrentPage(Math.ceil((posts.length + 1) / POSTS_PER_PAGE));
      } catch (error) {
        console.error('Failed to create post', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deletePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>커뮤니티 게시판</h1>
      <div style={styles.postsContainer}>
        {currentPosts.length === 0 ? (
          <p style={styles.noPosts}>등록된 게시글이 없습니다.</p>
        ) : (
          <ul style={styles.postsList}>
            {currentPosts.map((post) => (
              <li key={post.id} style={styles.postItem}>
                <div style={styles.postHeader}>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={styles.deleteButton}
                  >
                    x
                  </button>
                </div>
                <p style={styles.postContent}>{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(posts.length / POSTS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
      <form onSubmit={handleSubmit} style={styles.form} id="post-form">
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={newPost.title}
          onChange={handleInputChange}
          style={styles.input}
        />
        <textarea
          name="content"
          placeholder="내용"
          value={newPost.content}
          onChange={handleInputChange}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          게시글 등록
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    //height: '600px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid lightgray',
  },
  header: {
    fontSize: '15px',
    marginBottom: '20px',
    textAlign: 'center' as 'center',
  },
  postsContainer: {
    marginTop: '20px',
    height: '400px',
    marginBottom: '80px', // 폼이 고정되므로 여백 추가
  },
  noPosts: {
    fontSize: '12px',
    color: '#777',

    textAlign: 'center' as 'center',
  },
  postsList: {
    listStyleType: 'none',
    padding: 0,
  },
  postItem: {
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
    position: 'relative' as 'relative',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTitle: {
    fontSize: '15px',
    margin: '0 0 5px 0',
  },
  postContent: {
    fontSize: '14px',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff0000',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '5px',
  },
  form: {
    //position: 'fixed' as 'fixed',
    width: '550px',
    margin: '0 auto',
    // bottom: '0',
    // left: '0',
    // right: '0',
    backgroundColor: 'white',
    borderTop: '1px solid #ccc',
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    zIndex: 1000, // 폼이 항상 최상단에 표시되도록 함
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    height: '50px',
    marginBottom: '10px',
    fontSize: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Comm;
