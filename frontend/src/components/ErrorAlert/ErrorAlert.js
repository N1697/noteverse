import React from "react";
import "./ErrorAlert.css";
import { Alert } from "react-bootstrap";

const ErrorAlert = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorAlert;
