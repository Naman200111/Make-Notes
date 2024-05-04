const { NotesModel } = require("../../database-models/notesModelSchema");

const signupService = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await NotesModel.findOne({ email });
    if (foundUser) {
        return res.status(400).send("Email Id already exists");
    }
    await NotesModel.create({ name, email, password, notes: [] });
    return res.status(200).send("SignUp Successfull");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const loginService = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await NotesModel.findOne({ email });
        if (!foundUser || foundUser.password !== password) {
            return res.status(400).send("Invalid Credentials");
        }
        return res.status(200).send("Login Successfull");
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    loginService,
    signupService,
};
