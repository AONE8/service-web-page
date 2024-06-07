import loaderClasses from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={loaderClasses["loader"]}>
      <div className={loaderClasses["circle-container"]}>
        <span
          className={`${loaderClasses["circle"]} ${loaderClasses["dark-circle"]}`}
        ></span>
        <span
          className={`${loaderClasses["circle"]} ${loaderClasses["midcolor-circle"]}`}
        ></span>
        <span
          className={`${loaderClasses["circle"]} ${loaderClasses["light-circle"]}`}
        ></span>
        <span
          className={`${loaderClasses["circle"]} ${loaderClasses["extra-light-circle"]}`}
        ></span>
      </div>
      <span className={loaderClasses["text"]}>Обробка даних...</span>
    </div>
  );
}
