import style from "./Header.module.css";

function Header() {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>ToDo</h1>
      <input type="text" className={style.input} placeholder="I want to..." />
    </div>
  );
}

export default Header;
