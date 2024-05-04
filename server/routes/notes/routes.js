const express = require("express");
const router = express.Router();
const {
  getNotesService,
  deleteNotesService,
  editNotesService,
  addNotesService,
} = require("./services");

router.post("/getNotes", getNotesService);
router.post("/deleteNotes", deleteNotesService);
router.post("/editNotes", editNotesService);
router.post("/addNotes", addNotesService);

module.exports = router;
