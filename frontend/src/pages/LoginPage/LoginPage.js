import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("User");

    User && navigate("/mynotes");
  }, [navigate]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      toast.success("Login successful", {
        icon: "😄",
      });

      setLoading(false);
      localStorage.setItem("User", JSON.stringify(data));
      navigate("/mynotes");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        icon: "😭",
      });
    }
  };

  if (loading) {
    return <Loading size={200} />;
  }

  return (
    <Main title="Login">
      <div className="login-container">
        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="button-container">
            <Button type="submit">Login</Button>
          </div>
        </Form>

        <Row className="row py-3">
          <Col className="col">
            New User ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default LoginPage;
