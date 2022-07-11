import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  return (
    error && (
      <>
        {error.map((err) => (
          <div key={err.message} className="alert alert-danger m-2">
            Error: {err.message}
          </div>
        ))}
      </>
    )
  );
}

export default ErrorAlert;
