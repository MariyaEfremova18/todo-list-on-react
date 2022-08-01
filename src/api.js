import axios from "axios";
import { ITEMS_PER_PAGE, USER_ID } from "./constants.js";

const BASE_URL = process.env.REACT_APP_TODO_API;
const todoAPI = axios.create({
  baseURL: BASE_URL,
});

export const getItems = (filter, sort, currentPage) => {
  return todoAPI.get(`/tasks/${USER_ID}`, {
    params: {
      filterBy: filter,
      order: sort,
      pp: ITEMS_PER_PAGE,
      page: currentPage,
    },
  });
};

export const createNewItem = (itemTitle) => {
  return todoAPI.post(`/task/${USER_ID}`, {
    name: itemTitle,
  });
};

export const changeItem = (event, uuid) => {
  return todoAPI.patch(`/task/${USER_ID}/${uuid}`, {
    name: event.target.value.trim(),
  });
};

export const checkThisItem = (uuid, done) => {
  return todoAPI.patch(`/task/${USER_ID}/${uuid}`, {
    done: done,
  });
};

export const deleteThisItem = (uuid) => {
  return todoAPI.delete(`/task/${USER_ID}/${uuid}`);
};
