import style from "./Sort.module.css";

function Sort() {
  return (
    <div>
      <p className={style.dataSort}>
        Sort by Date
        <button className={style.up}></button>
        <button className={style.down}></button>
      </p>
    </div>
  );
}

export default Sort;
