import React, { useState, useEffect, useCallback, useContext } from "react";
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
import { addTask, deleteTask, getTasks, updateTask } from "../api/tasks";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState({ title: "", isCompleted: false });
  const [tasks, setTasks] = useState([]);
  const [updatedTask, setUpdatedTask] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const respo = await addTask(task);

    setTask({ title: "", isCompleted: false });
    alert("Task Added Successfully", task.title);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);
    alert("Task deleted Successfully", task.title);
  };

  const fetchTasks = useCallback(async () => {
    const tasks = await getTasks();
    if (tasks.status === 200) {
      setTasks(tasks.data);
    }
  }, [tasks]);

  const handleUpdateTask = (task) => {
    setUpdatedTask(task);
    setOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleMarkComplete = async (id, task) => {
    const isCompleted = !task;
    await updateTask(id, { completed: isCompleted });
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
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
          <Box>
            <Box component="form" onSubmit={handleAddTask} display="flex">
              <TextField
                id="outlined-basic"
                label="Your Task.."
                value={task.title}
                onChange={handleChange}
                required
                name="title"
                variant="outlined"
                fullWidth
                sx={{ mr: 2 }}
              />
              <Button type="submit" variant="contained" mx={2}>
                Add
              </Button>
            </Box>
          </Box>
          <Box mt={5}>
            {tasks.map((task) => (
              <Box
                key={task._id}
                my={1}
                display="flex"
                justifyContent="space-between"
                sx={{ border: "1px solid lightgray", p: 1 }}
              >
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={task.completed}
                    onClick={() => handleMarkComplete(task._id, task.completed)}
                  />
                  <Typography variant="body1" align="start">
                    {task.title}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="warning"
                    onClick={() => handleUpdateTask(task)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
      <EditTask open={open} handleClose={handleClose} task={updatedTask} />
    </div>
  );
};

export default Home;
