import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({
  ITEMS_PER_PAGE,
  items,
  changeCurrentPage,
  nextPage,
  prevPage,
}) => {
  const pageCount = [];

  for (let i = 1; i <= Math.ceil(items.length / ITEMS_PER_PAGE); i++) {
    pageCount.push(i);
  }

  return (
    <div>
      <ul className={style.pagination}>
        <button className={style.pageNumber} onClick={prevPage}>
          &laquo;
        </button>

        {pageCount.map((number) => (
          <li
            className={style.pageNumber}
            onClick={() => changeCurrentPage(number)}
            key={number}
          >
            <button>{number}</button>
          </li>
        ))}

        {pageCount.length > 1 ? (
          <button className={style.pageNumber} onClick={nextPage}>
            &raquo;
          </button>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Pagination;
