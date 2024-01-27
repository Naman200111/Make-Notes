import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { addNotesInDb } from "../utils";
import { getAllNotesfromDB, deleteNotefromDB, editNoteInDB } from "../utils";
import "./notes.css";

const GetAllNotes = (props) => {
  const { error, notes, setNotes, setError, loading, setLoading } = props;
  if (error) {
    return <h3>Unable to load your notes</h3>;
  }
  if (notes.length === 0 || loading) {
    return <h3>Loading your notes...</h3>;
  }
  const result = notes.map((note) => {
    return (
      <div className="app-note-item" key={note.id}>
        <div className="app-note-item-text">{note.text}</div>
        <div className="app-note-item-priority">{note.priority}</div>
        <button
          onClick={() =>
            deleteNotefromDB(note.id, setNotes, setError, setLoading)
          }
        >
          Delete
        </button>
        <button
          onClick={() => editNoteInDB(note.id, setNotes, setError, setLoading)}
        >
          Edit
        </button>
      </div>
    );
  });
  return result;
};

const Notes = () => {
  const [makeNote, setMakeNote] = useState("");
  const [priority, setPriority] = useState("p0");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const selectRef = useRef(null);
  console.log("rendering notes component", notes, error);

  const handleChange = (event) => {
    setMakeNote(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addNotesInDb(makeNote, priority, setNotes, setError, setLoading);
      setMakeNote("");
    }
  };

  const handlePriorityChange = () => {
    setPriority(selectRef.current.value);
  };

  useEffect(() => {
    getAllNotesfromDB(setNotes, setError, setLoading);
  }, []);

  return (
    <div className="app">
      <div className="app-name">MAKE NOTES</div>
      <div className="app-search-box">
        <input
          className="app-search-input"
          type="text"
          placeholder="Make a note"
          value={makeNote}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="app-note-priority">
          <select ref={selectRef} onChange={handlePriorityChange}>
            <option value="p0">P0</option>
            <option value="p1">P1</option>
            <option value="p2">P2</option>
          </select>
        </div>
      </div>
      <div className="app-notes-container">
        <GetAllNotes
          notes={notes}
          setNotes={setNotes}
          setError={setError}
          error={error}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default Notes;
