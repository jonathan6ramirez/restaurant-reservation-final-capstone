const knex = require("../db/connection");

function listByDate(reservation_date) {
    return knex("reservations")
        .distinct()
        .select("*")
        .where({ "reservation_date": reservation_date})
        .orderBy("reservation_time", "asc");
}
function list(){
    return knex("reservations")
        .select("*")
}
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
    .where({ "reservation_id" : updatedReservatiom.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(reservation_id) {
    return knex("reservations").where({ reservation_id }).del();
}

module.exports = {
    list,
    listByDate,
    create,
    read,
    update,
    delete: destroy,
}