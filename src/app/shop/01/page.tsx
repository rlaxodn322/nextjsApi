'use client'; // 이 컴포넌트는 클라이언트 측에서 실행됩니다.

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Input, Button, Upload, message } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { RcFile } from 'antd/es/upload/interface';
import Confetti from 'react-confetti';
// 전체 컨테이너
const ProductContainer = styled.div`
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

// 상품 목록 컨테이너
const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

// 상품 항목
const ProductItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #f3eded;
  }
  img {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
    font-size: 14px;
  }

  .actions {
    margin-top: 10px;
    display: flex;
    gap: 10px;
  }
`;

// 등록 버튼 스타일
const RegisterButton = styled(Button)`
  padding: 0 20px;
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

// 수정 버튼 스타일
const EditButton = styled(Button)`
  background-color: #ffc107;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

// 삭제 버튼 스타일
const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

// 포스트 타입 정의
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  uploadTime: string; // 업로드 시간 추가
}

// DraggableItem 컴포넌트
const ItemTypes = {
  PRODUCT: 'product',
};

interface DraggableItemProps {
  product: Product;
  index: number;
  moveProduct: (fromIndex: number, toIndex: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  product,
  index,
  moveProduct,
  onEdit,
  onDelete,
}) => {
  const [, ref] = useDrag({
    type: ItemTypes.PRODUCT,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.PRODUCT,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveProduct(item.index, index);
        item.index = index;
      }
    },
  });

  const combinedRef = (node: HTMLDivElement | null) => {
    ref(node);
    drop(node);
  };

  return (
    <div ref={combinedRef}>
      <ProductItem>
        <img
          style={{ width: '200px', height: '100px' }}
          src={product.image}
          alt={product.name}
        />
        <p>이름: {product.name}</p>
        <p>내용: {product.description}</p>
        <p>가격: {product.price}</p>
        <p>{product.uploadTime}</p>
        <div className="actions">
          <EditButton icon={<EditOutlined />} onClick={() => onEdit(product)}>
            수정
          </EditButton>
          <DeleteButton
            icon={<DeleteOutlined />}
            onClick={() => onDelete(product.id)}
          >
            삭제
          </DeleteButton>
        </div>
      </ProductItem>
    </div>
  );
};

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);

  useEffect(() => {
    // 페이지 로드 시 로컬스토리지에서 상품 목록을 불러옵니다.
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({ name: '', description: '', price: '', image: '' });
  };

  const openEditModal = (product: Product) => {
    setCurrentProductId(product.id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setNewProduct({ name: '', description: '', price: '', image: '' });
    setCurrentProductId(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image
    ) {
      message.error('모든 필드를 입력하세요.');
      return;
    }

    const newProductWithId = {
      ...newProduct,
      id: products.length + 1,
      uploadTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 업로드 시간 추가
    };
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    const updatedProducts = [...products, newProductWithId];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    closeModal();
  };

  const handleEdit = () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image
    ) {
      message.error('모든 필드를 입력하세요.');
      return;
    }

    const updatedProducts = products.map((product) =>
      product.id === currentProductId
        ? {
            ...newProduct,
            id: currentProductId!,
            uploadTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 수정 시간 업데이트
          }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    closeEditModal();
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const moveProduct = (fromIndex: number, toIndex: number) => {
    const updatedProducts = [...products];
    const [movedProduct] = updatedProducts.splice(fromIndex, 1);
    updatedProducts.splice(toIndex, 0, movedProduct);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ProductContainer>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          상품 등록 및 목록
        </h2>
        <ButtonContainer>
          <RegisterButton onClick={openModal}>상품 등록</RegisterButton>
        </ButtonContainer>
        <ProductList>
          {products.map((product, index) => (
            <DraggableItem
              key={product.id}
              product={product}
              index={index}
              moveProduct={moveProduct}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </ProductList>
        <Modal
          title="상품 등록"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={closeModal}
        >
          <Input
            name="name"
            placeholder="상품 이름"
            value={newProduct.name}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            name="description"
            placeholder="상품 설명"
            value={newProduct.description}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            name="price"
            placeholder="가격"
            value={newProduct.price}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Upload
            name="image"
            showUploadList={false}
            beforeUpload={(file) => {
              handleImageChange(file as RcFile);
              return false; // 업로드를 방지하고 이미지만 처리하도록 설정
            }}
          >
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="상품 미리보기"
              style={{ width: '100%', marginTop: '10px' }}
            />
          )}
        </Modal>
        <Modal
          title="상품 수정"
          open={isEditModalOpen}
          onOk={handleEdit}
          onCancel={closeEditModal}
        >
          <Input
            name="name"
            placeholder="상품 이름"
            value={newProduct.name}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            name="description"
            placeholder="상품 설명"
            value={newProduct.description}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            name="price"
            placeholder="가격"
            value={newProduct.price}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Upload
            name="image"
            showUploadList={false}
            beforeUpload={(file) => {
              handleImageChange(file as RcFile);
              return false; // 업로드를 방지하고 이미지만 처리하도록 설정
            }}
          >
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="상품 미리보기"
              style={{ width: '100%', marginTop: '10px' }}
            />
          )}
        </Modal>
      </ProductContainer>
      {showConfetti && (
        <Confetti
          numberOfPieces={1000}
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.2}
          wind={0}
        />
      )}
    </DndProvider>
  );
};

export default ProductPage;
