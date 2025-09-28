import { task } from "../utils/interfaces";

//Функции для работы с localStorage

export function saveToLocalStorage(list: task[]) {
  localStorage.setItem("list", JSON.stringify(list));
}

export function getFromLocalStorage() {
  const list: string | null = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}
