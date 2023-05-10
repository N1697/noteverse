import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main.js";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import "./MyNotes.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, getNotes, reset } from "../../features/note/noteSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading.js";
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";

const MyNotes = ({ search }) => {
  //States
  const { user } = useSelector((state) => state.user);
  const { notes, loading, error, success, message } = useSelector(
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
      toast.error("Please login to access your notes", {
        icon: "😇",
      });
    }

    if (error) {
      console.log(message);
    }

    dispatch(getNotes());

    dispatch(reset()); //Reset state
  }, [navigate, dispatch]);

  const deleteHandler = async (noteID) => {
    if (window.confirm("Would you like to delete this note?")) {
      dispatch(deleteNote(noteID))
        .then(() => {
          toast.success("Successfully deleted", {
            icon: "😄",
          });
        })
        .catch(() => {
          toast.error("Failed to delete your note", {
            icon: "😭",
          });
        });
    }
  };

  if (loading) {
    return <Loading size={200} />;
  }

  return (
    <>
      {user && (
        <Main title={`Welcome ${user.name}`}>
          <Link
            to="/createNote"
            style={{ textDecoration: "none", alignSelf: "center" }}
          >
            <Button className="btn btn-outline-light" variant="light">
              New Note +
            </Button>
          </Link>
          {/* We will reverse the 'notes' array, but the 'reverse()' mutates the
          array it works on (it reverses in-place).
          So we need to create a copy of the 'notes' array by using 'slice()' and then reverse it */}
          {notes.length === 0 ? (
            <h1 style={{ textAlign: "center", margin: "100px" }}>
              No notes found.
            </h1>
          ) : (
            notes
              ?.slice()
              .reverse()
              .filter((filteredNote) =>
                filteredNote.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((note) => (
                <Accordion defaultActiveKey={null} key={note._id}>
                  <Accordion.Item>
                    <Card style={{ marginTop: 20 }}>
                      <Accordion.Header>
                        <Card.Header>
                          <h4
                            style={{
                              color: "black",
                              alignSelf: "center",
                              cursor: "pointer",
                            }}
                          >
                            {note.title}
                          </h4>
                        </Card.Header>
                      </Accordion.Header>

                      <Accordion.Body>
                        <Card.Body>
                          <h6>
                            <Badge className="badge rounded-pill bg-info sm">
                              Category - {note.category}
                            </Badge>
                          </h6>
                          <blockquote className="blockquote mb-0">
                            <div className="content-container">
                              <ReactMarkdown>{note.content}</ReactMarkdown>
                            </div>
                            <footer>
                              <div>
                                Created on:{" "}
                                {new Date(note.createdAt).toLocaleString(
                                  "en-US"
                                )}
                              </div>
                              <div>
                                Updated on:{" "}
                                {new Date(note.updatedAt).toLocaleString(
                                  "en-US"
                                )}
                              </div>
                            </footer>
                          </blockquote>
                        </Card.Body>

                        <Card.Footer className="card-footer">
                          <div className="btn-group button-container">
                            <Button
                              className="btn btn-outline-dark btn-sm"
                              href={`/note/${note._id}`}
                            >
                              Edit
                            </Button>
                            <Button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteHandler(note._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Footer>
                      </Accordion.Body>
                    </Card>
                  </Accordion.Item>
                </Accordion>
              ))
          )}
        </Main>
      )}
    </>
  );
};

export default MyNotes;
