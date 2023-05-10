import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, setProfile } from "../../features/user/userSlice";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  //States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const { name, email, password, confirmPassword, avatar } = formData;
  const { user, loading, error, success, message } = useSelector(
    (state) => state.user
  );
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Event Handlers
  useEffect(() => {
    if (!user) {
      //If the user is not logged-in, navigate to the homepage
      navigate("/");
      toast.error("Please login to access your profile", {
        icon: "😇",
      });
    }

    if (error) {
      console.log(message);
    }

    dispatch(reset()); //Reset state
  }, [user, error, success, message, navigate, dispatch]);

  useEffect(() => {
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      password: "",
      avatar: user.avatar,
    });
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const resetHandler = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      avatar: "",
    });
  };

  const postToCloudinary = (file) => {
    setLoadingAvatar(true);

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
          setFormData({ ...formData, avatar: data.url.toString() });
          setLoadingAvatar(false);
        })
        .catch((error) => {
          setLoadingAvatar(false);
          console.log(error);
        });
    } else {
      setLoadingAvatar(false);
      return toast.error("Please select an image", {
        icon: "🖼️",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email) {
      return toast.error(
        `Please fill up your ${
          (!name && !email && "name/email") ||
          (!name && "name") ||
          (!email && "email")
        }`,
        {
          icon: "✏️",
        }
      );
    }

    if (password && !confirmPassword) {
      return toast.error("Please confirm your password", {
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

    dispatch(setProfile(userData))
      .then(() => {
        toast.success("Profile updated successfully", {
          icon: "😄",
        });
        toast.success("Please log in again to see the changes", {
          icon: "😄",
        });
        resetHandler();
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to update your profile", {
          icon: "😭",
        });
      });
  };

  if (loading) {
    return <Loading size={200} />;
  }

  return (
    <Main title="Your Profile">
      <Row className="profile-container">
        {/* Form */}
        <Col md={6}>
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
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="To keep your current password, please leave this field blank"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                disabled={!password ? true : false}
              />
            </Form.Group>

            {/* Avatar */}
            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                id="avatar-setter"
                type="file"
                accept="image/png"
                custom="true"
                onChange={(event) => postToCloudinary(event.target.files[0])}
              />
            </Form.Group>

            <div className="button-container">
              <Button type="submit">Update</Button>
            </div>
          </Form>
        </Col>

        {/* Avatar */}
        <Col md={6} className="avatar-container">
          {loadingAvatar ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            // <label htmlFor="avatar-setter">
            //   <img src={avatar} alt={name} className="avatar" />
            // </label>

            <a href={avatar} target="_blank">
              <img src={avatar} alt={name} className="avatar" />
            </a>
          )}
        </Col>
      </Row>
    </Main>
  );
};

export default Profile;
