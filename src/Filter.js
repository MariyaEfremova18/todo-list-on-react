import style from "./Filter.module.css";

function Filter() {
  return (
    <div className={style.filter}>
      <button className={style.all}>All</button>
      <button className={style.done}>Done</button>
      <button className={style.undone}>Undone</button>
    </div>
  );
}

export default Filter;
