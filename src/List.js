import React from "react";
import Item from "./Item";
import style from "./List.module.css";

const List = (props) => {
  return (
    <ul className={style.list}>
      {props.items.map((item, index) => (
        <Item key={`item_${index}`} del={props.del} item={item} {...item} />
      ))}
    </ul>
  );
};

export default List;
