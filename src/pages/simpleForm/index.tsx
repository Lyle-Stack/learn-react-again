import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const SimpleForm = () => {
  const [formValues, setFromValues] = useState({
    name: "",
    email: "",
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value, name } = event.target;
    if (!name) return;
    setFromValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("value from state (controlled): ", formValues);

    // logic here to submit formValues...
  };

  return (
    <div>
      <h1>SimpleForm</h1>
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
        onSubmit={handleSubmit}
      >
        <TextField
          id="name"
          size="small"
          name="name"
          label="Name"
          margin="none"
          fullWidth
          type="text"
          required
          helperText="Enter your name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <TextField
          id="email"
          size="small"
          name="email"
          label="E-mail"
          margin="none"
          fullWidth
          type="email"
          required
          helperText="Enter your E-mail"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
        <Box width="100%" pt={4}>
          <TextField
            id="formValues"
            label="Input State Result"
            margin="none"
            fullWidth
            disabled
            multiline
            maxRows={8}
            value={JSON.stringify(formValues, undefined, 4)}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SimpleForm;
