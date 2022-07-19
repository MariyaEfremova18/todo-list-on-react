import React from "react";
import Item from "./Item";
import style from "./List.module.css";

const List = ({
  onHandleChange,
  filteredTasks,
  deleteItem,
  checkItem,
  setIsEditableItem,
  isEditableItem,
  value,
  setValue,
}) => {
  return (
    <ul className={style.list}>
      {filteredTasks.map((item) => (
        <Item
          onHandleChange={onHandleChange(item.id)}
          key={item.id}
          deleteItem={deleteItem}
          item={item}
          checkItem={checkItem}
          setIsEditableItem={setIsEditableItem}
          isEditableItem={isEditableItem}
          value={value}
          setValue={setValue}
        />
      ))}
    </ul>
  );
};

export default List;
