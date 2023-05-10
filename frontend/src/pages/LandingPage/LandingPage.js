import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    user && navigate("/mynotes");
  }, [navigate]);

  return (
    <div className="main">
      <Container fluid>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Noteverse</h1>
              <p className="subtitle">
                Your notes, your world, your Noteverse.
              </p>
            </div>

            <div className="buttonContainer btn-group">
              <a href="/login">
                <Button className="btn btn-secondary landingButton" size="lg">
                  Login
                </Button>
              </a>

              <a href="/register">
                <Button className="btn btn-secondary landingButton" size="lg">
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
