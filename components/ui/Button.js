import React from "react";

const Button = (props) => {
  return (
    <a
      onClick={props.onClick}
      className='btn'
      style={{
        backgroundColor: props.bgColor ? "#DA552F" : "white",
        color: props.bgColor ? "white" : "black",
      }}
    >
      {props.children}
    </a>
  );
};

export default Button;
