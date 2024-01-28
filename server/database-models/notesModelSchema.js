const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
});

const notesSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userToken: {
      type: String,
      required: true,
    },
    notes: [NoteSchema],
  },
  { timestamps: true }
);

module.exports.NotesModel = model("MakeNotes", notesSchema);
