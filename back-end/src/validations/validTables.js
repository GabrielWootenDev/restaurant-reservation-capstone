function validTableName(req, res, next) {
  const newTable = req.body.data;
  const tableName = newTable.table_name;
  res.locals.newTable = newTable;
  tableName.length >= 2
    ? next()
    : next({
        status: 400,
        message: `Table Name must be atleast 2 characters long`,
      });
}


module.exports = {
    validTableName,
}