// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div style={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        style={styles.pageButton}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <span style={styles.pageIndicator}>{currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        style={styles.pageButton}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  pageButton: {
    backgroundColor: '#007BFF',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
  },
  pageIndicator: {
    fontSize: '16px',
    margin: '0 10px',
  },
};

export default Pagination;
