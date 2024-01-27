const { NotesModel } = require("../../database-models/notesModelSchema");

const getNotesService = async (req, res) => {
  try {
    const usertoken = "123";
    // const notes = await NotesModel.find({
    //   userToken: "123",
    // }).lean();
    const notes = await NotesModel.find().lean();
    console.log(notes.notes, "notesfromDB");
    return res.status(200).send([
      {
        text: "This is a note",
        priority: "p0",
        id: "1",
      },
      {
        text: "This is another note",
        priority: "p1",
        id: "2",
      },
    ]);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const addNotesService = async (req, res) => {
  const { makeNote, priority } = req.body;
  const userToken = "123";
  try {
    const addNote = await NotesModel.findOneAndUpdate(
      { userToken },
      { $push: { notes: { text: makeNote, priority } } },
      { $new: true }
    );
    // return res.status(200).send("note added");
    return res.status(200).send([
      {
        text: "This is a note",
        priority: "p0",
        id: "1",
      },
      {
        text: "This is another note",
        priority: "p1",
        id: "2",
      },
    ]);
  } catch (error) {
    return res.status(500).send("cannot add note: " + error);
  }
};

const deleteNotesService = async (req, res) => {
  const { id } = req.body;
  const userToken = "123";
  try {
    const nullifyNote = await NotesModel.findOneAndUpdate(
      { userToken },
      { $unset: { [`notes.${id}`]: 1 } },
      { $new: true }
    );
    const pullNote = await NotesModel.findOneAndUpdate(
      { userToken },
      { $push: { notes: null } },
      { $new: true }
    );
    return res.status(200).send("note deleted");
  } catch (error) {
    return res.status(500).send("unable to delete note: " + error);
  }
};

const editNotesService = async (req, res) => {
  const { id, newNote, newPriority } = req.body;
  const userToken = "123";
  try {
    const editedNote = await NotesModel.findOneAndUpdate(
      { userToken },
      {
        $set: {
          [`notes.${id}.text`]: newNote,
          [`notes.${id}.priority`]: newPriority,
        },
      },
      { $new: true }
    );
    return res.status(200).send("note edited successfully");
  } catch (error) {
    return res.status(500).send("unable to edit note: " + error);
  }
};

module.exports = {
  getNotesService,
  deleteNotesService,
  editNotesService,
  addNotesService,
};
