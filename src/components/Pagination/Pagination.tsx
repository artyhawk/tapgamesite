import React, { FC } from "react";
import styles from "./Pagination.module.css";

/** Типизация пропсов для пагинации */
interface PaginationProps {
  rowsPerPage: number; // Текущее кол-во строк на странице
  setRowsPerPage: (value: number) => void; // Хендлер изменения кол-ва строк на странице

  currentPage: number; // Текущая страница (считаем с 1)
  totalItems: number; // Общее кол-во элементов (записей)
  onPageChange: (page: number) => void; // Хендлер смены страницы

  rowsPerPageOptions?: number[]; // Массив вариантов выбора "строк на странице"
}

/**
 * Компонент пагинации, повторяющий стиль, как на скриншоте (внизу).
 * Выводит «Строк на странице: x», «1–x из total» и кнопки переключения страниц.
 */
const Pagination: FC<PaginationProps> = ({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  totalItems,
  onPageChange,
  rowsPerPageOptions = [10, 20, 30, 50, 100]
}) => {
  // Посчитаем общее количество страниц
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  // Индекс первого и последнего элемента на текущей странице
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalItems);

  // Хендлер смены кол-ва строк на странице
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setRowsPerPage(newValue);
    // При изменении rowsPerPage, лучше вернуться на первую страницу
    onPageChange(1);
  };

  // Хендлеры смены страницы
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      {/* Блок "Строк на странице: ..." */}
      <div className={styles.rowsPerPageBlock}>
        <span className={styles.label}>Строк на странице:</span>
        <select className={styles.select} value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {rowsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Блок "1–30 из 10" */}
      <div className={styles.pageInfo}>
        {startIndex}–{endIndex} из {totalItems}
      </div>

      {/* Кнопки назад / вперёд */}
      <div className={styles.arrows}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.arrowButton}
        >
          <img src="/img/arrow-left.svg" alt="Предыдущая" />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={styles.arrowButton}
        >
          <img src="/img/arrow-right.svg" alt="Следующая" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
