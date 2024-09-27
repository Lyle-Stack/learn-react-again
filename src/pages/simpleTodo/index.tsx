import { useEffect, useState } from "react";
import classes from "../../style.module.css";
import TodoItem, { Todo } from "./todoItem";
import { FetchDetailsOfCurrentTodo } from "./todoItem";
import TodoDetails from "./todoDetails";
import { Box, Skeleton } from "@mui/material";

function Home() {
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const [todoDetails, setTodoDetails] = useState<null | Todo>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchDetailsOfCurrentTodo: FetchDetailsOfCurrentTodo = async (
    currentTodoId,
  ) => {
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${currentTodoId}`,
      );
      const result = await apiResponse.json();
      console.log(result);

      if (result) {
        setTodoDetails(result as Todo);
        setOpenDialog(true);

        if (errorMsg) setErrorMsg(null);
      } else {
        setOpenDialog(false);
        setErrorMsg("API response not right");
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Some error occured");
    }
  };

  const fetchListOfTodos = async () => {
    try {
      if (!loading) setLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 5_000);
      });
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      if (result?.todos && result.todos?.length) {
        setTodoList(result.todos as Todo[]);

        if (errorMsg) setErrorMsg(null);
      } else {
        setErrorMsg("API response not right");
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setErrorMsg("Some error occured");
    }
  };

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100svw"
        height="100svh"
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="90%"
          height="90%"
        />
      </Box>
    );

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>
        Simple Todo APP Using Material UI
      </h1>

      <div className={classes.todoListWrapper}>
        {todoList && todoList.length
          ? todoList.map((todoItem) => (
              <TodoItem
                key={todoItem.id}
                todo={todoItem}
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
              ></TodoItem>
            ))
          : null}
      </div>
      <TodoDetails
        todoDetails={todoDetails}
        openDialog={openDialog}
        onClose={() => {
          setTodoDetails(null);
          setOpenDialog(false);
        }}
      />
    </div>
  );
}

export default Home;
