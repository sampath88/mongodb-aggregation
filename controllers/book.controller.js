const Book = require("../models/book.model");

/* Lookup pipeline */
exports.getBooksAndAuthor = async (req, res) => {
  try {
    const booksAndAuthor = await Book.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "author_id",
          foreignField: "_id",
          as: "author_details",
        },
      },
      {
        $addFields: {
          author_details: {
            // $first: "$author_details",
            //* Another way  */
            $arrayElemAt: ["$author_details", 0],
          },
        },
      },
    ]);

    res.status(200).send(booksAndAuthor);
  } catch (error) {
    res.status(400).send(error);
  }
};
