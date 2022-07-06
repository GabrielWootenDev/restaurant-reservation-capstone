const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

module.exports = {
  list: [asyncErrorBoundary(listOpen), asyncErrorBoundary(list)],
};
