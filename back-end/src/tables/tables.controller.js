const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function listOpen(req, res){
    const result = await service.listOpen();
    res.json({ data: result });
}

module.exports = {
    list: [asyncErrorBoundary(listOpen)],
}
