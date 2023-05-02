import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Main.css";

const Main = ({ title, children }) => {
  return (
    <div className="main-content">
      <Container>
        <Row>
          <div className="main-item">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr style={{ borderTop: "1px solid black" }} />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
