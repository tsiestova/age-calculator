import React, { createContext, useContext, useEffect, useState } from "react";
import UserInput from "./UserInput";
import Total from "./Total";
import mainStyles from "./main.module.scss";
import { UserContext } from "../App";
import inputStyles from "./uset-input.module.scss";

const today = new Date();
const currentYear = today.getFullYear();

const getDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getMaxDate = (year, month) => {
  if (!year && !month) {
    return 31;
  }
  return getDays(parseInt(year), parseInt(month));
};

const Card = () => {
  const { userData, setUserData } = useContext(UserContext);

  const handleChange = (type, value) => {
    setUserData({
      ...userData,
      [type]: {
        ...userData[type],
        value: value,
        isValid: true,
      },
      isSubmitting: "none",
    });
  };

  const maxDate = getMaxDate(userData.year.value, userData.month.value);

  useEffect(() => {
    if (userData.day.value > maxDate) {
      setUserData({
        ...userData,
        day: {
          ...userData.day,
          isValid: false,
        },
      });
    }
  }, [maxDate]);

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
              value={userData.day.value === null ? "" : userData.day.value}
              isValid={userData.day.isValid}
              placeholder="DD"
              min="1"
              max={maxDate}
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
              isSubmitting={userData.isSubmitting}
              invalid={
                userData.isSubmitting === "submitting" && !userData.day.value
              }
            />
            <UserInput
              label="month"
              type="number"
              name="month"
              value={userData.month.value === null ? "" : userData.month.value}
              placeholder="MM"
              min="1"
              max="12"
              onChange={handleChange}
              validationMessage={
                <div className={inputStyles.error_message}>
                  Must be a valid month
                </div>
              }
              errorMessage={
                <div className={inputStyles.error_message}>
                  This field is required
                </div>
              }
              isSubmitting={userData.isSubmitting}
              invalid={
                userData.isSubmitting === "submitting" && !userData.month.value
              }
            />
            <UserInput
              label="year"
              type="number"
              name="year"
              value={userData.year.value === null ? "" : userData.year.value}
              placeholder="YYYY"
              onChange={handleChange}
              min="1"
              max={currentYear}
              validationMessage={
                <div className={inputStyles.error_message}>
                  Must be in the past
                </div>
              }
              errorMessage={
                <div className={inputStyles.error_message}>
                  This field is required
                </div>
              }
              isSubmitting={userData.isSubmitting}
              invalid={
                userData.isSubmitting === "submitting" && !userData.year.value
              }
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
