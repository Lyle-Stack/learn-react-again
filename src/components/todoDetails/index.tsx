import { Fragment } from "react";
import { Todo } from "../todoItem";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const TodoDetails = ({
  todoDetails,
  openDialog,
  onClose,
}: {
  todoDetails: Todo | null;
  openDialog: boolean;
  onClose: () => void;
}) => {
  return (
    <Fragment>
      <Dialog open={openDialog} onClose={onClose}>
        <DialogTitle>{todoDetails?.todo}</DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default TodoDetails;
