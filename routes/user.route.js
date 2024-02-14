const { getActiveUsers, getTotalActiveUsers, avgAgeOfUsers, topFiveFavouriteFruits } = require("../controllers/user.controller");

const router = require("express").Router();

router.route("/user/active").get(getActiveUsers);
router.route("/user/totalActive").get(getTotalActiveUsers);
router.route("/user/avgAge").get(avgAgeOfUsers);
router.route("/user/topFruits").get(topFiveFavouriteFruits);

module.exports = router;
