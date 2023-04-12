import React, { useState } from "react";
import inputStyles from "./uset-input.module.scss";

const getInputState = ({ isValid, isTouched }) => {
  const result = [inputStyles.user__input__container];

  if (!isValid) {
    result.push(inputStyles.invalid);
  }

  if (isTouched) {
    result.push(inputStyles.touched);
  }

  return result.join(" ");
};

const UserInput = ({
  label,
  onChange,
  name,
  type,
  value,
  validationMessage,
  validate,
  placeholder,
  errorMessage,
  isSubmitting,
}) => {
  const [inputState, setInputState] = useState({
    value,
    isValid: false,
    isTouched: false,
  });

  return (
    <div
      className={getInputState({
        isTouched: inputState.isTouched,
        isValid: inputState.isValid,
      })}
    >
      <label className={inputStyles.label}>{label}</label>
      <div className={inputStyles.input__wrap}>
        <input
          className={inputStyles.user__input}
          name={name}
          type={type}
          value={inputState.value}
          placeholder={placeholder}
          onChange={(e) => {
            setInputState({
              ...inputState,
              value: e.target.value,
              isTouched: true,
              isValid:
                typeof validate === "function" && validate(e.target.value),
            });

            onChange(e.target.name, e.target.value);
          }}
        />
        {!inputState.isValid && inputState.isTouched
          ? validationMessage
          : isSubmitting === "submitting" && !inputState.value
          ? errorMessage
          : null}
      </div>
    </div>
  );
};

export default UserInput;
