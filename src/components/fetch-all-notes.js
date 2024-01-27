import React, { useState, useEffect } from "react";
import { fetchAllNotesfromDB, deleteNotefromDB, editNoteInDB } from "../utils";
import "./notes.css";

const FetchAllNotes = (props) => {
  const { error, notes, setNotes, setError } = props;
  useEffect(() => {
    fetchAllNotesfromDB(setNotes, setError);
  }, []);

  if (notes.length === 0) {
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
        <button onClick={() => deleteNotefromDB(note.id, setNotes, setError)}>
          delete
        </button>
        <button onClick={() => editNoteInDB(note.id, setNotes, setError)}>
          Edit
        </button>
      </div>
    );
  });
  return result;
};

export default FetchAllNotes;
