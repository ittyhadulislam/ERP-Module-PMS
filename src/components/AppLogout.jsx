import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/features/auth/authSlice";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  const dispatch = useDispatch();

  let timer;
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      logoutAction();
    }, 600000); // 600000ms = 10mins. You can change the time.
  };

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  const logoutAction = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(userLoggedOut());
    window.location.pathname = "/";
  };

  return children;
};

export default AppLogout;
