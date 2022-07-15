import React from "react";
import style from "./Item.module.css";

const Item = ({ item, change, del }) => {
  return (
    <div className={style.itemOfList}>
      <div className={style.content}>
        <input
          type="checkbox"
          className={style.checkbox}
          defaultChecked={item.completed}
          onClick={() => change(item.id)}
        />
        <p>{item.title}</p>
      </div>
      <p className={style.date}>{item.date}</p>
      <button onClick={() => del(item.id)}></button>
    </div>
  );
};

export default Item;
