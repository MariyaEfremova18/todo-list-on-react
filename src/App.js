import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import List from "./components/List";
import DataSort from "./components/DataSort";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import ModalWindow from "./components/ModalWindow";
import { ITEMS_PER_PAGE, FILTER, SORT } from "./constants.js";
import { getItems, createNewItem, deleteThisItem, changeItem } from "./api.js";

const App = () => {
  const [items, setItems] = useState([]);
  const [itemTitle, setItemTitle] = useState("");
  const [filter, setFilter] = useState(FILTER.ALL);
  const [sort, setSort] = useState(SORT.DESC);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [editedItemUuid, setEditedItemUuid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTodoData = async () => {
    const response = await getItems().catch((err) => {
      if (err.response.status === 400) {
        setErrorMessage("Task not created");
      }
    });
    setItems(response.data.tasks);
    setItemsCount(response.data.count);
  };

  useEffect(() => {
    fetchTodoData();
  }, [currentPage, filter, sort]);

  const addItem = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      createNewItem()
        .then(() => fetchTodoData())
        .catch((err) => {
          if (err.response.status === 400) {
            setErrorMessage("The task with the same name already create");
          } else if (err.response.status === 422) {
            setErrorMessage("You input invalid symbols");
          }
        });
      setItemTitle("");
    }
  };

  const checkItem = (uuid, done) => {
    changeItem(uuid, done).then(() => {
      if (itemsCount <= 1) {
        setFilter(FILTER.ALL);
      } else fetchTodoData();
    });
  };

  const deleteItem = async (uuid) => {
    await deleteThisItem(uuid)
      .then(() => {
        fetchTodoData();
      })
      .catch((err) => {
        setErrorMessage(err.message);
        if (err.response.status === 404) {
          setErrorMessage("Task not found");
        }
      });
    if (itemsCount > 5) {
      const pageNumber =
        itemsCount % ITEMS_PER_PAGE === 1 ? currentPage - 1 : currentPage;

      setCurrentPage(pageNumber);
    } else if (itemsCount < 2) {
      setFilter(FILTER.ALL);
    }
  };

  const changeCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const nextPage = (value) => setCurrentPage(value);

  const prevPage = (value) => setCurrentPage(value);

  const handleFilterItem = (filter) => {
    setFilter(filter);
    setCurrentPage(1);
  };

  const sortItemByDate = (sort) => {
    setSort(sort);
    setCurrentPage(1);
  };

  const editItem = (uuid) => {
    setEditedItemUuid(uuid);
  };

  const cancelChanges = () => {
    setEditedItemUuid("");
  };

  const onHandleChange = (e, uuid) => {
    changeItem(e, uuid)
      .then(() => fetchTodoData())
      .catch((err) => {
        if (err.response.status === 400) {
          setErrorMessage("The task with the same name already create");
        } else if (err.response.status === 422) {
          setErrorMessage("You input invalid symbols");
        }
      });
    setEditedItemUuid("");
  };

  return (
    <div>
      <div className={style.wrapper}>
        <h1>ToDo</h1>

        <ModalWindow
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        <input
          className={style.inputItem}
          type="text"
          value={itemTitle}
          onChange={(event) => setItemTitle(event.target.value)}
          onKeyDown={addItem}
          placeholder="I want to..."
        />

        <DataSort sort={sort} sortItemByDate={sortItemByDate} />

        <List
          onHandleChange={onHandleChange}
          items={items}
          deleteItem={deleteItem}
          checkItem={checkItem}
          editItem={editItem}
          cancelChanges={cancelChanges}
          editedItemUuid={editedItemUuid}
        />

        <Filter
          filter={filter}
          setFilter={setFilter}
          items={items}
          handleFilterItem={handleFilterItem}
        />

        {itemsCount > ITEMS_PER_PAGE ? (
          <Pagination
            currentPage={currentPage}
            items={items}
            changeCurrentPage={changeCurrentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            itemsCount={itemsCount}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
