import { Box } from "@mui/material";
import CommonForm from "./commonForm";
import { loginFormElements } from "./config";
import { useState } from "react";

const LoginFrom = () => {
  const [errorFields, setErrorFields] = useState<Array<string>>([]);

  const handleSubmit = (formValues: { [key: string]: string }) => {
    for (const k in formValues) {
      if (!formValues[k]) setErrorFields((prev) => [...prev, k]);
    }
    console.log(JSON.stringify(formValues, undefined, 4));
  };

  const handleErrorClean = (field: string) => {
    setErrorFields((prev) => prev.filter((n) => n !== field));
  };

  return (
    <Box width="100%">
      <h1>LoginFrom</h1>
      <CommonForm
        onSubmit={handleSubmit}
        formElements={loginFormElements}
        error={
          errorFields.length
            ? {
                fields: new Set(errorFields),
                message: "All fields are required",
                errorClean: handleErrorClean,
              }
            : undefined
        }
      />
    </Box>
  );
};

export default LoginFrom;
