import React, { useState } from 'react';
import InputEyeSVG from '../assets/InputEye.svg';
import InputEyeClosedSVG from '../assets/InputEyeClosed.svg';

function CustomInput({
  labelText,
  inputType,
  inputName,
  inputPlaceholder,
  inputDefaultValue,
  inputValue,
  maxLength,
  enableEyes,
  accept,
  onChange,
  disabled,
  ref,
  divStyle,
  enableYoursStyle,
  labelStyle,
  inputStyle,
  ptext,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div
      className="custom_input_container"
      style={{
        ...divStyle,
      }}
    >
      <small
        className="custom_input_text"
        style={{
          marginBottom: '5px',
          ...enableYoursStyle,
        }}
      >
        {ptext ? ptext : 'Entrez votre'}
      </small>
      <label
        htmlFor={labelText}
        className="custom_input_label"
        style={{
          ...labelStyle,
        }}
      >
        {labelText}
      </label>
      <div
        className="wh100"
        style={{
          position: 'relative',
        }}
      >
        <input
          disabled={disabled}
          ref={ref}
          type={enableEyes ? (!isPasswordVisible ? 'password' : 'text') : inputType ? inputType : 'text'}
          name={inputName}
          accept={accept}
          onChange={onChange}
          placeholder={inputPlaceholder}
          defaultValue={inputDefaultValue}
          value={inputValue}
          maxLength={maxLength ? maxLength : 100}
          className="custom_input_input"
          style={{
            ...inputStyle,
          }}
        />
        {enableEyes ? (
          <img
            onClick={handlePasswordVisible}
            src={!isPasswordVisible ? InputEyeClosedSVG : InputEyeSVG}
            className="custom_input_eye_img"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CustomInput;
