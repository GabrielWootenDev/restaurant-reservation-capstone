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
const {isOpen, isPast} = require("../validations/validDay")

//refactor all code for single responsiblity and validation as a later time

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listOnDate(req, res) {
  const { date } = req.query;
  const data = await service.listOnDate(date);
  res.json({ data });
}

async function create(req, res) {
  const reservation = req.body.data;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  listOnDate: [asyncErrorBoundary(listOnDate)],
  create: [
    bodyDataHasFirstName,
    bodyDataHasLastName,
    bodyDataHasMobile,
    bodyDataHasPeople,
    bodyDataHasDate,
    bodyDataHasTime,
    isOpen,
    isPast,
    asyncErrorBoundary(create),
  ],
};
