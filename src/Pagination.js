import style from "./Pagination.module.css";

function Pagination() {
  return (
    <div className={style.pagination}>
      <button className={style.previous}>&laquo;</button>
      <button className={style.pageNumber}>1</button>
      <button className={style.pageNumber}>2</button>
      <button className={style.next}>&raquo;</button>
    </div>
  );
}

export default Pagination;
