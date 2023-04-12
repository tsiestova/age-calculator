import React, { createContext, useContext, useEffect, useState } from "react";
import UserInput from "./UserInput";
import Total from "./Total";
import mainStyles from "./main.module.scss";
import { UserContext } from "../App";
import inputStyles from "./uset-input.module.scss";

const validate = (name, value) => {
  if (name === "month") {
    return value > 0 && value <= 12;
  }

  if (name === "year") {
    return value > 0 && value.length === 4;
  }
};

const getDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const validateDays = (year, month, day) => {
  if (!month && parseInt(day) > 0 && parseInt(day) <= 31) {
    return true;
  }

  const daysInMonth = getDays(parseInt(year), parseInt(month));

  return parseInt(day) <= daysInMonth && parseInt(day) > 0;
};

const Card = () => {
  const { userData, setUserData } = useContext(UserContext);

  const handleChange = (type, value) => {
    setUserData({
      ...userData,
      [type]: {
        ...userData[type],
        value: value,
        isValid:
          type === "day" ? validateDays(type, value) : validate(type, value),
      },
      isSubmitting: "none",
    });
  };

  useEffect(() => {
    setUserData({
      ...userData,
      day: {
        ...userData.day,
        isValid: validateDays(
          userData.year.value,
          userData.month.value,
          userData.day.value
        ),
      },
      isSubmitting: "none",
    });
  }, [userData.year.value, userData.month.value, userData.day.value]);

  const handleSubmit = () => {
    if (!userData.day.value || !userData.month.value || !userData.year.value) {
      setUserData({
        ...userData,
        isSubmitting: "submitting",
      });
    } else {
      setUserData({
        ...userData,
        isSubmitting: "success",
      });
    }
  };

  return (
    <div className={mainStyles.card__wrap}>
      <div className={mainStyles.layout}>
        <div className={mainStyles.card__inner}>
          <div className={mainStyles.input__list}>
            <UserInput
              label="day"
              type="number"
              name="day"
              value={userData.day.value}
              placeholder="DD"
              onChange={handleChange}
              validationMessage={
                <div className={inputStyles.error_message}>
                  Must be a valid day
                </div>
              }
              errorMessage={
                <div className={inputStyles.error_message}>
                  This field is required
                </div>
              }
              validate={(days) =>
                validateDays(userData.year.value, userData.month.value, days)
              }
              isSubmitting={userData.isSubmitting}
            />
            <UserInput
              label="month"
              type="number"
              name="month"
              value={userData.month.value}
              placeholder="MM"
              onChange={handleChange}
              validationMessage={
                <div className={inputStyles.error_message}>
                  Must be a valid month
                </div>
              }
              validate={(value) => value > 0 && value <= 12}
              errorMessage={
                <div className={inputStyles.error_message}>
                  This field is required
                </div>
              }
              isSubmitting={userData.isSubmitting}
            />
            <UserInput
              label="year"
              type="number"
              name="year"
              value={userData.year.value}
              placeholder="YYYY"
              onChange={handleChange}
              validationMessage={
                <div className={inputStyles.error_message}>
                  Must be in the past
                </div>
              }
              validate={(value) => value > 0 && value.length === 4}
              // validate={validate}
              errorMessage={
                <div className={inputStyles.error_message}>
                  This field is required
                </div>
              }
              isSubmitting={userData.isSubmitting}
            />
          </div>
          <div className={mainStyles.btn__wrap}>
            <a href="#" className={mainStyles.btn} onClick={handleSubmit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="44"
                viewBox="0 0 46 44"
              >
                <g fill="none" stroke="#FFF" strokeWidth="2">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                </g>
              </svg>
            </a>
          </div>
          <Total
            isSubmitting={userData.isSubmitting}
            isValidValues={
              userData.year.isValid &&
              userData.month.isValid &&
              userData.day.isValid
            }
            year={userData.year.value}
            month={userData.month.value}
            day={userData.day.value}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
