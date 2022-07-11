import React from "react";
import Items from "./Items";
import style from "./List.module.css";

const List = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <Items key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default List;
