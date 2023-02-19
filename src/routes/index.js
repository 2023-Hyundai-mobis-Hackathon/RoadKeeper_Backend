const router = require("express").Router();

const connectDb = require("./db");

connectDb();

router.use("/test", require("./test"))

module.exports = router;
