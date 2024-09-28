import { Box, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todos from "./todos";
import AddTodo from "./addTodo";

const queryClient = new QueryClient();

const ReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        <Typography component="h1" fontSize={24}>
          React Query - Todo List
        </Typography>
        <Todos />
        <AddTodo />
      </Box>
    </QueryClientProvider>
  );
};

export default ReactQuery;
