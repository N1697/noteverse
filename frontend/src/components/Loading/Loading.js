import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";

const Loading = ({ size = 100 }) => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" style={{ width: size, height: size }} />
    </div>
  );
};

export default Loading;
