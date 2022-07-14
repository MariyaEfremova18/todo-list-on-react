import React from "react";
import style from "./Item.module.css";

const Item = (props) => {
  return (
    <div className={style.itemOfList}>
      <div className={style.content}>
        <input
          type="checkbox"
          className={style.checkbox}
          defaultChecked={false}
        />
        <p>{props.item.title}</p>
      </div>
      <button onClick={() => props.del(props.item.id)}></button>
    </div>
  );
};

export default Item;
