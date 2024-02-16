import React,{useState} from "react";
import Header from "../components/Header";
import {
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTask from "../components/EditTask";
const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
  ]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTask = (id) => {};
  return (
    <div>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          elevation={2}
          sx={{
            mt: 15,
            width: "50%",
            boxShadow: 2,
            minHeight: "500px",
            p: 2,
          }}
        >
          <Typography variant="h6" align="center" mt={5}>
            TO-DO List
          </Typography>
          <Box display="flex">
            <TextField
              id="outlined-basic"
              label="Your Task.."
              variant="outlined"
              fullWidth
              sx={{ mr: 2 }}
            />
            <Button variant="contained" mx={2}>
              Add
            </Button>
          </Box>
          <Box mt={5}>
            {tasks.map((task) => (
              <Box
                key={task.id}
                my={1}
                display="flex"
                justifyContent="space-between"
                sx={{ border: "1px solid lightgray", p: 1 }}
              >
                <Box display="flex" alignItems="center">
                  <Checkbox />
                  <Typography variant="body1" align="start">
                    {task.title}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton variant="outlined" color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton variant="outlined" color="warning">
                    <EditIcon onClick={() => setOpen(true)} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
      <EditTask open={open} handleClose={handleClose} />
    </div>
  );
};

export default Home;
