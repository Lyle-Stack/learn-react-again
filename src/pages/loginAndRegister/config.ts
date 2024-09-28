import { TextFieldProps } from "@mui/material";

type PickWithRequiredKey<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type FormElement = Pick<
  TextFieldProps,
  "id" | "helperText" | "type" | "label" | "required"
> &
  PickWithRequiredKey<TextFieldProps, "name">;

export const loginFormElements: Array<FormElement> = [
  {
    name: "email",
    id: "login-email",
    helperText: "Enter your E-mail",
    label: "E-mail",
    type: "email",
    required: true,
  },
  {
    name: "password",
    id: "login-password",
    helperText: "Enter your Password",
    label: "Password",
    type: "password",
    required: true,
  },
];

export const registerFormElements: Array<FormElement> = [
  {
    name: "email",
    id: "register-email",
    helperText: "Enter your E-mail",
    label: "E-mail",
    type: "email",
    required: true,
  },
  {
    name: "password",
    id: "register-password",
    helperText: "Enter your Password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    name: "password2",
    id: "register-password2",
    helperText: "Enter your Password Again",
    label: "Password Check",
    type: "password",
    required: true,
  },
];
