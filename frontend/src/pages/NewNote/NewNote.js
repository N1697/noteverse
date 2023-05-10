import React, { useEffect, useState } from "react";
import "./NewNote.css";
import Main from "../../components/Main/Main";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading/Loading";
import ReactMarkdown from "react-markdown";
import { Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { createNote, reset } from "../../features/note/noteSlice.js";
import { useNavigate } from "react-router-dom";

const NewNote = () => {
  //States
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const { title, category, content } = formData;
  const { user } = useSelector((state) => state.user);
  const { loading, error, success, message } = useSelector(
    (state) => state.note
  );

  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Event Handlers
  useEffect(() => {
    if (!user) {
      //If the user is not logged-in, navigate to the homepage
      navigate("/");
      toast.error("Please login to create new note", {
        icon: "😇",
      });
    }

    if (error) {
      console.log(message);
    }

    dispatch(reset());
  }, [user, error, message, navigate, dispatch]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const resetHandler = () => {
    setFormData({
      title: "",
      category: "",
      content: "",
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!title || !category || !content) {
      return toast.error("Please fill up the fields", {
        icon: "✏️",
      });
    }

    const noteData = {
      title,
      category,
      content,
    };

    dispatch(createNote(noteData))
      .then(() => {
        toast.success("Successfully created", {
          icon: "😄",
        });
        resetHandler();
        navigate("/mynotes");
      })
      .catch(() => {
        toast.error("Failed to create new note", {
          icon: "😭",
        });
      });
  };

  if (loading) {
    return <Loading size={200} />;
  }

  return (
    <div>
      <Main title="Create New Note">
        <Card>
          <Card.Header>New Note</Card.Header>

          <Card.Body>
            <Form onSubmit={submitHandler}>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Enter the title"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Category */}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={category}
                  placeholder="Enter the category"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Content */}
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  style={{ resize: "none" }}
                  name="content"
                  value={content}
                  placeholder="Enter the content"
                  onChange={handleChange}
                />
                <Form.Text>
                  Noteverse uses Markdown syntax (Markdown cheatsheet is{" "}
                  <a
                    href="https://devhints.io/markdown"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    here
                  </a>
                  )
                </Form.Text>
              </Form.Group>

              {content && (
                <Card>
                  <Card.Header>Preview</Card.Header>

                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}

              <Card.Footer className="card-footer">
                <div className="btn-group button-container">
                  <Button type="submit" className="btn btn-outline-dark btn-sm">
                    Create
                  </Button>
                  <Button
                    className="btn btn-outline-danger btn-sm"
                    onClick={resetHandler}
                  >
                    Reset
                  </Button>
                </div>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </Main>
    </div>
  );
};

export default NewNote;
