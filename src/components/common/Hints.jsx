import React from "react";

const Hints = ({ hintsData = [] }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <h6>
        <u>HINTS</u>
        <b>:</b>
      </h6>
      <div style={{ display: "flex", alignItems: "center" }}>
        {hintsData.map((hint, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                height: "10px",
                width: "10px",
                background: `${hint?.color}`,
              }}
            ></p>
            <span style={{ marginTop: "-5px", marginLeft: "5px" }}>
              {hint.title}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Hints;
