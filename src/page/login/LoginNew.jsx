import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import styles from "./loginNew.module.css";
import { MdOutlineLock, MdOutlineLogin } from "react-icons/md";
import { useUserLoginMutation } from "../../redux/features/auth/authUserApi";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../common/toaster/toaster";
const LoginNew = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userLogin, { data, error, isLoading }] = useUserLoginMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin({
      userName: userName,
      password: password,
    });
  };

  useEffect(() => {
    if (error?.data?.statusCode === 400) {
      errorToast(error?.data?.message);
    }
    if (error?.status === "FETCH_ERROR") {
      if (!navigator.onLine) {
        warningToast("Check Your Internet Connection");
      } else {
        errorToast("Something went wrong!");
      }
    }
    if (data?.statusCode === 200) {
      successToast(data?.message);
    }
  }, [error, data]);
  return (
    <section className={styles.login_container}>
      <div className={styles.card_body}>
        <h1 className={styles.heading}>Sign in</h1>
        <div className={styles.card_wrapper}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 1 }}>
              <Box className={styles.login_input_container}>
                <Box className={styles.login_icon_wrapper}>
                  {<FiUser fontSize={20} />}
                </Box>
                <TextField
                  size="small"
                  fullWidth
                  placeholder={"User Name"}
                  type={"text"}
                  variant="outlined"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  sx={{
                    "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active":
                      {
                        transition: "background-color 5000s ease-in-out 0s",
                        WebkitTextFillColor: "#fff !important",
                      },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "#FFFFFF",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Box className={styles.login_input_container}>
                <Box className={styles.login_icon_wrapper}>
                  {<MdOutlineLock fontSize={20} />}
                </Box>
                <TextField
                  size="small"
                  fullWidth
                  placeholder={"Password"}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  sx={{
                    "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active":
                      {
                        transition: "background-color 5000s ease-in-out 0s",
                        WebkitTextFillColor: "#fff !important",
                      },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "#FFFFFF",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <FaEye
                            fontSize={20}
                            onClick={() => setShowPassword(false)}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <FaEyeSlash
                            fontSize={20}
                            onClick={() => setShowPassword(true)}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <button
              className={`${styles.custom_btn} ${styles.btn}`}
              // onClick={onClick}
              disabled={isLoading}
              type={"submit"}
              style={{ background: isLoading && "gray" }}
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <span className={styles.icon_wrapper}>
                  <MdOutlineLogin
                    fontSize={20}
                    style={{ marginRight: "5px" }}
                  />
                  <span>{"Login"}</span>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginNew;
