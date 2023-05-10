import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../../features/user/userSlice.js";

const LoginPage = () => {
  //States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error, success, message } = useSelector(
    (state) => state.user
  );

  //Event Handlers
  useEffect(() => {
    if (error) {
      toast.error(message, {
        icon: "😭",
      });
      console.log(message);
    }

    dispatch(reset());
  }, [user, error, success, message, navigate, dispatch]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill up the fields", {
        icon: "✏️",
      });
    }

    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData))
      .then(() => {
        toast.success("Login successful", {
          icon: "😄",
        });
        navigate("/mynotes");
      })
      .catch(() => {
        toast.error("Login failed", {
          icon: "😭",
        });
      });
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
