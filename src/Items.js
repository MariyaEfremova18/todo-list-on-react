import style from "./Items.module.css";

function Items() {
  return (
    <div>
      <ul>
        <li>
          <div>
            <input type="checkbox" className={style.checkbox} id="checkable" />
            <label htmlFor="checkable">Item</label>
          </div>
          <div>
            <span>Date</span>
            <button className={style.delete} id=""></button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Items;
