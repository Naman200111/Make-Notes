import { ADD_NOTES, GET_NOTES, DELETE_NOTES } from "./api/routes";
export const addNotesInDb = async (makeNote, priority, setNotes, setError) => {
  try {
    const response = await fetch(`http://localhost:4000/api${ADD_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ makeNote, priority }),
    })
      .then((response) => response.json())
      .then((data) => setNotes(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllNotesfromDB = async (setNotes, setError) => {
  try {
    await fetch(`http://localhost:4000/api${GET_NOTES}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  } catch (error) {
    console.log(error, " in fetch notes");
    setError(error);
  }
};

export const deleteNotefromDB = async (id, setNotes, setError) => {
  try {
    await fetch(`http://localhost:4000/api${DELETE_NOTES}`, {
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

export const editNoteInDB = async (id, setNotes, setError) => {
  // try {
  //   await fetch(`http://localhost:4000/api${EDIT_NOTES}`, {
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
