const knex = require("../db/connetion");

function list() {
    return knex("tables").select("*")
}