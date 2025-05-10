const express = require("express");
const router = express.Router();
const { getClientScore } = require("../controllers/ScoreController");

router.get("/clients/:id/score", getClientScore);

module.exports = router;
