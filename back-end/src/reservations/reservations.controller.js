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
  mobileNumberExists,
} = require("../validations/validReservations");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listFromQuery(req, res) {
  const { data } = res.locals;
  res.json({ data });
}

async function validateQuery(req, res, next) {
  if (req.query.mobile_number) {
    const { mobile_number } = req.query;
    res.locals.mobile_number = mobile_number;
    res.locals.data = await service.search(mobile_number);
    next();
  }
  if (req.query.date) {
    const { date } = req.query;
    res.locals.date = date;
    res.locals.data = await service.listOnDate(date);
    next();
  }
  if (!req.query.date && !req.query.mobile_number)
    next({ status: 400, message: `Query ${req.query.date} is invalid` });
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
    res.locals.reservation = data;
    next();
  } else {
    next({ status: 404, message: `Reservation Id ${reservationId} not found` });
  }
}

async function updateReservationStatus(req, res, next) {
  const reservation = res.locals.reservation;
  const newStatus = req.body.data.status;
  const updatedReservation = {
    ...reservation,
    status: newStatus,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  listFromQuery: [
    asyncErrorBoundary(validateQuery),
    listFromQuery,
  ],
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
  update: [
    asyncErrorBoundary(validReservationId),
    checkNewStatus,
    checkReservationStatus,
    asyncErrorBoundary(updateReservationStatus),
  ],
};
