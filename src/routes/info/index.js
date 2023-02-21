/* Info APIs */
const router = require("express").Router();
const ctrl = require("./info.ctrl");

/* GET */
router.get("/user", ctrl.get_user);
router.get("/road", ctrl.get_road);
router.get("/pbv", ctrl.get_pbv);
// router.get("/:user_id", ctrl.get_user_dangers);

module.exports = router;