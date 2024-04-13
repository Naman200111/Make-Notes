const { NotesModel } = require("../../database-models/notesModelSchema");

const getNotesService = async (req, res) => {
  try {
    // const usertoken = "test";
    const notes = await NotesModel.find({}).lean();
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
  const { makeNote, priority } = req.body;
  // const userToken = "123";
  try {
    const existingNodesDocument = await NotesModel.findOne({});
    if (!existingNodesDocument) {
      await NotesModel.create({ notes: [{ text: makeNote, priority }] });
    } else {
      const addNote = await NotesModel.updateOne(
        {},
        { $push: { notes: { text: makeNote, priority } } }
      );
    }
    return res.status(200).send({
      status: true,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).send("Cannot add note: " + error);
  }
};

const deleteNotesService = async (req, res) => {
  const { id } = req.body;
  // const userToken = "123";
  try {
    const nullifyNote = await NotesModel.updateOne(
      { "notes._id": id },
      { $unset: { [`notes.$`]: 1 } }
    );
    const pullNote = await NotesModel.updateOne({}, { $pull: { notes: null } });
    return res.status(200).send({
      status: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).send("Unable to delete note: " + error);
  }
};

const editNotesService = async (req, res) => {
  const { id, newNote, newPriority } = req.body;
  // const userToken = "123";
  try {
    const editedNote = await NotesModel.updateOne(
      { "notes._id": id },
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
    return res.status(500).send("Unable to edit note: " + error);
  }
};

module.exports = {
  getNotesService,
  deleteNotesService,
  editNotesService,
  addNotesService,
};
