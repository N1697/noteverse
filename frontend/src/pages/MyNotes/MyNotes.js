import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import "./MyNotes.css";
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const deleteHandler = async (id) => {
    if (window.confirm("Would you like to delete the note?")) {
      try {
        const { data } = await axios.delete(`/api/notes/${id}`);
        setNotes(data);
      } catch (error) {}
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get("/api/notes");

    setNotes(data);
  };
  console.log(notes);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Main title="Welcome">
      <Link
        to="/createNote"
        style={{ textDecoration: "none", alignSelf: "center" }}
      >
        <Button className="btn btn-outline-light" variant="light">
          New Note +
        </Button>
      </Link>

      {notes.map((note) => (
        <Accordion defaultActiveKey={null} key={note._id}>
          <Accordion.Item eventKey="0">
            <Card style={{ marginTop: 20 }}>
              <Accordion.Header>
                <Card.Header
                  style={{
                    width: "100%",
                  }}
                >
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
                  <h4>
                    <Badge className="badge rounded-pill bg-info">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created On - date
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
      ))}
    </Main>
  );
};

export default MyNotes;
