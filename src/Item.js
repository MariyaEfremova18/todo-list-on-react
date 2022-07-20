import React from "react";
import style from "./Item.module.css";

const Item = ({
  item,
  checkItem,
  deleteItem,
  editItem,
  onHandleChange,
  blurItem,
}) => {
  const date = item.createdAt;
  const currentDate = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = String(date.getFullYear()).slice(2);
  const strDate = `${currentDate}/${currentMonth}/${currentYear}`;

  return (
    <div className={style.itemOfList} onDoubleClick={() => editItem(item.id)}>
      <div className={style.content}>
        <input
          type="checkbox"
          className={style.checkbox}
          defaultChecked={item.completed}
          onClick={() => checkItem(item.id)}
        />
        {item.edited ? (
          <input
            autoFocus
            className={style.editInput}
            defaultValue={item.title}
            onChange={({ target }) => (item.title = target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                onHandleChange("title", e.target.value.trim());
                item.edited = false;
              }
            }}
            onBlur={() => blurItem(item.id, item.title)}
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
