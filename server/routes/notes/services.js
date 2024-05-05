const { NotesModel } = require("../../database-models/notesModelSchema");

const getNotesService = async (req, res) => {
  try {
    const { email } = req.body;
    const notes = await NotesModel.find({ email }).lean();
    const finalNotes =
      notes[0] &&
      notes[0].notes.map((note) => {
        return {
          text: note.text,
          priority: note.priority,
          id: note._id,
        };
      });
    return res.status(200).send(notes[0] ? finalNotes : []);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const addNotesService = async (req, res) => {
  const { makeNote, priority, email } = req.body;
  try {
    const existingNodesDocument = await NotesModel.findOne({ email });
    if (!existingNodesDocument) {
      throw error("User not found");
    } else {
      const addNote = await NotesModel.updateOne(
        { email },
        { $push: { notes: { text: makeNote, priority } } }
      );
    }
    return res.status(200).send({
      status: true,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteNotesService = async (req, res) => {
  const { id, email } = req.body;
  try {
    const nullifyNote = await NotesModel.updateOne(
      { email, "notes._id": id },
      { $unset: { [`notes.$`]: 1 } }
    );
    const pullNote = await NotesModel.updateOne({email}, { $pull: { notes: null } });
    return res.status(200).send({
      status: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const editNotesService = async (req, res) => {
  const { id, newNote, newPriority, email } = req.body;
  try {
    const editedNote = await NotesModel.updateOne(
      { email, "notes._id": id },
      {
        $set: {
          [`notes.$.text`]: newNote,
          [`notes.$.priority`]: newPriority,
        },
      }
    );
    return res.status(200).send({
      status: true,
      message: "Note edited successfully",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getNotesService,
  deleteNotesService,
  editNotesService,
  addNotesService,
};
