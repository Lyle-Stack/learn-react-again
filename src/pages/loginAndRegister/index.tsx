import { Box } from "@mui/material";
import LoginFrom from "./loginForm";
import RegisterForm from "./registerForm";

const LoginAndRegisterFrom = () => {
  return (
    <Box width="100%" display="flex" gap={4}>
      <LoginFrom />
      <RegisterForm />
    </Box>
  );
};

export default LoginAndRegisterFrom;
