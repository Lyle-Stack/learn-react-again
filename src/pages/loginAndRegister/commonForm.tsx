import { Box, Button, TextField, Typography } from "@mui/material";
import { FormElement } from "./config";
import { useState } from "react";

interface CommonFormProps {
  onSubmit: (formValues: { [key: string]: string }) => void;
  formElements: Array<FormElement>;
  error?: {
    fields: Set<string>;
    message: string;
    errorClean?: (fieldName: string) => void;
  };
}

const CommonForm = ({ formElements, onSubmit, error }: CommonFormProps) => {
  const [formValues, setFromValues] = useState<{ [key: string]: string }>(
    formElements.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.name]: "",
      }),
      {},
    ),
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value, name } = event.target;
    if (!name) return;
    if (error?.errorClean) error.errorClean(name);
    setFromValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(formValues);
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
      gap={2}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {formElements.map((elem) => (
        <TextField
          key={elem.id}
          id={elem.id}
          size="small"
          name={elem.name}
          label={elem.label}
          margin="none"
          fullWidth
          type={elem.type}
          required={elem.required}
          helperText={elem.helperText}
          value={formValues.name}
          onChange={handleInputChange}
          error={error?.fields.has(elem.name)}
        />
      ))}
      <Button type="submit" fullWidth variant="contained">
        Submit
      </Button>
      {error && (
        <Typography variant="caption" color="warning">
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default CommonForm;
