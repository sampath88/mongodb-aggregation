const { getActiveUsers, getTotalActiveUsers, avgAgeOfUsers, topFiveFavouriteFruits, genderCount, highestRegisteredUsersByCountry, getEyeColors, avgNumberOfTags, usersWithEnimTag, userWithOneOfTheTag, userWithATagAndInactive, phoneStartingWith, recentlyRegistered, categorizeByFruit, adAsSecondTag, enimAndIdAsTag, companyAndUserCount } = require("../controllers/user.controller");

const router = require("express").Router();

router.route("/user/active").get(getActiveUsers);
router.route("/user/totalActive").get(getTotalActiveUsers);
router.route("/user/avgAge").get(avgAgeOfUsers);
router.route("/user/topFruits").get(topFiveFavouriteFruits);
router.route("/user/genderCount").get(genderCount);
router.route("/user/highestUsers").get(highestRegisteredUsersByCountry);
router.route("/user/eyeColors").get(getEyeColors);
router.route("/user/avgNumberOfTags").get(avgNumberOfTags);
router.route("/user/usersWithEnimTag").get(usersWithEnimTag);
router.route("/user/userWithOneOfTheTag").get(userWithOneOfTheTag);
router.route("/user/userWithATagAndInactive").get(userWithATagAndInactive);
router.route("/user/phoneStartingWith").get(phoneStartingWith);
router.route("/user/recentlyRegistered").get(recentlyRegistered);
router.route("/user/categorizeByFruit").get(categorizeByFruit);
router.route("/user/adAsSecondTag").get(adAsSecondTag);
router.route("/user/enimAndIdAsTag").get(enimAndIdAsTag);
router.route("/user/companyAndUserCount").get(companyAndUserCount);

module.exports = router;
