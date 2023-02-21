/* Result APIs */
const router = require("express").Router();
const ctrl = require("./result.ctrl");

/* GET */
router.get("/", ctrl.get_root);
router.get("/:user_id", ctrl.get_user_dangers);

/* POST */
router.post("/model", ctrl.post_model);

module.exports = router;