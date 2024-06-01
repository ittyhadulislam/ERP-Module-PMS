import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/profile/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { FamilyRestroom } from "@mui/icons-material";
import CsViewModal from "../scm/csForApproval/CsViewModal";
import ReportViewer from "../report/ReportViewer";
import SetupModal from "../MasterSetting/SetupModal";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLine = navigator.onLine;

  const { user } = useSelector((state) => state.auth);

  // For AppBar
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  //Profile Menu Options
  const settings = [
    { name: "Change Password" },
    { name: "Logout", link: "/login" },
  ];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(userLoggedOut());
    navigate("/login");
  };
  if (!onLine) {
    handleLogOut();
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light d-flex justify-content-between sticky-top">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* <span className="animate-text">Production Monitoring System</span> */}
      <Typography
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        className="animate-text"
      >
        Enterprise Resource Planning
      </Typography>
      <Typography
        sx={{ display: { sm: "block", md: "none" } }}
        className="animate-text"
      >
        ERP
      </Typography>

      <Box ml={"auto"} sx={{ flexGrow: 0, pr: { xs: 1, sm: 3 } }}>
        <Tooltip title="Open settings">
          <Button
            variant="text"
            onClick={handleOpenUserMenu}
            sx={{
              p: 0,
              border: "none",
              outline: "none",
              " &:focus": { outline: "none" },
            }}
            disableElevation
          >
            <Stack direction="row" alignItems="center" mx={3}>
              <Typography
                variant="body3"
                sx={{
                  color: "#00000080",
                  display: { xs: "none", md: "block" },
                }}
              >
                {/* Current User: &nbsp; */}
                {/* Current User: */}
              </Typography>
              <Typography
                variant="body3"
                // sx={{ color: "rgba(255, 255, 255, 0.87)" }}
                sx={{
                  color: "#00000080",
                  fontSize: { xs: "12px", sm: "0.875rem" },
                }}
              >
                {/* {sessionStorage.getItem("userName")?.toUpperCase()} */}
                {user?.userFullName}
              </Typography>
            </Stack>{" "}
            <Avatar alt="Albert Sharp" src={avatar} />
          </Button>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                if (setting.name === "Logout") {
                  handleLogOut();
                } else if (setting.name === "Change Password") {
                  setModalOpen(true);
                } else {
                  navigate(setting?.link);
                }
              }}
            >
              <Typography textAlign="center">{setting?.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <SetupModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={"Change Your Password!"}
        md={4}
      >
        lol
      </SetupModal>
    </nav>
  );
};

export default Navbar;
