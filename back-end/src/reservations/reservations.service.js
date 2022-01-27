const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
    return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(updatedReservation) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id : updatedReservatiom.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(reservation_id) {
    return knex("reservations").where({ reservation_id }).del();
}

module.exports = {
    create,
    read,
    update,
    delete: destroy,
}