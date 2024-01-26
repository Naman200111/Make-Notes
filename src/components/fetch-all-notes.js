import React, { useState, useEffect, Suspense } from "react";
import { GET_NOTES, DELETE_NOTES } from "../api/routes";
import "../app.css";

const FetchAllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const fetchAllNotesfromDB = async () => {
    try {
      await fetch(`http://localhost:4000${GET_NOTES}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setNotes(data);
        });
    } catch (error) {
      setError(error);
    }
  };

  const handleNoteDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000${DELETE_NOTES}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteEdit = async (id) => {
    // try {
    //   await fetch(`http://localhost:4000${EDIT_NOTES}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id }),
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    // refetch after note deletion, addition, edit and initially
    fetchAllNotesfromDB();
  }, []);

  if (notes.length === 0 && error === null) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }
  const result = notes.map((note) => {
    return (
      <div className="app-note-item" key={note.id}>
        <div className="app-note-item-text">{note.text}</div>
        <div className="app-note-item-priority">{note.priority}</div>
        <button onClick={() => handleNoteDelete(note.id)}>delete</button>
        <button onClick={() => handleNoteEdit(note.id)}>Edit</button>
      </div>
    );
  });
  return result;
};

export default FetchAllNotes;
