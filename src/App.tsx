import { useEffect, useState } from "react";
import { task } from "./utils/interfaces";
import { saveToLocalStorage } from "./utils/localsave";
import { getFromLocalStorage } from "./utils/localsave";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [list, Setlist] = useState<task[]>(getFromLocalStorage());
  const [filteredList, SetFilteredList] = useState<task[]>(list);
  const [filter, SetFilter] = useState<string>("all");

  //Фильтрация через useEffect
  useEffect(() => {
    if (filter === "all") {
      SetFilteredList(list);
    } else if (filter === "active") {
      SetFilteredList(list.filter((todo) => todo.isActive));
    } else if (filter === "completed") {
      SetFilteredList(list.filter((todo) => !todo.isActive));
    }
  }, [list, filter]);

  //Функции изменения списка тасков
  const addToList = (task: task) => {
    const newList = [...list, task];
    Setlist(newList);
    saveToLocalStorage(newList);
  };

  const getCountActiveTodos = () => {
    let result: number = 0;
    list.forEach((todo) => {
      return todo.isActive ? result++ : result;
    });

    return result;
  };

  const deleteFromList = (id: string) => {
    Setlist((prev) => prev.filter((todo) => todo.id !== id));
    saveToLocalStorage(list.filter((todo) => todo.id !== id));
  };

  const changeFilter = (filter: string) => SetFilter(filter);

  function changeTodo(task: task) {
    Setlist((prev) => {
      return prev.map((todo) => {
        if (todo.id === task.id) {
          return { ...task };
        } else {
          return todo;
        }
      });
    });
    saveToLocalStorage(
      list.map((todo) => {
        if (todo.id === task.id) {
          return { ...task };
        } else {
          return todo;
        }
      })
    );
  }

  return (
    <div className="app-body">
      <h2>Осталось {getCountActiveTodos()} задач</h2>
      <TodoForm
        filterfunction={changeFilter}
        addfunction={addToList}
      ></TodoForm>
      <TodoList
        changeTodo={changeTodo}
        deleteFunction={deleteFromList}
        list={filteredList}
      ></TodoList>
    </div>
  );
}

export default App;
