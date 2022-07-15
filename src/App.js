import React, { useEffect, useState } from "react";
import List from "./List";
import style from "./App.module.css";
import DataSort from "./DataSort";
import Filter from "./Filter";
import Pagination from "./Pagination";
const ITEMS_PER_PAGE = 5;

const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(undefined);
  const [sort, setSort] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsTitle, setitemsTitle] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const todos = items
      .filter((item) =>
        typeof filter === "boolean" ? item.completed === filter : item
      )
      .slice((currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE * currentPage);
    setFilteredTasks(todos);
  }, [filter, sort, currentPage, items]);

  const addItem = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      const date = new Date();
      const currentDate = date.getDate();
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();
      const strDate = `${currentDate}/${currentMonth}/${currentYear}`;

      setItems([
        ...items,
        {
          id: Date.now(),
          title: itemsTitle,
          completed: false,
          date: strDate,
        },
      ]);

      setitemsTitle("");
    }
  };

  const changeCurrentPage = (value) => setCurrentPage(value);

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handleFilterItem = (value) => setFilter(value);

  const checkItem = (id) => {
    const arr = items.map((i) => {
      if (i.id === id) {
        const element = { ...i };
        element.completed = !i.completed;
        return element;
      }
      return i;
    });
    setItems(arr);
  };

  const deleteItem = (id) => {
    const indexDeleteItem = items.findIndex((i) => i.id === id);
    setItems(items.filter((_, index) => index !== indexDeleteItem));
  };

  return (
    <div className={style.wrapper}>
      <h1>ToDo</h1>

      <input
        type="text"
        value={itemsTitle}
        onChange={(event) => setitemsTitle(event.target.value)}
        onKeyDown={addItem}
        placeholder="I want to..."
      />

      {items.length >= 1 ? <DataSort /> : ""}

      <List items={filteredTasks} del={deleteItem} change={checkItem} />

      {items.length >= 1 ? <Filter onChange={handleFilterItem} /> : ""}

      {items.length > ITEMS_PER_PAGE ? (
        <Pagination
          items={items}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          changeCurrentPage={changeCurrentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
