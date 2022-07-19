import React, { useState } from "react";
import style from "./Item.module.css";

const Item = ({ item, checkItem, deleteItem, onHandleChange }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(item.title);
  return (
    <div className={style.itemOfList} onClick={() => setIsEditable(true)}>
      <div className={style.content}>
        <input
          type="checkbox"
          className={style.checkbox}
          defaultChecked={item.completed}
          onKeyDown={() => checkItem(item.id)}
        />
        {isEditable ? (
          <input
            autoFocus
            className={style.editInput}
            value={value}
            onChange={({ target }) => setValue(target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                onHandleChange("title", value);
                setIsEditable(false);
              }
            }}
            onBlur={() => setIsEditable(false)}
          />
        ) : (
          <p>{item.title}</p>
        )}
      </div>
      <div className={style.dateAndDelete}>
        <p className={style.date}>{item.date}</p>
        <button onClick={() => deleteItem(item.id)}></button>
      </div>
    </div>
  );
};

export default Item;
