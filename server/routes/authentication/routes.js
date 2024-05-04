const express = require("express");
const router = express.Router();
const {
  loginService,
  signupService,
} = require("./services");

router.post("/login", loginService);
router.post("/signup", signupService);

module.exports = router;
