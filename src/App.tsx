import { useEffect, useState } from "react";
import classes from "./style.module.css";
import TodoItem, { Todo } from "./components/todoItem";

function App() {
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  async function fetchListOfTodos() {
    try {
      if (!loading) setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      if (result?.todos && result.todos?.length) {
        setTodoList(result.todos as Todo[]);
        setErrorMsg(null);
      } else {
        setErrorMsg("API response not right");
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setErrorMsg("Some error occured");
    }
  }

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>
        Simple Todo APP Using Material UI
      </h1>
      <div>
        {todoList && todoList.length
          ? todoList.map((todoItem) => <TodoItem todo={todoItem}></TodoItem>)
          : null}
      </div>
    </div>
  );
}

export default App;
