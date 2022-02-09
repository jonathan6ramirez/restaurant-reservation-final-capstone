const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { route } = require("../app")

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

module.exports = router;

