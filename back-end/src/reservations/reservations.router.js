/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { route } = require("../app");

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;
