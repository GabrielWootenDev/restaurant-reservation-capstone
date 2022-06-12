const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listOnDate(req, res) {
  const { date } = req.query;
  const data = await service.listOnDate(date);
  res.json({ data });
}

//add a create controller

module.exports = {
  list: [asyncErrorBoundary(list)],
  listOnDate: [asyncErrorBoundary(listOnDate)],
};
