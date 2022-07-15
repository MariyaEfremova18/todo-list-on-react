import React from "react";
import style from "./DataSort.module.css";

const DataSort = ({ sortItemOnDate }) => {
  return (
    <div className={style.sorting}>
      <p>
        Sort by Date
        <button
          className={style.up}
          onClick={() => sortItemOnDate("ASC")}
        ></button>
        <button className={style.down} onClick={sortItemOnDate}></button>
      </p>
    </div>
  );
};

export default DataSort;
