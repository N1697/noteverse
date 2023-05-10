import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../../features/user/userSlice.js";

const RegisterPage = () => {
  //States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  });
  const { name, email, password, confirmPassword, avatar } = formData;
  const [avatarMessage, setAvatarMessage] = useState("");

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

    if (success || user) {
      navigate("/mynotes");
      toast.success("Registration successful", {
        icon: "😄",
      });
    }

    dispatch(reset());
  }, [user, error, success, message, navigate, dispatch]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const postToCloudinary = (file) => {
    //Check if the user selected something (could be an image or something else)
    if (!file) {
      return toast.error("Please select an image", {
        icon: "🖼️",
      });
    }
    // setAvatarMessage(null);

    //If the selected file is an image
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Noteverse");
      data.append("cloud_name", "dnrkukyca");

      fetch(
        "https://api.cloudinary.com/v1_1/dnrkukyca/image/upload" /*API Base URL*/,
        {
          method: "post",
          body: data, //FormData object
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFormData({ ...formData, avatar: data.url.toString() });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return toast.error("Please select an image", {
        icon: "🖼️",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill up the fields", {
        icon: "✏️",
      });
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match", {
        icon: "❌",
      });
    }

    const userData = {
      name,
      email,
      password,
      avatar,
    };

    dispatch(registerUser(userData));
  };

  if (loading) {
    return <Loading size={200} />;
  }

  return (
    <Main title="Register">
      <div className="login-container">
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>

            <Form.Control
              type="name"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>

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

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Avatar */}
          <Form.Group className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              id="custom-file"
              type="file"
              accept="image/png"
              custom="true"
              onChange={(event) => postToCloudinary(event.target.files[0])}
            />
          </Form.Group>

          <div className="button-container">
            <Button type="submit">Sign Up</Button>
          </div>
        </Form>

        <Row className="row py-3">
          <Col className="col">
            Have an account ? <Link to="/login">Login Here</Link>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default RegisterPage;
