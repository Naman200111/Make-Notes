const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const authenticationRouter = require("./routes/authentication/routes");
const notesRouter = require("./routes/notes/routes");

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successfully Connected to mongo database"))
  .catch((error) => console.log("Error connecting to db" + error));

app.use("/api", authenticationRouter)
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
