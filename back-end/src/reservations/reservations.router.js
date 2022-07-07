const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router.route("/").get(controller.listOnDate).post(controller.create).all(methodNotAllowed);
router.route("/:reservation_id").get(controller.read).all(methodNotAllowed);

module.exports = router;
