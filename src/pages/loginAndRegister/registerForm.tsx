import { Box } from "@mui/material";
import CommonForm from "./commonForm";
import { registerFormElements } from "./config";
import { useState } from "react";

const RegisterForm = () => {
  const [errorFields, setErrorFields] = useState<Array<string>>([]);
  const [passMismatch, setPassMismatch] = useState(false);

  const handleSubmit = (formValues: { [key: string]: string }) => {
    for (const k in formValues) {
      if (!formValues[k]) setErrorFields((prev) => [...prev, k]);
    }

    if (errorFields.length) return;

    const { password, password2 } = formValues;
    if (password !== password2) return setPassMismatch(true);

    if (passMismatch) setPassMismatch(false);

    console.log(JSON.stringify(formValues, undefined, 4));
  };

  const handleErrorClean = (field: string) => {
    if (passMismatch) return;
    setErrorFields((prev) => prev.filter((n) => n !== field));
  };

  return (
    <Box width="100%">
      <h1>RegisterForm</h1>
      <CommonForm
        onSubmit={handleSubmit}
        formElements={registerFormElements}
        error={
          passMismatch || errorFields.length
            ? {
                fields: passMismatch
                  ? new Set(["password", "password2"])
                  : new Set(errorFields),
                message: passMismatch
                  ? "Two password fields are not the same"
                  : "All fields are required",
                errorClean: handleErrorClean,
              }
            : undefined
        }
      />
    </Box>
  );
};

export default RegisterForm;
