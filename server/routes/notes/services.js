const { NotesModel } = require("../../database-models/notesModelSchema");

const getNotesService = async (req, res) => {
  try {
    const usertoken = "123";
    // const notes = await NotesModel.find({
    //   userToken: "123",
    // }).lean();
    // const notes = await NotesModel.find().lean();
    // console.log(notes.notes, "notesfromDB");
    return res.status(200).send([
      {
        text: "This is a note",
        priority: "p0",
        id: "0",
      },
      {
        text: "This is another note",
        priority: "p1",
        id: "1",
      },
    ]);
  } catch (error) {
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
    return res.status(200).send({
      status: true,
      message: "Note added successfully",
    });
    // return res.status(200).send([
    //   {
    //     text: "This is a note",
    //     priority: "p0",
    //     id: "0",
    //   },
    //   {
    //     text: "This is another note",
    //     priority: "p1",
    //     id: "1",
    //   },
    //   {
    //     text: "This is third note",
    //     priority: "p2",
    //     id: "2",
    //   },
    // ]);
  } catch (error) {
    return res.status(500).send("Cannot add note: " + error);
  }
};

const deleteNotesService = async (req, res) => {
  const { id } = req.body;
  const userToken = "123";
  try {
    const nullifyNote = await NotesModell.findOneAndUpdate(
      { userToken },
      { $unset: { [`notes.${id}`]: 1 } },
      { $new: true }
    );
    const pullNote = await NotesModel.findOneAndUpdate(
      { userToken },
      { $push: { notes: null } },
      { $new: true }
    );
    return res.status(200).send({
      status: true,
      message: "Note deleted successfully",
    });
    // return res.status(200).send([
    //   {
    //     text: "This is a note",
    //     priority: "p0",
    //     id: "0",
    //   },
    //   {
    //     text: "This is another note",
    //     priority: "p1",
    //     id: "1",
    //   },
    // ]);
  } catch (error) {
    return res.status(500).send("Unable to delete note: " + error);
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
