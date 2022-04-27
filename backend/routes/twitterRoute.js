const express = require("express");

const router = express.Router();

const { getTweets } = require("../controllers/twitterController");

router.route("/:id").get(getTweets);

module.exports = router;
