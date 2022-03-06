const knex = require("../db/connection");
/**
* 
* @param {*} reservation_date 
* @returns list of reservations that match the given date
*/ 
function listByDate(reservation_date) {
    return knex("reservations")
        .distinct()
        .select("*")
        .where({ "reservation_date": reservation_date})
        .orderBy("reservation_time", "asc");
}
/**
* 
* @returns all reservations regardless of date
*/
function list(){
    return knex("reservations")
        .select("*")
}

/**
 * 
 * @param {*} reservation 
 * @returns the created record within the database
 */
function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

/**
* 
* @param {*} reservation_id 
* @returns reservation that is matched with the given id
*/
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