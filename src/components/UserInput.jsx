import React, { useEffect, useState } from "react";
import inputStyles from "./uset-input.module.scss";

const UserInput = ({
  label,
  onChange,
  name,
  type,
  value,
  validationMessage,
  placeholder,
  errorMessage,
  isSubmitting,
  minlength,
  required,
  min,
  max,
}) => {
  const [inputState, setInputState] = useState({
    value,
    isTouched: false,
    isValid: true,
  });

  useEffect(() => {
    if (isSubmitting === "submitting") {
      if (!inputState.value) {
        setInputState({
          ...inputState,
          isValid: false,
        });
      }
    }
  }, [isSubmitting]);

  console.log(inputState);

  const handleFocus = () => {
    setInputState({
      ...inputState,
      isTouched: true,
    });
  };

  return (
    <div className={inputStyles.user__input__container}>
      <label className={inputStyles.label}>{label}</label>
      <input
        className={
          inputState.isTouched
            ? `${inputStyles.user__input} ${inputStyles.touched}`
            : !inputState.isValid && isSubmitting === "submitting"
            ? `${inputStyles.user__input} ${inputStyles.error}`
            : `${inputStyles.user__input}`
        }
        name={name}
        type={type}
        value={inputState.value}
        placeholder={placeholder}
        min={min}
        max={max}
        minLength={minlength}
        required={required}
        onChange={(e) => {
          setInputState({
            ...inputState,
            value: e.target.value,
            isValid: e.target.validity.valid,
          });

          onChange(e.target.name, e.target.value);
        }}
        onFocus={handleFocus}
      />
      {inputState.isTouched && !inputState.isValid
        ? validationMessage
        : isSubmitting === "submitting" && !inputState.value
        ? errorMessage
        : ""}
    </div>
  );
};

export default UserInput;
