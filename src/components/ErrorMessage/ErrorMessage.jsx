import errorMessageClasses from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <div className={errorMessageClasses["error-container"]}>
      <h4 className={errorMessageClasses["error-heading"]}>Error</h4>
      <p className={errorMessageClasses["error-text"]}>{message}</p>
    </div>
  );
}
