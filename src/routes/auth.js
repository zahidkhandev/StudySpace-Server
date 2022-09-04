const express = require("express");
const router = express.Router();
const {
  googleRegister,
  register,
  emailLogin,
  userNameLogin,
} = require("../controllers/user/auth");

//GOOGLE
router.post("/google", googleRegister);

router.post("/register", register);

router.post("/email-login", emailLogin);

router.post("/username-login", userNameLogin);

module.exports = router;
