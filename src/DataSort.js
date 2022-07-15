import React from "react";
import style from "./DataSort.module.css";

const DataSort = () => {
  return (
    <div className={style.sorting}>
      <p>
        Sort by Date
        <button className={style.up}></button>
        <button className={style.down}></button>
      </p>
    </div>
  );
};

export default DataSort;
