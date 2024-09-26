import { Box, Button, Typography } from "@mui/material";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <Box
      id="error-page"
      display="flex"
      width="100svw"
      height="100svh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Typography component="h1" fontSize={56}>
        Oh No!
      </Typography>
      <Typography component="p">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography component="p" fontStyle="italic" sx={{ opacity: 0.6 }}>
        {errorMessage}
      </Typography>
      <Box pt={2}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          &larr; Go back
        </Button>
      </Box>
    </Box>
  );
}
