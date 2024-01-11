import React from "react";
import { useState, useRef } from "react";
import "./app.css";

const App = () => {
  const [makeNote, setMakeNote] = useState("");
  const [priority, setPriority] = useState("p0");
  const selectRef = useRef();

  const handleChange = (event) => {
    setMakeNote(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // add note to the db
      // note value is makeNote and priority is priority
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
        <div className="app-note-item"></div>
      </div>
    </div>
  );
};

export default App;
