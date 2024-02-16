import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
export default function Header() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mr: 2 }}
            >
              {user?.name}
            </Typography>
            {!token ? (
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/signin")}
              >
                Login
              </Button>
            ) : (
              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
