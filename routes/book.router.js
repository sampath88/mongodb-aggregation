const router = require("express").Router();

const { getBooksAndAuthor } = require("../controllers/book.controller");
router.route("/book/getBooksAndAuthor").get(getBooksAndAuthor);

module.exports = router;
