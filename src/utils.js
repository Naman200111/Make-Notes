import { ADD_NOTES, GET_NOTES, DELETE_NOTES, EDIT_NOTES, LOGIN, SIGNUP } from "./api/routes";

const credentials = localStorage.getItem("credentials");
const { email } = JSON.parse(credentials);

export const addNotesInDb = async (
  makeNote,
  priority,
  setNotes,
  setError,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await fetch(`http://localhost:4000/api${ADD_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ makeNote, priority, email }),
    });
    if (!response.ok) {
      throw Error("HTTP Error " + response.status);
    }
    getAllNotesfromDB(setNotes, setError, setLoading);
  } catch (error) {
    console.log(error, " in adding notes");
    alert("Error in adding note, please try again later" + error);
  } finally {
    setLoading(false);
  }
};

export const getAllNotesfromDB = async (setNotes, setError, setLoading) => {
  try {
    setLoading(true);
    console.log("fetching");
    const response = await fetch(`http://localhost:4000/api${GET_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw Error("HTTP Error " + response.status);
    }
    const data = await response.json();
    setNotes(data);
  } catch (error) {
    console.log(error, " in fetching notes");
    setError(error);
    alert("Error in fetching notes, please try again later" + error);
  } finally {
    setLoading(false);
  }
};

export const deleteNotefromDB = async (id, setNotes, setError, setLoading) => {
  try {
    setLoading(true);
    const response = await fetch(`http://localhost:4000/api${DELETE_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email }),
    });
    if (!response.ok) {
      throw Error("HTTP Error " + response.status);
    }
    getAllNotesfromDB(setNotes, setError, setLoading);
  } catch (error) {
    console.log(error);
    alert("Error in deleting note, please try again later " + error);
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
    const response = await fetch(`http://localhost:4000/api${EDIT_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, newPriority, newNote, email }),
    });
    if (!response.ok) {
      throw Error("HTTP Error " + response.status);
    }
    getAllNotesfromDB(setNotes, setError, setLoading);
  } catch (error) {
    console.log(error);
    alert("Error in editing note, please try again later " + error);
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
      throw Error("HTTP Error " + response.status);
    }

    navigate("/");
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("credentials", JSON.stringify({ email, password }));
  } catch (error) {
    console.log(error);
    alert("Error in loggin in, please try again later " + error);
  } finally {
    // setLoading(false);
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
      throw Error("HTTP Error " + response.status);
    }
    
    navigate("/login");
  } catch (error) {
    console.log(error);
    alert("Error in signing up, please try again later " + error);
  } finally {
    // setLoading(false);
  }
};
