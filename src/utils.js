import { UPDATE_NOTES } from "./api/routes";
export const updateNotesInDb = async (makeNote, priority) => {
  try {
    const response = await fetch(`http://localhost:4000${UPDATE_NOTES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ makeNote, priority }),
    });
  } catch (error) {
    console.log(error);
  }
};
