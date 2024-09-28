const todoList = [
  {
    title: "Todo 1",
    id: 1,
    done: true,
  },
  {
    title: "Todo 2",
    id: 2,
    done: false,
  },
  {
    title: "Todo 3",
    id: 3,
    done: false,
  },
  {
    title: "Todo 4",
    id: 4,
    done: true,
  },
  {
    title: "Todo 5",
    id: 5,
    done: false,
  },
];

export const fectchListOfTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return todoList;
};

export const createNewTodo = async (title: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newTodo = {
    id: todoList.length + 1,
    title,
    done: false,
  };

  todoList.push(newTodo);

  return true;
};

export const deleteTodo = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const indexOfTodo = todoList.findIndex((todo) => todo.id === id);

  if (indexOfTodo < 0) return false;

  todoList.splice(indexOfTodo, 1);

  return true;
};
