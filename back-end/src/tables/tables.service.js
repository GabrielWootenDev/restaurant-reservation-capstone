const knex = require("../db/connection");

async function listOpen() {
  const results = await knex("tables")
    .select("*")
    .whereNull("reservation_id");
  return results;
}

module.exports = {
  listOpen,
};
