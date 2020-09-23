import React from 'react';

const Button = props => {
  return (
    <button
      className={props.className}
      style={props.style}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
    >
      {props.children}
    </button>
  );
};

export default Button;