import { useEffect, useState } from "react";
import { useUserLoginMutation } from "../redux/features/auth/authUserApi";
import {
  errorToast,
  successToast,
  warningToast,
} from "../common/toaster/toaster";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [see, setSee] = useState(false);

  const [userLogin, { data, error, isLoading }] = useUserLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin({
      userName: name,
      password: pass,
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

  setTimeout(() => {
    setSee(false);
  }, 5000);
  return (
    <>
      <div className="login-container">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <label className="login-label" htmlFor="username"></label>
          <input
            className="login-input"
            type="text"
            placeholder="User Name"
            id="username"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="login-label" htmlFor="password"></label>
          <div style={{ position: "relative" }}>
            <input
              className="login-input"
              type={see ? "text" : "password"}
              placeholder="Password"
              id="password"
              onChange={(e) => setPass(e.target.value)}
            />
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                cursor: "pointer",
              }}
            >
              {see ? (
                <AiFillEye
                  style={{ fontSize: "20px" }}
                  onClick={() => setSee((prev) => !prev)}
                />
              ) : (
                <AiFillEyeInvisible
                  style={{ fontSize: "20px" }}
                  onClick={() => setSee((prev) => !prev)}
                />
              )}
            </span>
          </div>
          {isLoading ? (
            <button className="login-button" disabled>
              Loading...
            </button>
          ) : (
            <button className="login-button" type="submit">
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
