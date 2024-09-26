import { Box, Button, Typography } from "@mui/material";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

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
        Sorry, an unexpected thing has occurred.
      </Typography>
      <Typography component="p" fontStyle="italic" sx={{ opacity: 0.6 }}>
        Your page is not found.
      </Typography>
      <Box pt={2}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          &larr; Go back
        </Button>
      </Box>
    </Box>
  );
}
