const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

//add post for route
router.route("/").get(controller.listOnDate).all(methodNotAllowed);

module.exports = router;
