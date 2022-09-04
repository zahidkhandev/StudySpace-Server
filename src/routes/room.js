const express = require("express");
const { room } = require("../controllers/room/room");
const router = express.Router();

router.get("/:id", room);
