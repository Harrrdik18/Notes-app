import React from 'react';

const Pagination = ({ totalNotes, notesPerPage, currentPage, setCurrentPage, theme }) => {
  const pageNumbers = Array.from({ length: Math.ceil(totalNotes / notesPerPage) }, (_, i) => i + 1);

  const getButtonClassName = (number) => {
    if (number === currentPage) {
      return `px-3 py-2 rounded-full font-medium ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
    } else {
      return `px-3 py-2 rounded-full font-medium ${theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
    }
  };

  return (
    <div className={`pagination mt-8 flex justify-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={getButtonClassName(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
