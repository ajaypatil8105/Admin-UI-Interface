import React from "react";

function Pagination({
  currentPage,
  handlePageChange,
  totalPages,
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <button
          className={`pagination-button prev-next`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`pagination-button ${currentPage === pageNumber ? "active" : ""}`}
          onClick={() => handlePageChange(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className={`pagination-button prev-next`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;


