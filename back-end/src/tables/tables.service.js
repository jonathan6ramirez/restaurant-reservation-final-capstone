const knex = require("../db/connection");
// TODO make a call that assigns the given reservation id to the table that matches the table


function list() {
    return knex("tables").select("*").orderBy("table_name", "asc")
}

function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
    // console.info("this is inside the service file", table_id);
    return knex("tables")
        .select("*")
        .where({ "table_id": table_id })
        .first();
}

function update(updatedTable) {
    return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
    create,
    list,
    read,
    update
}