const knex = require("../db/connection");

async function list() {
  const results = await knex("tables").select("*").orderBy("table_name", "asc");
  return results;
}

async function listOpen() {
  const results = await knex("tables").select("*").whereNull("reservation_id");
  return results;
}

module.exports = {
  list,
  listOpen,
};
