import React,{useEffect} from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import {updateTask} from '../api/tasks'

export default function EditTask({ open, handleClose, task }) {
  const [updatedTask, setUpdatedTask] = React.useState(task);
 
  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, title: e.target.value });
  }
  const handleSave = async () => {
    await updateTask(updatedTask._id, updatedTask);
    handleClose();
    alert("Task updated Successfully", updatedTask.title);
  }
  useEffect(() => {
    setUpdatedTask(task);
  },[task])
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField fullWidth sx={{ minWidth: "500px" }} onChange={handleChange} value={updatedTask.title} name="title" minWidth={800} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={()=>handleSave()} >
            Save 
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
