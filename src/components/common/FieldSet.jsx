import React from "react";

const FieldSet = ({ text = null }) => {
  if (!text) return null;
  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: "400",
        position: "absolute",
        top: "-10px",
        background: "#fff",
        padding: "2px 10px",
        border: "1px solid #17a2b8",
        borderTopRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        borderTopLeftRadius: "2px",
        borderBottomRightRadius: "2px",
        textTransform: "capitalize",
      }}
    >
      {text}
    </span>
  );
};

export default FieldSet;
