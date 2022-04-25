const express = require("express");

const router = express.Router();

const { getCoins } = require("../controllers/geckoController");

router.route("/").get(getCoins);

module.exports = router;
