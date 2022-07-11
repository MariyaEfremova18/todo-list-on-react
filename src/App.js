import style from "./App.module.css";
import Header from "./Header";
import Sort from "./Sort";
import Items from "./Items";
import Filter from "./Filter";
import Pagination from "./Pagination";

function App() {
  return (
    <div className={style.wrapper}>
      <Header />
      <Sort />
      <Items />
      <Filter />
      <Pagination />
    </div>
  );
}

export default App;
