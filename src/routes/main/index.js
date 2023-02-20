/* Main APIs */
const router = require("express").Router();
const ctrl = require("./main.ctrl");

/* GET */
router.get("/report", ctrl.get_report);
router.get("/pbv", ctrl.get_pbv);

module.exports = router;