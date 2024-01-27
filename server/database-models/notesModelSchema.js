const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
  text: String,
  priority: String,
});

const notesSchema = new Schema({
  email: String,
  password: String,
  userToken: String,
  notes: [NoteSchema],
});

module.exports.NotesModel = model("MakeNotes", notesSchema);
