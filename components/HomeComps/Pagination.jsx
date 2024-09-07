// src/components/Pagination.js

import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers to display based on the current page
  const getPageNumbers = () => {
    const maxPageButtons = 5; // Number of page buttons to display
    const halfRange = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center space-x-2 justify-center">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="text-gray-500 hover:text-gray-700 disabled:text-gray-300"
      >
        &lt;
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-700'
          } w-8 h-8 flex items-center justify-center rounded-full`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="text-gray-500 hover:text-gray-700 disabled:text-gray-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
