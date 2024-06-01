import React from "react";
import Loading from "./loading/Loading";

const AuthCheck = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Loading />
      <div
        style={{
          marginTop: "10px",
          fontWeight: "700",
          fontSize: "24px",
          letterSpacing: "1px",
        }}
      >
        Checking Authentication
      </div>
    </div>
  );
};

export default AuthCheck;
