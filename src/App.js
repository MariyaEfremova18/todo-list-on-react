import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import List from "./List";
import DataSort from "./DataSort";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { ITEMS_PER_PAGE, FILTER, SORT } from "./constants.js";

const App = () => {
  const [items, setItems] = useState([]);
  const [itemsTitle, setItemsTitle] = useState("");
  const [filter, setFilter] = useState(FILTER.ALL);
  const [sort, setSort] = useState(SORT.ASC);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
    const endItem = ITEMS_PER_PAGE * currentPage;

    const todos = items
      .filter((item) => {
        switch (filter) {
          case FILTER.ALL:
            return item;
          case FILTER.DONE:
            return item.completed === true;
          case FILTER.UNDONE:
            return item.completed === false;
        }
      })
      .sort((a, b) => {
        if (sort === SORT.ASC) {
          return a.createdAt - b.createdAt;
        } else if (sort === SORT.DESC) {
          return b.createdAt - a.createdAt;
        }
      })
      .slice(startItem, endItem);
    setFilteredTasks(todos);
  }, [filter, sort, currentPage, items]);

  const addItem = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      setItems([
        ...items,
        {
          id: Date.now(),
          title: itemsTitle,
          completed: false,
          createdAt: new Date(),
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
    const remainingItems = items.filter(
      (_, index) => index !== indexDeleteItem
    );
    setItems(remainingItems);
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
        <DataSort sort={sort} SORT={SORT} sortItemOnDate={sortItemOnDate} />
      ) : (
        ""
      )}

      <List
        onHandleChange={onHandleChange}
        filteredTasks={filteredTasks}
        deleteItem={deleteItem}
        checkItem={checkItem}
      />

      {items.length >= 1 ? (
        <Filter
          filter={filter}
          FILTER={FILTER}
          handleFilterItem={handleFilterItem}
        />
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
