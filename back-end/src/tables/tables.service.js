const knex = require("../db/connection");

function list() {
    return knex("tables").select("*").orderBy("table_name", "asc")
}

function create(table) {
    console.log(table, "this is the table inside the tables.service file")
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
    create,
    list,
}