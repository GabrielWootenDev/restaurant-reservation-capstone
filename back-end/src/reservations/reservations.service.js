const knex = require("../db/connection");

async function list() {
  const results = await knex("reservations").select("*");
  return results;
}

async function listOnDate(date) {
  const results = await knex("reservations")
    .select("*")
    .whereNot({ status: "finished"})
    .whereNot({status: "cancelled"} )
    .where({ reservation_date: date })
    .orderBy("reservation_time", "asc");
  return results;
}

async function read(reservationId) {
  const results = await knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId });
  return results[0];
}

async function create(reservation) {
  const results = await knex("reservations").insert(reservation).returning("*");
  return results[0];
}

async function update(updatedReservation) {
  const results = await knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*");
  return results[0];
}

async function search(mobile_number) {
  results = await knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
    return results;
}

module.exports = {
  list,
  listOnDate,
  read,
  create,
  update,
  search,
};
