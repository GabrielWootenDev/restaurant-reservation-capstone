const knex = require("../db/connection");

async function list() {
  const results = await knex("tables").select("*").orderBy("table_name", "asc");
  return results;
}

async function listOpen() {
  const results = await knex("tables").select("*").whereNull("reservation_id");
  return results;
}

async function create(newTable) {
  const results = await knex("tables").insert(newTable).returning("*");
  return results[0];
}

async function update(table_id, reservation_id) {
  const results = await knex("tables").select("*").where({table_id: table_id}).update({reservation_id: reservation_id}, "*");
  return results[0];
}
 
module.exports = {
  list,
  listOpen,
  create,
  update
};
