import { useState } from "react";
import { task } from "../utils/interfaces";
import "./styles/TodoItem.css";

interface props {
  itemInfo: task;
  deleteFunction: (id: string) => void;
  changeTodo: (todo: task) => void;
}

function TodoItem(props: props) {
  const [todo, SetTodo] = useState<task>(props.itemInfo);
  const [isTodoEdit, SetIsEdit] = useState<boolean>(false);

  //Отправка айди таска для удаления
  const deleteTask = (id: string) => props.deleteFunction(id);

  //Функции отправки изменного таска в список
  const changeActive = () => {
    SetTodo((prev) => {
      return { ...prev, isActive: !prev.isActive };
    });
    props.changeTodo({ ...todo, isActive: !todo.isActive });
  };
  const changeEdit = () => {
    if (isTodoEdit) {
      SetIsEdit((prev) => !prev);
      props.changeTodo({ ...todo, text: todo.text });
    } else {
      SetIsEdit((prev) => !prev);
    }
  };

  return (
    <li className={`todo-item${todo.isActive ? " active" : ""}`}>
      <p className="todo-item-text">{todo.text}</p>
      <input
        type="text"
        style={{ display: `${isTodoEdit ? "block" : "none"}` }}
        value={todo.text}
        onChange={(e) =>
          SetTodo((prev) => {
            return { ...prev, text: e.target.value };
          })
        }
      />
      <div className="todo-item-control-block">
        <div className="todo-item-control-block-item">
          <input
            className="todo-item-control-block-input"
            type="checkbox"
            onChange={() => changeActive()}
            name="active"
            defaultChecked={!todo.isActive}
          />
        </div>
        <div className="todo-item-control-block-item">
          <button className="todo-item-btn-edit" onClick={() => changeEdit()}>
            {isTodoEdit ? "Принять" : "Редактировать"}
          </button>
        </div>
        <div className="todo-item-control-block-item">
          <button
            className="todo-item-btn-delete"
            onClick={() => deleteTask(todo.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
