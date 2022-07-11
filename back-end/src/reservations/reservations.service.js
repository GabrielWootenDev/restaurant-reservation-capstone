const knex = require("../db/connection");


async function list() {
    const results = await knex("reservations").select("*");
    return results;
}

async function listOnDate(date) {
    const results = await knex("reservations").select("*").where({reservation_date: date}).orderBy("reservation_time", "asc");
    return results;
}

async function read(reservationId) {
    const results = await knex("reservations").select("*").where({reservation_id: reservationId});
    return results[0];
}

async function create(reservation) {
    const results = await knex("reservations").insert(reservation).returning("*");
    return results[0];
}

module.exports = {
    list,
    listOnDate,
    read,
    create,
}