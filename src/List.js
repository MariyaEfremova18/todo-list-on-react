import React from "react";
import Item from "./Item";
import style from "./List.module.css";

const List = (props) => {
  return (
    <ul className={style.list}>
      {props.items.map((item) => (
        <Item
          onHandleChange={props.onHandleChange(item.id)}
          key={Math.random()}
          del={props.del}
          item={item}
          change={props.change}
          {...item}
        />
      ))}
    </ul>
  );
};

export default List;
