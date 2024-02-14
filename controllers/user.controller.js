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

exports.genderCount = async (req, res) => {
  try {
    const genderCount = await User.aggregate([
      {
        $group: {
          _id: "$gender",
          genderCount: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).send(genderCount);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.highestRegisteredUsersByCountry = async (req, res) => {
  try {
    const genderCount = await User.aggregate([
      {
        $group: {
          _id: "$company.location.country",
          users: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          users: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    res.status(200).send(genderCount);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getEyeColors = async (req, res) => {
  try {
    const eyeColors = await User.aggregate([
      {
        $group: {
          _id: "$eyeColor",
        },
      },
    ]);
    res.status(200).send(eyeColors);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.avgNumberOfTags = async (req, res) => {
  try {
    /* Method-1 */
    // const avgNumberOfTags = await User.aggregate([
    //   {
    // * $unwind wil create a duplicate document for each item in the $tags array  */
    //     $unwind: {
    //       path: "$tags",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       numberOfTags: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       avgNumberOfTags: {
    //         $avg: "$numberOfTags",
    //       },
    //     },
    //   },
    // ]);

    /* Method - 2 */
    const avgNumberOfTags = await User.aggregate([
      {
        //* adding a new field to each document */
        $addFields: {
          //* new field Name
          numberOfTags: {
            //* expression to resolve the new field value */
            //* AND */
            //* $size operator will calculates the size of the array*/
            $size: {
              //* $ifNull will assign the empty array, if the $tags value is null */
              $ifNull: ["$tags", []],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          avgNumberOfTags: {
            $avg: "$numberOfTags",
          },
        },
      },
      {
        //* This stage wil convert avg to Integer */
        $project: {
          _id: 0,
          avgNumberOfTags: {
            //* $toInt will convert the given value to integer */
            $toInt: "$avgNumberOfTags",
          },
        },
      },
    ]);
    res.status(200).send(avgNumberOfTags);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.usersWithEnimTag = async (req, res) => {
  try {
    const usersWithEnimTag = await User.aggregate([
      {
        $match: {
          tags: "enim",
        },
      },
      {
        $count: "usersWithEnimTag",
      },
    ]);

    res.status(200).send(usersWithEnimTag);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.userWithOneOfTheTag = async (req, res) => {
  try {
    const usersWithOneOfTheTag = await User.aggregate([
      {
        $match: {
          tags: { $in: ["enim", "do"] },
        },
      },
      {
        $count: "usersWithOneOfTheTag",
      },
    ]);
    res.status(200).send(usersWithOneOfTheTag);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.userWithATagAndInactive = async (req, res) => {
  try {
    const inactiveAndWithTag = await User.aggregate([
      {
        $match: {
          isActive: false,
          tags: "velit",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          age: 1,
        },
      },
    ]);

    res.status(200).send(inactiveAndWithTag);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.phoneStartingWith = async (req, res) => {
  try {
    const phoneStartingWith = await User.aggregate([
      {
        $match: {
          "company.phone": {
            $regex: /^\+1 \(940\)/,
          },
        },
      },
      {
        $count: "filteredUsers",
      },
    ]);
    res.status(200).send(phoneStartingWith);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.recentlyRegistered = async (req, res) => {
  try {
    const recentlyRegistered = await User.aggregate([
      {
        $sort: {
          registered: -1,
        },
      },
      {
        $limit: 4,
      },
      {
        $project: {
          name: 1,
          age: 1,
          registered: 1,
        },
      },
    ]);
    res.status(200).send(recentlyRegistered);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.categorizeByFruit = async (req, res) => {
  try {
    const categorizeByFruit = await User.aggregate([
      {
        $group: {
          _id: "$favoriteFruit",
          //* Just push name string */
          //   users: { $push: "$name" },
          //* To push as an object */
          users: { $push: { name: "$name", age: "$age", id: "$_id" } },
        },
      },
    ]);

    res.status(200).send(categorizeByFruit);
  } catch (error) {
    res.status(400).send(error);
  }
};
