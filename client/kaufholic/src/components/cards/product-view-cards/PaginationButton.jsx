/* eslint-disable react/prop-types */
import styles from "./paginationbutton.module.css";
export const PaginationButton = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((pageNo, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(pageNo)}
          className={
            currentPage === pageNo
              ? ` ${styles.paginationBtn} ${styles.active}`
              : `${styles.paginationBtn}`
          }
        >
          {pageNo}
        </button>
      ))}
    </>
  );
};
