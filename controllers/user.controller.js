const User = require("../models/user.model");

/**
 * Get Users
 * @param {Request} req
 * @param {Response} res
 */
exports.getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await User.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
    ]);

    res.status(200).send(activeUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTotalActiveUsers = async (req, res) => {
  try {
    const totalActiveUsers = await User.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $count: "activeUsers",
      },
    ]);
    res.status(200).send(totalActiveUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.avgAgeOfUsers = async (req, res) => {
  try {
    const averageAge = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: {
            $avg: "$age",
          },
        },
      },
    ]);
    delete averageAge[0]._id;
    res.status(200).send(averageAge[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.topFiveFavouriteFruits = async (req, res) => {
  try {
    const topFiveFavouriteFruits = await User.aggregate([
      {
        $group: {
          _id: "$favoriteFruit",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    res.status(200).send(topFiveFavouriteFruits);
  } catch (error) {
    res.status(400).send(error);
  }
};
