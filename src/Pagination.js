import React from "react";
import style from "./Pagination.module.css";
import { ITEMS_PER_PAGE } from "./constants.js";

const Pagination = ({
  items,
  changeCurrentPage,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const pageCount = [];

  for (let i = 1; i <= Math.ceil(items.length / ITEMS_PER_PAGE); i++) {
    pageCount.push(i);
  }

  return (
    <div>
      <ul className={style.pagination}>
        {pageCount.length > 1 ? (
          <button className={style.pageNumber} onClick={prevPage}>
            &laquo;
          </button>
        ) : (
          ""
        )}

        {pageCount.map((number) => (
          <li
            className={style.pageNumber}
            onClick={() => changeCurrentPage(number)}
            key={number}
          >
            <button
              className={currentPage === number ? `${style.active}` : null}
            >
              {number}
            </button>
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
