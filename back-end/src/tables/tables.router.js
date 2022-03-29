const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { route } = require("../app")

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:tableId/seat")
    .put(controller.seat)
    .delete(controller.delete)
    .all(methodNotAllowed);

// TODO MAKE A ROUTE FOR A PUT TO `/:table_id/seat`

module.exports = router;

