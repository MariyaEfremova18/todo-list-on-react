import React from "react";
import style from "./Filter.module.css";

const Filter = ({ filter, handleFilterItem }) => {
  return (
    <div className={style.filterButtons}>
      <button
        className={filter === undefined ? `${style.active}` : null}
        onClick={() => handleFilterItem(undefined)}
      >
        All
      </button>
      <button
        className={filter === true ? `${style.active}` : null}
        onClick={() => handleFilterItem(true)}
      >
        Done
      </button>
      <button
        className={filter === false ? `${style.active}` : null}
        onClick={() => handleFilterItem(false)}
      >
        Undone
      </button>
    </div>
  );
};

export default Filter;
