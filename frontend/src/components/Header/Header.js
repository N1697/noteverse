import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice.js";
import { useSelector } from "react-redux";
const Header = ({ setSearch }) => {
  //States
  const { user } = useSelector((state) => state.user);

  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      style={{ fontWeight: "bold" }}
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="no-underline">
            Noteverse
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {user && (
          <Navbar.Collapse id="navbarScroll">
            <Form className="m-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(event) => setSearch(event.target.value)}
              />
            </Form>
            <Nav
              style={{
                maxHeight: "100px",
              }}
              navbarScroll
            >
              <Nav.Link href="/mynotes">My Notes</Nav.Link>

              <NavDropdown
                title="User"
                id="navbarScrollingDropdown"
                className="dropdown"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
