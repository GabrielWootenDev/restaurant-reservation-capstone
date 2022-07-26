const service = require("../tables/tables.service");
const reservationService = require("../reservations/reservations.service");

function tableNameExists(req, res, next) {
  const tableName = res.locals.table.table_name;
  tableName && typeof tableName === "string"
    ? next()
    : next({ status: 400, message: `Table must include a table_name` });
}

function reservationIdExists(req, res, next) {
  const reservationId = res.locals.table.reservation_id;
  reservationId
    ? next()
    : next({ status: 400, message: `Must include a reservation_id` });
}

function validTableName(req, res, next) {
  const tableName = res.locals.table.table_name;
  tableName.length >= 2
    ? next()
    : next({
        status: 400,
        message: `table_name must be atleast 2 characters long`,
      });
}

function validData(req, res, next) {
  const table = req.body.data;
  res.locals.table = table;
  table ? next() : next({ status: 400, message: `Must include table data` });
}

function capacityExists(req, res, next) {
  const capacity = res.locals.table.capacity;
  capacity && typeof capacity === "number" && capacity >= 1
    ? next()
    : next({
        status: 400,
        message: `Table must include a capacity of 1 or greater`,
      });
}

async function validTableId(req, res, next) {
  const { table_id } = req.params;
  const tableInfo = await service.read(table_id);
  res.locals.tableInfo = tableInfo;
  tableInfo
    ? next()
    : next({
        status: 404,
        message: `table_id ${table_id} doesn't exist`,
      });
}

function validCapacity(req, res, next) {
  const { people } = res.locals.reservation;
  const table = res.locals.tableInfo;
  table.capacity >= people
    ? next()
    : next({ status: 400, message: `Table capacity too small` });
}

function isOccupied(req, res, next) {
  const { tableInfo } = res.locals;
  !tableInfo.reservation_id
    ? next()
    : next({
        status: 400,
        message: `${res.locals.tableInfo.table_name} is occupied, please select another table.`,
      });
}

async function checkReservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  //sets reservation to the response from the reservationService;
  const reservation = await reservationService.read(Number(reservation_id));
  //if the reservation exists it is passed through locals
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist`,
  });
}

function isNotOccupied(req, res, next) {
  const { tableInfo } = res.locals;
  tableInfo.reservation_id
    ? next()
    : next({
        status: 400,
        message: `${res.locals.tableInfo.table_name} is not occupied!`,
      });
}

function isReservationSeated(req, res, next) {
  const { status } = res.locals.reservation;
  //when seating a reservation if status of reservation is already seated sends error
  status === "seated"
    ? next({ status: 400, message: `Reservation status is already ${status}` })
    : next();
}


module.exports = {
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
};
