const knex = require("../db/connection");


async function list() {
    const results = await knex("reservations").select("*");
    return results;
}

async function listOnDate(date) {
    const results = await knex("reservations").select("*").where({reservation_date: date});
    return results;
}

async function create(reservation) {
    const results = await knex("reservations").insert(reservation).returning("*");
    return results[0];
}

module.exports = {
    list,
    listOnDate,
    create,
}