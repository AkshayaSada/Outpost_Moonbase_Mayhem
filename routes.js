const express = require("express");

const createRoom = require("./api/rooms/create");
const joinRoom = require("./api/rooms/join");
const getState = require("./api/rooms/state");
const roomAction = require("./api/rooms/action");

const router = express.Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.get("/state", getState);
router.post("/action", roomAction);

module.exports = router;