const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const {
  validTableName,
  validTableId,
  validCapacity,
  isOccupied,
  validData,
  tableNameExists,
  capacityExists,
  checkReservationExists,
  reservationIdExists,
} = require("../validations/validTables");

async function list(req, res) {
  const result = await service.list();
  res.json({ data: result });
}

async function listOpen(req, res, next) {
  const result = await service.listOpen();
  res.json({ data: result });
}

async function create(req, res) {
  const { table } = res.locals;
  const data = await service.create(table);
  res.status(201).json({ data });
}

async function update(req, res) {
  const table_id = req.params.table_id;
  const { reservation_id } = req.body.data;
  const data = await service.update(table_id, reservation_id);
  res.status(200).json({ data });
}

function read(req, res) {
  const data = res.locals.data;
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  listOpen: [asyncErrorBoundary(listOpen)],
  create: [
    validData,
    tableNameExists,
    validTableName,
    capacityExists,
    asyncErrorBoundary(create),
  ],
  update: [
    validData,
    reservationIdExists,
    asyncErrorBoundary(validTableId),
    asyncErrorBoundary(checkReservationExists),
    validCapacity,
    isOccupied,
    asyncErrorBoundary(update),
  ],
  read: [asyncErrorBoundary(validTableId), read],
};
