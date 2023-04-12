import React from "react";
import totalStyles from "./total.module.scss";
import TotalItem from "./TotalItem";
import { intervalToDuration } from "date-fns";

const calculateUserAge = (year, month, day) => {
  if (!year || !month || !day) {
    return;
  }
  return intervalToDuration({
    start: new Date(year, month - 1, day),
    end: new Date(),
  });
};

const Total = ({ isSubmitting, year, month, day, isValidValues }) => {
  const userAge = calculateUserAge(year, month, day);

  const condition = isSubmitting === "success" && isValidValues;

  return (
    <div className={totalStyles.total__list}>
      <TotalItem
        label="years"
        placeholder="- -"
        value={condition && userAge.years}
      />
      <TotalItem
        label="months"
        placeholder="- -"
        value={condition && userAge.months}
      />
      <TotalItem
        label="days"
        placeholder="- -"
        value={condition && userAge.days}
      />
    </div>
  );
};

export default Total;
