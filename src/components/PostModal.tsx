import React, { ChangeEvent } from 'react';
import { Modal, Input } from 'antd';

interface PostModalProps {
  isVisible: boolean;
  title: string;
  post: { title: string; content: string };
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isVisible,
  title,
  post,
  onInputChange,
  onClose,
  onSubmit,
}) => (
  <Modal title={title} open={isVisible} onOk={onSubmit} onCancel={onClose}>
    <Input
      name="title"
      placeholder="제목"
      value={post.title}
      onChange={onInputChange}
      style={{ marginBottom: '10px' }}
    />
    <Input.TextArea
      name="content"
      placeholder="내용"
      value={post.content}
      onChange={onInputChange}
      rows={4}
    />
  </Modal>
);

export default PostModal;
