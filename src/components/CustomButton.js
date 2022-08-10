import React from 'react';
import AddIcon from '../assets/Add.svg';
import Checksvg from '../assets/Check.svg';

function CustomButton({ text, type, onClick, padding, style, addicon, checkicon }) {
  return (
    <button
      className="custom_button"
      style={{
        padding: padding ? padding : '8px 16px',
        ...style,
      }}
      type={type}
      onClick={onClick}
    >
      {text}
      {addicon ? <img style={{ width: '12px', height: '12px', marginLeft: '5%' }} src={AddIcon} /> : null}
      {checkicon ? <img style={{ width: '12px', height: '12px', marginLeft: '5%' }} src={Checksvg} /> : null}
    </button>
  );
}

export default CustomButton;
