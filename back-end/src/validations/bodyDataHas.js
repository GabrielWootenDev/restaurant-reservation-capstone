function bodyDataHasFirstName(req, res, next) {
  const { data = {} } = req.body;
  res.locals.data = req.body;
  data["first_name"] && typeof data["first_name"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a first_name` });
}

function bodyDataHasLastName(req, res, next) {
  const { data = {} } = res.locals.data;
  data["last_name"] && typeof data["last_name"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a last_name` });
}

function bodyDataHasMobile(req, res, next) {
  const { data = {} } = res.locals.data;
  data["mobile_number"] && typeof data["mobile_number"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a mobile_number` });
}

function bodyDataHasPeople(req, res, next) {
  const { data = {} } = res.locals.data;
  data["people"] && typeof data["people"] !== "string" && data["people"] >= 1
    ? next()
    : next({ status: 400, message: `Reservation must include a number of people` });
}

function bodyDataHasDate(req, res, next) {
  const { data = {} } = res.locals.data;
  (new Date(data["reservation_date"]) !== "Invalid Date") && !isNaN(new Date( data["reservation_date"]))
    ? next()
    : next({ status: 400, message: `Reservation must include a valid reservation_date` });
}

function bodyDataHasTime(req, res, next) {
  const { data = {} } = res.locals.data;
  const validTime = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
  validTime.test(data["reservation_time"])
    ? next()
    : next({ status: 400, message: `Reservation must include a valid  reservation_time` });
}

module.exports = {
    bodyDataHasFirstName,
    bodyDataHasLastName,
    bodyDataHasMobile,
    bodyDataHasPeople,
    bodyDataHasDate,
    bodyDataHasTime
}


