import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface Review {
  id: number;
  productName: string;
  reviewText: string;
  rating: number;
}
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
const Container = styled.div`
  padding: 40px;
  background-color: #f8f9fc;
  border-radius: 15px;
  color: black;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;
const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewItem = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
`;
const HealthPage = () => {
  const [productName, setProductName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);

  // 상품 등록

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/reviews/${id}`);
      setReviews((pre) => pre.filter((review) => review.id !== id));
      console.log(`${id}`);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('ERROR', error);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const reviewData = {
      productName,
      reviewText,
      rating,
    };
    try {
      const response = await axios.post(
        'http://localhost:3001/reviews',
        reviewData
      );
      console.log('Review submitted:', response.data);
      // 추가 처리 (예: 알림, 폼 초기화 등)
      setReviews((pre) => [...pre, response.data]);

      setProductName('');
      setReviewText('');
      setRating(1);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Container>
      <h1>제품 리뷰 작성</h1>
      <ReviewForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="제품명"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextArea
          placeholder="리뷰 내용"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div>
          <label>평점: </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <SubmitButton type="submit">리뷰 제출</SubmitButton>
      </ReviewForm>
      <h1>제품 리뷰</h1>
      <ReviewList>
        {reviews.map((review) => (
          <ReviewItem key={review.id}>
            <h3>{review.productName}</h3>
            <p>{review.reviewText}</p>
            <p>Rating: {review.rating} / 5</p>
            <DeleteButton onClick={() => handleDelete(review.id)}>
              삭제
            </DeleteButton>
          </ReviewItem>
        ))}
      </ReviewList>
    </Container>
  );
};

export default HealthPage;
