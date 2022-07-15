import React from "react";
import style from "./Filter.module.css";

const Filter = ({ onChange }) => {
  return (
    <div className={style.filterButtons}>
      <button onClick={() => onChange(undefined)}>All</button>
      <button onClick={() => onChange(true)}>Done</button>
      <button onClick={() => onChange(false)}>Undone</button>
    </div>
  );
};

export default Filter;
