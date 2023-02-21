const router = require("express").Router();

const connectDb = require("./db");

connectDb();

router.use("/result", require("./result"));
router.use("/main", require("./main"));
router.use("/archive", require("./archive"));
router.use("/info", require("./info"));

module.exports = router;
