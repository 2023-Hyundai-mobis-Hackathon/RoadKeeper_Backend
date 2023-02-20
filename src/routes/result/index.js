/* Test APIs */
const router = require("express").Router();
const ctrl = require("./result.ctrl");

/* GET */
router.get("/", ctrl.get_root);

module.exports = router;