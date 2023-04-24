import totalStyles from "./total.module.scss";

const TotalItem = ({ label, placeholder, value }) => {
  return (
    <div className={totalStyles.total__wrap}>
      <div className={totalStyles.input__wrap}>
        <input
          type="number"
          className={totalStyles.total__number}
          name={label}
          placeholder={placeholder}
          value={value}
        ></input>
      </div>
      <span className={totalStyles.total__label}>{label}</span>
    </div>
  );
};

export default TotalItem;
