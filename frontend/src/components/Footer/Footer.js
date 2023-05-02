import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">Copyright &copy; Noteverse</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
