function checkOpen(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationDay = new Date(data["reservation_date"]);
  reservationDay.getDay() !== 1
    ? next()
    : next({ status: 400, message: `Restaurant is closed on Tuesday.` });
}

function checkFutureDate(req, res, next) {
  const today = new Date();
  const { reservation_date, reservation_time } = req.body.data;
  const testDate = new Date(`${reservation_date} ${reservation_time}`);
  if (today.getTime() < testDate.getTime()) {
    return next();
  }
  next({ status: 400, message: `Reservation must be in the future` });
}

function checkPastTime(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationTime = Date.parse(
    data["reservation_date"] + " " + data["reservation_time"]
  );
  const now = Date.now();
  reservationTime >= now
    ? next()
    : next({ status: 400, message: `Reservation must be on a future time.` });
}

function checkOpenTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const testTime = reservation_time;
  const openTime = "10:30";
  const closeTime = "21:30";
  if (testTime >= openTime && testTime <= closeTime) {
    return next();
  }
  next({
    status: 400,
    message: `Reservation must be between 10:30 AM and 9:30 PM`,
  });
}

function checkReservationStatus(req, res, next) {
  const status = res.locals.reservation.status;
  status === "finished" || (status !== "booked" && status !== "seated")
    ? next({ status: 400, message: `Reservation is ${status}` })
    : next();
}

function checkNewStatus(req, res, next) {
  const status = req.body.data.status;
  status === "booked" || status === "seated" || status === "finished"
    ? next()
    : next({
        status: 400,
        message: `reservation status "${status}" is unknown`,
      });
}

function checkValidStatus(req, res, next) {
  const { status } = req.body.data;
  status === "booked" || !status
    ? next()
    : next({ status: 400, message: `Status must be "booked", not ${status}` });
}



module.exports = {
  checkOpen,
  checkFutureDate,
  checkPastTime,
  checkOpenTime,
  checkReservationStatus,
  checkValidStatus,
  checkNewStatus,
};
