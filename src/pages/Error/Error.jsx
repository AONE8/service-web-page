import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import errorPageClasses from "./Error.module.css";

export default function ErrorPage() {
  const error = useRouteError();

  let errorText = "Something went wrong!";

  if (isRouteErrorResponse(error) && error.status === 404) {
    errorText = "This page doesn't exist!";
  }

  return (
    <div className={errorPageClasses["error-container"]}>
      <h1>Error occurs</h1>
      <p>{errorText}</p>
    </div>
  );
}
