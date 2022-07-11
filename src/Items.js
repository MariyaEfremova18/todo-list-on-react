import React from "react";
import style from "./Items.module.css";

const Items = (items) => {
  return (
    <div className={style.itemOfList}>
      <div className={style.content}>
        <input
          type="checkbox"
          className={style.checkbox}
          defaultChecked={false}
        />
        <p>{items.title}</p>
      </div>
      <button></button>
    </div>
  );
};

export default Items;
