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
  console.log(Date(now));
  reservationTime >= now
    ? next()
    : next({ status: 400, message: `Reservation must be on a future time.` });
}

/* function checkOpenTime(req, res, next) {
  const { data = {} } = res.locals.data;
  const time = data["reservation_time"];
  const reservationTime = time.split(":");
  const open = "10:30:00".split(":");
  const lastReservation = "21:30:00".split(":");

  const openSeconds = parseInt(open[0] * 3600 + open[1] * 60);
  const lastReservationSeconds = parseInt(
    lastReservation[0] * 3600 + lastReservation[1] * 60);
  const reservationTimeSeconds = parseInt(
    reservationTime[0] * 3600 + reservationTime[1] * 60);
  reservationTimeSeconds > openSeconds &&
  reservationTimeSeconds < lastReservationSeconds
    ? next()
    : next({
        status: 400,
        message: `Reservation must be between 10:30 AM and 9:30 PM.`,
      });
}
*/

function checkOpenTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const testTime = reservation_time;
  const openTime = "10:30";
  const closeTime = "21:30";
  if (testTime >= openTime && testTime <= closeTime) {
    return next();
  }
  next({ status: 400, message: `Reservation must be between 10:30 AM and 9:30 PM` });
}

module.exports = {
  checkOpen,
  checkFutureDate,
  checkPastTime,
  checkOpenTime,
};
