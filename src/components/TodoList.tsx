import "./styles/TodoList.css";
import { task } from "../utils/interfaces";
import TodoItem from "./TodoItem";

interface props {
  list: task[];
  deleteFunction: (id: string) => void;
  changeTodo: (todo: task) => void;
}

function TodoList(props: props) {
  const list = props.list;

  //Функции для передачи функций из тасков через пропсы
  function deleteTask(id: string) {
    props.deleteFunction(id);
  }

  function changeTodo(todo: task) {
    props.changeTodo(todo);
  }

  return (
    <ul className="todo-list">
      {list.length > 0 ? (
        list.map((todo: task) => {
          return (
            <TodoItem
              deleteFunction={deleteTask}
              key={todo.id}
              changeTodo={changeTodo}
              itemInfo={todo}
            ></TodoItem>
          );
        })
      ) : (
        <h2>Нет задач</h2>
      )}
    </ul>
  );
}

export default TodoList;
