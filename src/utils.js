import { ADD_NOTES, GET_NOTES, DELETE_NOTES, EDIT_NOTES, LOGIN, SIGNUP } from "./api/routes";

export const addNotesInDb = async (
  makeNote,
  priority,
  setNotes,
  setError,
  setLoading
) => {
  try {
    const credentials = localStorage.getItem("credentials");
    const { email } = JSON.parse(credentials || '{}');
    setLoading(true);
    const response = await fetch(`http://localhost:4000/api${ADD_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ makeNote, priority, email }),
    });
    if (!response.ok) {
      throw "Failed to add a note";
    }
    getAllNotesfromDB(setNotes, setError, setLoading);
  } catch (error) {
    alert(error);
  } finally {
    setLoading(false);
  }
};

export const getAllNotesfromDB = async (setNotes, setError, setLoading) => {
  try {
    setLoading(true);
    const credentials = localStorage.getItem("credentials");
    const { email } = JSON.parse(credentials || '{}');
    const response = await fetch(`http://localhost:4000/api${GET_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw "Failed to fetch notes";
    }
    const data = await response.json();
    setNotes(data);
  } catch (error) {
    setError(error);
    alert(error);
  } finally {
    setLoading(false);
  }
};

export const deleteNotefromDB = async (id, setNotes, setError, setLoading) => {
  try {
    const credentials = localStorage.getItem("credentials");
    const { email } = JSON.parse(credentials || '{}');
    setLoading(true);
    const response = await fetch(`http://localhost:4000/api${DELETE_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email }),
    });
    if (!response.ok) {
      throw "Failed to delete a note"
    }
    getAllNotesfromDB(setNotes, setError, setLoading);
  } catch (error) {
    alert(error);
  } finally {
    setLoading(false);
  }
};

export const editNoteInDB = async (
  id,
  setNotes,
  setError,
  setLoading,
  newPriority,
  newNote
) => {
  try {
    const credentials = localStorage.getItem("credentials");
    const { email } = JSON.parse(credentials || '{}');
    const response = await fetch(`http://localhost:4000/api${EDIT_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, newPriority, newNote, email }),
    });
    if (!response.ok) {
      throw "Failed to edit a note"
    }
    getAllNotesfromDB(setNotes, setError, setLoading);
  } catch (error) {
    alert(error);
  } finally {
    setLoading(false);
  }
};

export const login = async (
  email,
  password,
  navigate
) => {
  try {
    const response = await fetch(`http://localhost:4000/api${LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw "Login Failed"
    }

    navigate("/");
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("credentials", JSON.stringify({ email, password }));
  } catch (error) {
    alert(error);
  }
};

export const signup = async (
  name,
  email,
  password,
  navigate
) => {
  try {
    const response = await fetch(`http://localhost:4000/api${SIGNUP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw ("Sign up failed");
    }
    
    navigate("/login");
  } catch (error) {
    alert(error);
  }
};
