import React, { useState, useEffect } from "react";
import Main from "../../components/Main/Main";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, reset, updateNote } from "../../features/note/noteSlice";
import Loading from "../../components/Loading/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditNote = () => {
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

  const id = useParams().id;

  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Event Handlers
  useEffect(() => {
    if (!user) {
      //If the user is not logged-in, navigate to the homepage
      navigate("/");
      toast.error("Please login to edit your note", {
        icon: "😇",
      });
    }

    if (error) {
      console.log(message);
    }

    dispatch(reset());
  }, [user, error, message, navigate, dispatch]);

  useEffect(() => {
    const fetchExistingNote = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://noteverse.onrender.com/api/notes/${id}`,
        config
      );

      setFormData({
        ...formData,
        title: data.title,
        category: data.category,
        content: data.content,
      });
    };

    fetchExistingNote();
  }, [id]);

  const resetHandler = () => {
    setFormData({
      title: "",
      category: "",
      content: "",
    });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const deleteHandler = async (noteID) => {
    if (window.confirm("Would you like to delete this note?")) {
      dispatch(deleteNote(noteID))
        .then(() => {
          toast.success("Successfully deleted", {
            icon: "😄",
          });
          navigate("/mynotes");
        })
        .catch(() => {
          toast.error("Failed to delete your note", {
            icon: "😭",
          });
        });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!title || !category || !content) {
      return toast.error("Please fill up the fields", {
        icon: "✏️",
      });
    }

    const noteData = {
      _id: id,
      title,
      category,
      content,
    };

    dispatch(updateNote(noteData))
      .then(() => {
        toast.success("Successfully updated", {
          icon: "😄",
        });
        resetHandler();
        navigate("/mynotes");
      })
      .catch(() => {
        toast.error("Failed to update your note", {
          icon: "😭",
        });
      });
  };

  if (loading) {
    return <Loading size={200} />;
  }

  return (
    <Main title="Edit Your Note">
      <Card>
        <Card.Header>Edit Note</Card.Header>

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
                  Update
                </Button>
                <Button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteHandler(id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Footer>
          </Form>
        </Card.Body>
      </Card>
    </Main>
  );
};

export default EditNote;
