import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  nickname: string;
  email: string;
  checkbox: [boolean, boolean];
};

const ReactHookForm = () => {
  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      nickname: "",
      email: "",
      checkbox: [false, false],
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={3}
    >
      <Typography component="h1" fontSize={24}>
        React Hook From - Subscription
      </Typography>
      <Box
        component="form"
        width="100%"
        maxWidth={425}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="nickname"
          control={control}
          rules={{
            required: true,
            minLength: 2,
          }}
          render={({ field, fieldState }) => {
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
                <FormLabel htmlFor={field.name}>Nickname</FormLabel>
                <Box>
                  <Input {...field} id={field.name} />
                  <FormHelperText error={Boolean(fieldState.error?.type)}>
                    {fieldState.error?.type === "minLength"
                      ? "At least 2 characters"
                      : fieldState.error?.type === "required"
                        ? "Please enter email"
                        : "What you want us to call you?"}
                  </FormHelperText>
                </Box>
              </FormControl>
            );
          }}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: new RegExp(/^[\w-\.]{3,}@([\w-]+\.)+[\w-]{2,4}$/),
          }}
          render={({ field, fieldState }) => {
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
                <FormLabel htmlFor={field.name}>E-mail</FormLabel>
                <Box>
                  <Input {...field} id={field.name} />
                  <FormHelperText error={Boolean(fieldState.error?.type)}>
                    {fieldState.error?.type === "pattern"
                      ? "It is not an e-mail address"
                      : fieldState.error?.type === "required"
                        ? "Please enter email"
                        : "We'll never share your email."}
                  </FormHelperText>
                </Box>
              </FormControl>
            );
          }}
        />
        <Controller
          name="checkbox"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={1}
              >
                <FormControlLabel
                  label="You have to say YES to all"
                  control={
                    <Checkbox
                      size="small"
                      sx={{ padding: 0.5 }}
                      checked={field.value.every((f) => f)}
                      indeterminate={field.value[0] !== field.value[1]}
                    />
                  }
                  onChange={() => {
                    if (field.value.every((f) => f))
                      setValue("checkbox", [false, false]);
                    else setValue("checkbox", [true, true]);
                  }}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  ml={3}
                >
                  <FormControlLabel
                    label="Subscribe Rule #1"
                    control={
                      <Checkbox
                        size="small"
                        sx={{ padding: 0.5 }}
                        checked={field.value[0]}
                      />
                    }
                    onChange={() =>
                      setValue("checkbox", [!field.value[0], field.value[1]])
                    }
                  />
                  <FormControlLabel
                    label="Subscribe Rule #2"
                    control={
                      <Checkbox
                        size="small"
                        sx={{ padding: 0.5 }}
                        checked={field.value[1]}
                      />
                    }
                    onChange={() =>
                      setValue("checkbox", [field.value[0], !field.value[1]])
                    }
                  />
                </Box>
              </Box>
            );
          }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ReactHookForm;
