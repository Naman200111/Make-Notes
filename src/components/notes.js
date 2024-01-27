import React, { useEffect } from "react";
import { useState, useRef } from "react";
import FetchAllNotes from "./fetch-all-notes";
import { addNotesInDb } from "../utils";
import "./notes.css";

const Notes = () => {
  const [makeNote, setMakeNote] = useState("");
  const [priority, setPriority] = useState("p0");
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const selectRef = useRef(null);

  const handleChange = (event) => {
    setMakeNote(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addNotesInDb(makeNote, priority, setNotes, setError);
      setMakeNote("");
    }
  };

  const handlePriorityChange = () => {
    setPriority(selectRef.current.value);
  };

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
        <FetchAllNotes
          notes={notes}
          setNotes={setNotes}
          setError={setError}
          error={error}
        />
      </div>
    </div>
  );
};

export default Notes;
