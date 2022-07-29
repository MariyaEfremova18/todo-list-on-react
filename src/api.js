import axios from "axios";
import { ITEMS_PER_PAGE, USER_ID } from "./constants.js";

const BASE_URL = process.env.REACT_APP_TODO_API;
const todoAPI = axios.create({
  baseURL: BASE_URL,
});

export const getItems = (filter, sort, currentPage) => {
  todoAPI.get(`/tasks/${USER_ID}`, {
    params: {
      filterBy: filter,
      order: sort,
      pp: ITEMS_PER_PAGE,
      page: currentPage,
    },
  });
};

export const createNewItem = (itemTitle) => {
  todoAPI.post(`/task/${USER_ID}`, {
    params: {
      name: itemTitle,
    },
  });
};

export const changeItem = (uuid, done, e) => {
  todoAPI.patch(`/task/${USER_ID}/${uuid}`, {
    params: {
      name: e.target.value.trim(),
      done: done,
    },
  });
};

export const deleteThisItem = (uuid) => {
  todoAPI.delete(`/task/${USER_ID}/${uuid}`);
};
