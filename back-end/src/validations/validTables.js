const service = require("../tables/tables.service");

function tableNameExists(req, res, next) {
  const tableName = res.locals.newTable.table_name;
  tableName && typeof tableName === "string"
    ? next()
    : next({ status: 400, message: `Table must include a table_name` });
}

function validTableName(req, res, next) {
  const tableName = res.locals.newTable.table_name;
  tableName.length >= 2
    ? next()
    : next({
        status: 400,
        message: `table_name must be atleast 2 characters long`,
      });
}

function validData(req, res, next) {
  const newTable = req.body.data;
  res.locals.newTable = newTable;
  newTable ? next() : next({ status: 400, message: `Must include table data` });
}

function capacityExists(req, res, next) {
  const capacity = res.locals.newTable.capacity;
  capacity && typeof capacity === "number" && capacity >= 1
    ? next()
    : next({ status: 400, message: `Table must include a capacity of 1 or greater` });
}

async function validTableId(req, res, next) {
  const { table_id } = req.params;
  const data = await service.read(table_id);
  res.locals.table = req.body.data;
  res.locals.data = data;
  data
    ? next()
    : next({
        status: 404,
        message: `table_id ${table_id} doesn't exist`,
      });
}

function validCapacity(req, res, next) {
  const { people } = res.locals.table;
  const table = res.locals.data;
  table.capacity >= people
    ? next()
    : next({ status: 400, message: `Table capacity too small` });
}

function isOccupied(req, res, next) {
  res.locals.data.reservation_id === null
    ? next()
    : next({
        status: 400,
        message: `${res.locals.data.table_name} is occupied, please select another table.`,
      });
}

module.exports = {
  validTableName,
  validTableId,
  validCapacity,
  isOccupied,
  validData,
  tableNameExists,
	capacityExists,
};
