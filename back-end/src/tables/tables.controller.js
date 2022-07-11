const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");

//add create table validations

async function list(req, res) {
  const result = await service.list();
  res.json({ data: result });
}

async function listOpen(req, res, next) {
  const { status } = req.params;
  if (status === "available") {
    const result = await service.listOpen();
    res.json({ data: result });
  } else {
    next();
  }
}

async function create(req, res, next) {
  const newTable = req.body.data;
  const data = await service.create(newTable);
  res.status(201).json({ data });
}
async function update(req, res, next) {
  const table_id = req.params.table_id;
  const { reservation_id } = req.body.data;
  const data = await service.update(table_id, reservation_id);
  res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(listOpen), asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(update)],
};
