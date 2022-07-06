const knex = require("../db/connection");

async function list() {
  const results = await knex("tables").select("*");
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
