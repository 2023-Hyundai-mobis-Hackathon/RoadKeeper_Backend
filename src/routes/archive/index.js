/* Archive APIs */
const router = require("express").Router();
const ctrl = require("./archive.ctrl");

/* GET */
router.get("/road", ctrl.get_road);
// router.get("/:user_id", ctrl.get_user_dangers);

module.exports = router;