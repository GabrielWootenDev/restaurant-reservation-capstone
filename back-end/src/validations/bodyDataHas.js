function bodyDataHasFirstName(req, res, next) {
  const { data = {} } = req.body;
  res.locals.data = req.body;
  data["first_name"] && typeof data["first_name"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a first name` });
}

function bodyDataHasLastName(req, res, next) {
  const { data = {} } = res.locals.data;
  data["last_name"] && typeof data["last_name"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a last name` });
}

function bodyDataHasMobile(req, res, next) {
  const { data = {} } = res.locals.data;
  data["mobile_number"] && typeof data["mobile_number"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a mobile number` });
}

function bodyDataHasPeople(req, res, next) {
  const { data = {} } = res.locals.data;
  data["people"] && typeof data["people"] === "string" && data["people"] >= 1
    ? next()
    : next({ status: 400, message: `Reservation must include a  party size` });
}

function bodyDataHasDate(req, res, next) {
  const { data = {} } = res.locals.data;
  data["reservation_date"] && typeof data["reservation_date"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a reservation_date` });
}

function bodyDataHasTime(req, res, next) {
  const { data = {} } = res.locals.data;
  data["reservation_time"] && typeof data["reservation_time"] === "string"
    ? next()
    : next({ status: 400, message: `Reservation must include a reservation_time` });
}

module.exports = {
    bodyDataHasFirstName,
    bodyDataHasLastName,
    bodyDataHasMobile,
    bodyDataHasPeople,
    bodyDataHasDate,
    bodyDataHasTime
}


