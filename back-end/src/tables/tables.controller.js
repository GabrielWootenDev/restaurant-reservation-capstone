const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
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
  isNotOccupied,
  isReservationSeated,
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
  const { table_id } = res.locals.tableInfo;
  const { reservation_id } = res.locals.reservation;
  const data = await service.update(table_id, reservation_id);
  res.status(200).json({ data });
}

async function updateReservationStatus(req, res, next) {
  const reservation = res.locals.reservation;
  //newStatus is updated to be the next valid status in the chain of if booked -> seated, if seated -> finished based from the previous reservation status
  const newStatus =
    reservation.status === "booked"
      ? "seated"
      : reservation.status === "seated" && "finished";
  const updatedReservation = {
    ...reservation,
    status: newStatus,
  };
  await reservationsService.update(updatedReservation);
  next();
}

function read(req, res) {
  const data = res.locals.data;
  res.status(200).json({ data });
}

function finishTable(req, res, next) {
  const tableInfo = res.locals.tableInfo;
  const data = service.unseatTable(tableInfo.table_id);
  res.status(200).json({ data });
}

async function readReservationInfo(req, res, next) {
  const { reservation_id } = res.locals.tableInfo;
  const reservation = await reservationsService.read(reservation_id);
  res.locals.reservation = reservation;
  next();
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
    isReservationSeated,
    validCapacity,
    isOccupied,
    asyncErrorBoundary(updateReservationStatus),
    asyncErrorBoundary(update),
  ],

  read: [asyncErrorBoundary(validTableId), read],
  finishTable: [
    asyncErrorBoundary(validTableId),
    isNotOccupied,
    asyncErrorBoundary(readReservationInfo),
    asyncErrorBoundary(updateReservationStatus),
    asyncErrorBoundary(finishTable),
  ],
};
