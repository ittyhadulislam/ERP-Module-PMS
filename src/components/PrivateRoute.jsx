/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavSideWrapper from "./AdminSidebar/NavSideWrapper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { resetAll } from "../redux/features/commercial/contract/contractSlice";
import { reSetBackToBack } from "../redux/features/commercial/backToBackLC/backToBackLcSlice";
const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  // =============================================================================
  const logoutAction = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(userLoggedOut());
  };
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        // const isLocalStorage = localStorage.getItem("auth");
        const isLocalStorage = sessionStorage.getItem("auth");
        if (!isLocalStorage) logoutAction();
      });
    });
  }, []);

  // =============================================================================
  useEffect(() => {
    if (location.pathname !== "contract") {
      dispatch(resetAll());
    } else if (location.pathname !== "/back-to-back-lc") {
      dispatch(reSetBackToBack());
    } else {
      console.log("first", location);
    }
  }, [location]);

  if (isLoggedIn) {
    return (
      // <Box sx={{ display: "flex" }}
      // >
      //     {/* <Navbar /> */}
      //     <Box component="main" sx={{ flexGrow: 1, pt: 5, mt: 3 }}>
      //         {children}
      //     </Box>
      //     {/* <Footer /> */}
      // </Box>

      <>
        <NavSideWrapper children={children} />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
