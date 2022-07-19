import React, { useEffect, useState } from "react";
import List from "./List";
import style from "./App.module.css";
import DataSort from "./DataSort";
import Filter from "./Filter";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const App = () => {
  const [items, setItems] = useState([]);
  const [itemsTitle, setItemsTitle] = useState("");
  const [filter, setFilter] = useState(undefined);
  const [sort, setSort] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const todos = items
      .filter((item) =>
        typeof filter === "boolean" ? item.completed === filter : item
      )
      .sort((a, b) => {
        if (sort === "ASC") return a.createdAt - b.createdAt;
        return b.createdAt - a.createdAt;
      })
      .slice((currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE * currentPage);
    setFilteredTasks(todos);
  }, [filter, sort, currentPage, items]);

  const addItem = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const date = new Date();
      const currentDate = date.getDate();
      const currentMonth = date.getMonth();
      const currentYear = String(date.getFullYear()).slice(2);
      const strDate = `${currentMonth}/${currentDate}/${currentYear}`;

      setItems([
        ...items,
        {
          id: Date.now(),
          title: itemsTitle,
          completed: false,
          date: strDate,
          createdAt: date,
        },
      ]);

      setItemsTitle("");
    }
  };

  const onHandleChange = (id) => {
    return (key, value) =>
      setItems((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            return { ...todo, [key]: value };
          }
          return todo;
        })
      );
  };

  const changeCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handleFilterItem = (value) => {
    setCurrentPage(1);
    setFilter(value);
  };

  const sortItemOnDate = (value) => setSort(value);

  const checkItem = (id) => {
    const checkedItems = items.map((i) => {
      if (i.id === id) {
        const element = { ...i };
        element.completed = !i.completed;
        return element;
      }
      return i;
    });
    setItems(checkedItems);
  };

  const deleteItem = (id) => {
    const indexDeleteItem = items.findIndex((i) => i.id === id);
    setItems(items.filter((_, index) => index !== indexDeleteItem));
  };

  return (
    <div className={style.wrapper}>
      <h1>ToDo</h1>

      <input
        className={style.inputItem}
        type="text"
        value={itemsTitle}
        onChange={(event) => setItemsTitle(event.target.value)}
        onKeyDown={addItem}
        placeholder="I want to..."
      />

      {items.length >= 1 ? (
        <DataSort sort={sort} sortItemOnDate={sortItemOnDate} />
      ) : (
        ""
      )}

      <List
        onHandleChange={onHandleChange}
        items={filteredTasks}
        del={deleteItem}
        change={checkItem}
      />

      {items.length >= 1 ? (
        <Filter filter={filter} handleFilterItem={handleFilterItem} />
      ) : (
        ""
      )}

      {items.length > ITEMS_PER_PAGE ? (
        <Pagination
          currentPage={currentPage}
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
