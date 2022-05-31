import React from "react";

function CustomButton({ text, type, onClick, padding, style }) {
  return (
    <button
      className="custom_button"
      style={{
        padding: padding ? padding : "8px 16px",
        ...style,
      }}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default CustomButton;
