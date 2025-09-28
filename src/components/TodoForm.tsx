import { useState } from "react";
import "./styles/TodoForm.css";
import { task } from "../utils/interfaces";

interface props {
  addfunction: (task: task) => void;
  filterfunction: (filter: string) => void;
}

function TodoForm(props: props) {
  const [taskText, SetTaskText] = useState<string>("");

  //Отправка нового таска и фильтра для списка тасков
  function onAddTodoToList() {
    if (taskText.trim() !== "") {
      props.addfunction({
        id: Math.random().toString(16).slice(2),
        text: taskText,
        isActive: true,
      });
      SetTaskText("");
    }
  }
  const onChangeFilter = (filter: string) => props.filterfunction(filter);

  return (
    <div className="todo-form">
      <div className="todo-form_input-block">
        <input
          type="text"
          value={taskText}
          onChange={(e) => SetTaskText(e.target.value)}
        />
        <button onClick={() => onAddTodoToList()}>Добавить</button>
      </div>
      <select
        onChange={(e) => {
          onChangeFilter(e.target.value);
        }}
        name="fliter"
        defaultValue={"all"}
      >
        <option value="all">Все</option>
        <option value="active">Активные</option>
        <option value="completed">Выполненные</option>
      </select>
    </div>
  );
}
export default TodoForm;
