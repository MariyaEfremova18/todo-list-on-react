import React, { useState } from "react";
import style from "./Item.module.css";

const Item = ({
  item,
  checkItem,
  deleteItem,
  onHandleChange,
  setIsEditableItem,
  isEditableItem,
  value,
  setValue,
}) => {
  const date = item.createdAt;
  const currentDate = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = String(date.getFullYear()).slice(2);
  const strDate = `${currentDate}/${currentMonth}/${currentYear}`;

  return (
    <div
      className={style.itemOfList}
      onDoubleClick={() => setIsEditableItem(true)}
    >
      <div className={style.content}>
        <input
          type="checkbox"
          className={style.checkbox}
          defaultChecked={item.completed}
          onClick={() => checkItem(item.id)}
        />
        {isEditableItem ? (
          <input
            autoFocus
            className={style.editInput}
            value={value}
            onChange={({ target }) => setValue(target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                onHandleChange("title", value);
                setIsEditableItem(false);
              }
            }}
            onBlur={() => setIsEditableItem(false)}
          />
        ) : (
          <p>{item.title}</p>
        )}
      </div>
      <div className={style.dateAndDelete}>
        <p className={style.date}>{strDate}</p>
        <button onClick={() => deleteItem(item.id)}></button>
      </div>
    </div>
  );
};

export default Item;
