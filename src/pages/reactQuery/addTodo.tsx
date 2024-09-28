import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createNewTodo } from "./fakeApi";

type FormData = {
  title: string;
};

const AddTodo = () => {
  const { handleSubmit, control, setValue, setError } = useForm<FormData>({
    defaultValues: {
      title: "",
    },
  });

  const getQueryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNewTodo,
    onError: () =>
      setError(
        "title",
        {
          type: "disabled",
        },
        { shouldFocus: true },
      ),
    onSuccess: () => {
      setValue("title", "");
      getQueryClient.invalidateQueries({ queryKey: ["todoList"] });
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data.title.trim());
  };

  return (
    <Box
      component="form"
      width="100%"
      maxWidth={425}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, ...restFields }, fieldState }) => {
          return (
            <FormControl
              variant="standard"
              size="small"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box>
                <Input
                  {...restFields}
                  id={restFields.name}
                  onChange={(event) => {
                    setValue("title", event.target.value.trimStart());
                  }}
                />
                <FormHelperText error={Boolean(fieldState.error?.type)}>
                  {fieldState.error?.type === "disabled"
                    ? "some bad happened"
                    : fieldState.error?.type === "required"
                      ? "Please enter content"
                      : "Add a new todo"}
                </FormHelperText>
              </Box>
            </FormControl>
          );
        }}
      />
      <Button type="submit" variant="contained">
        Add New Todo
      </Button>
    </Box>
  );
};

export default AddTodo;
