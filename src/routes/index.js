const router = require("express").Router();

const connectDb = require("./db");

connectDb();

router.use("/result", require("./result"))

module.exports = router;
