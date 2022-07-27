const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const {
  bodyDataHasFirstName,
  bodyDataHasLastName,
  bodyDataHasMobile,
  bodyDataHasPeople,
  bodyDataHasDate,
  bodyDataHasTime,
} = require("../validations/bodyDataHas");
const {
  checkOpen,
  checkFutureDate,
  checkPastTime,
  checkOpenTime,
  checkReservationStatus,
  checkValidStatus,
  checkNewStatus,
  checkBooked,
} = require("../validations/validReservations");
const { RowDescriptionMessage } = require("pg-protocol/dist/messages");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listFromQuery(req, res) {
  const { data } = res.locals;
  res.json({ data });
}

// validateQuery checks the existing query and passes the appropriate data based on type of query to the next function via locals.
async function validateQuery(req, res, next) {
  if (req.query.mobile_number) {
    //if the query is a mobile_number then the function makes a call to the search service function
    const { mobile_number } = req.query;
    res.locals.mobile_number = mobile_number;
    res.locals.data = await service.search(mobile_number);
    next();
  }
  if (req.query.date) {
    //if the query is a date then the function makes a call to the listOnDate service function
    const { date } = req.query;
    res.locals.date = date;
    res.locals.data = await service.listOnDate(date);
    next();
  }
  if (!req.query.date && !req.query.mobile_number) {
    res.locals.data = await service.list();
    next();
  }
}

async function create(req, res) {
  const reservation = req.body.data;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
}

async function validReservationId(req, res, next) {
  const reservationId = req.params.reservation_id;
  const data = await service.read(reservationId);

  if (data) {
    //if data from the read service function exists then the reservation id was valid and the data is passed on through locals
    res.locals.reservation = data;
    next();
  } else {
    next({ status: 404, message: `Reservation Id ${reservationId} not found` });
  }
}

async function updateReservationStatus(req, res, next) {
  const reservation = res.locals.reservation;
  const newStatus = req.body.data.status;
  // updated reservation is a new object with the old reservation information but changed status to the new status in the request body
  const updatedReservation = {
    ...reservation,
    status: newStatus,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
}

async function update(req, res) {
  const updatedReservation = req.body.data;
  const { reservation_id } = res.locals.reservation;
  // reservation is a new object with the updated reservation information and the reservation_id from previous validation.
  const reservation = {
    ...updatedReservation,
    reservation_id: reservation_id,
  };
  const data = await service.update(reservation);
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  listFromQuery: [asyncErrorBoundary(validateQuery), listFromQuery],
  read: [asyncErrorBoundary(validReservationId), read],
  create: [
    bodyDataHasFirstName,
    bodyDataHasLastName,
    bodyDataHasMobile,
    bodyDataHasDate,
    bodyDataHasTime,
    bodyDataHasPeople,
    checkValidStatus,
    checkOpen,
    checkFutureDate,
    checkPastTime,
    checkOpenTime,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(validReservationId),
    checkNewStatus,
    checkReservationStatus,
    asyncErrorBoundary(updateReservationStatus),
  ],
  update: [
    bodyDataHasFirstName,
    bodyDataHasLastName,
    bodyDataHasMobile,
    bodyDataHasDate,
    bodyDataHasTime,
    bodyDataHasPeople,
    asyncErrorBoundary(validReservationId),
    checkBooked,
    checkOpen,
    checkFutureDate,
    checkPastTime,
    checkOpenTime,
    asyncErrorBoundary(update),
  ],
};
