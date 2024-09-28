import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, fectchListOfTodos } from "./fakeApi";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const StyledListBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Todos = () => {
  const {
    data: todoList,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["todoList"],
    queryFn: () => fectchListOfTodos(),
  });

  const getQueryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      getQueryClient.invalidateQueries({ queryKey: ["todoList"] });
    },
  });

  return (
    <StyledListBox>
      <List dense>
        {isLoading || !isSuccess ? (
          <h2>Loading...</h2>
        ) : !todoList.length ? (
          <Typography sx={{ mt: 4 }} variant="h3" component="p">
            No Todo Left
          </Typography>
        ) : (
          todoList.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    mutate(todo.id);
                  }}
                >
                  -
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>{todo.done ? "O" : "X"}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={todo.title} />
            </ListItem>
          ))
        )}
      </List>
    </StyledListBox>
  );
};

export default Todos;
