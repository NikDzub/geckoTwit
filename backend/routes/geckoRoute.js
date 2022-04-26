const express = require("express");

const router = express.Router();

const { getCoins, getCoin } = require("../controllers/geckoController");

router.route("/").get(getCoins);
router.route("/:id").get(getCoin);

module.exports = router;
