export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="page-pagination" aria-label="Paginação da lista">
      <button
        type="button"
        className="page-pagination-button"
        onClick={goToPrevious}
        disabled={currentPage <= 1}
      >
        Anterior
      </button>
      <span className="page-pagination-info">
        Página {currentPage} de {totalPages}
      </span>
      <button
        type="button"
        className="page-pagination-button"
        onClick={goToNext}
        disabled={currentPage >= totalPages}
      >
        Próxima
      </button>
    </div>
  );
}
