import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { addNotesInDb } from "../../utils";
import { getAllNotesfromDB, deleteNotefromDB, editNoteInDB } from "../../utils";
import { useNavigate } from "react-router-dom";
import "./Notes.css";

const GetAllNotes = (props) => {
  const [inEditMode, setInEditMode] = useState();
  const [editedText, setEditedText] = useState();
  const selectRef = useRef(null);
  const {
    error,
    notes,
    setNotes,
    setError,
    loading,
    setLoading,
    handlePriorityChange,
  } = props;
  if (error) {
    return <h3>Unable to load your notes</h3>;
  }
  if (loading) {
    return <h3>Loading your notes...</h3>;
  }
  if (notes.length === 0) {
    return <h3>No notes available</h3>;
  }
  const onClickEdit = (id, newPriority) => {
    editNoteInDB(id, setNotes, setError, setLoading, newPriority, editedText);
    setInEditMode();
  };
  const onSave = (id) => {
    onClickEdit(id, selectRef.current.value);
  };

  const result = inEditMode ? (
    <div className="edit-modal">
      <h4>Edit</h4>
      <p>New Note</p>
      <input
        type="text"
        value={editedText}
        onChange={(event) => setEditedText(event.target.value)}
      />
      <p>New Priority</p>
      <select ref={selectRef} onChange={handlePriorityChange}>
        <option value="P0">P0</option>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
      </select>
      <button onClick={() => onSave(inEditMode)}>Save</button>
      <button onClick={() => setInEditMode()}>Cancel</button>
    </div>
  ) : (
    notes.map((note) => {
      return (
        <div className="app-note-item" key={note.id}>
          <div className="app-note-item-text">{note.text}</div>

          <div className="app-note-operations">
            <div className="app-note-item-priority">{`[${note.priority}]`}</div>
            <button
              className="operation-btn"
              onClick={() =>
                deleteNotefromDB(note.id, setNotes, setError, setLoading)
              }
            >
              Delete
            </button>
            <button className="operation-btn" onClick={() => setInEditMode(note.id)}>Edit</button>
          </div>
        </div>
      );
    })
  );
  return result;
};

const Notes = () => {
  const [makeNote, setMakeNote] = useState("");
  const [priority, setPriority] = useState("P0");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMakeNote(event.target.value);
  };

  const addNote = () => {
    addNotesInDb(makeNote, priority, setNotes, setError, setLoading);
    setMakeNote("");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addNotesInDb(makeNote, priority, setNotes, setError, setLoading);
      setMakeNote("");
    }
  };

  const handlePriorityChange = () => {
    setPriority(selectRef.current.value);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    getAllNotesfromDB(setNotes, setError, setLoading);
  }, []);

  if (!localStorage.getItem("isLoggedIn")) {
    navigate("/login");
  }

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
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
      </div>
      <button className="add-btn" onClick={addNote}>Add</button>
      <div className="app-notes-container">
        <GetAllNotes
          notes={notes}
          setNotes={setNotes}
          setError={setError}
          error={error}
          loading={loading}
          setLoading={setLoading}
          handlePriorityChange={handlePriorityChange}
          selectRef={selectRef}
        />
      </div>
      <button className="logout-btn" onClick={handleLogOut}>LogOut</button>
    </div>
  );
};

export default Notes;
