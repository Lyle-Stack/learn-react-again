import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export type FetchDetailsOfCurrentTodo = (id: Todo["id"]) => Promise<void>;

export default function TodoItem({
  todo,
  fetchDetailsOfCurrentTodo,
}: {
  todo: Todo;
  fetchDetailsOfCurrentTodo: FetchDetailsOfCurrentTodo;
}) {
  return (
    <Card
      sx={{
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5" color="textSecondary">
          {todo.todo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => fetchDetailsOfCurrentTodo(todo.id)}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            opacity: 0.7,
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
