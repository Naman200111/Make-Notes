const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/getNotes", (req, res) => {
  res.status(200).send([
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
});

app.post("/updateNotes", (req, res) => {
  const { makeNote, priority } = req.body;
  // add it in db
  res.status(200).send("Updated");
});

app.post("/deleteNotes", (req, res) => {
  const { id } = req.body;
  // delete it from db
  res.status(200).send("deleted");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
