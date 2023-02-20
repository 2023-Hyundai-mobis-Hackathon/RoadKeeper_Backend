const router = require("express").Router();

const connectDb = require("./db");

connectDb();

router.use("/result", require("./result"));
router.use("/main", require("./main"));

module.exports = router;
