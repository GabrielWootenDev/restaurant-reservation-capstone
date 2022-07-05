function isOpen(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationDay = new Date(data["reservation_date"]);
  reservationDay.getDay() !== 1
    ? next()
    : next({ status: 400, message: `Reservation must not be on a Tuesday.` });
}

function isPastDay(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationDay = new Date(data["reservation_date"]);
  const now = Date.now();
  const today = new Date(now);
  today.setHours(00, 00, 01);
  reservationDay >= today
    ? next()
    : next({ status: 400, message: `Reservation must be on a future date.` });
}

function isPastTime(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationTime = Date.parse(
    data["reservation_date"] + " " + data["reservation_time"]
  );
  const now = Date.now();
  console.log(Date(now))
  reservationTime >= now
    ? next()
    : next({ status: 400, message: `Reservation must be on a future time.` });
}

function isOpenTime(req, res, next) {
  const { data = {} } = res.locals.data;
  const time = data["reservation_time"];
  const reservationTime = time.split(":");
  const open = "10:30:00".split(":");
  const lastReservation = "21:30:00".split(":");

  const openSeconds = parseInt(open[0] * 3600 + open[1] * 60 + open[0]);
  const lastReservationSeconds = parseInt(
    lastReservation[0] * 3600 + lastReservation[1] * 60 + lastReservation[0]
  );
  const reservationTimeSeconds = parseInt(
    reservationTime[0] * 3600 + reservationTime[1] * 60 + reservationTime[0]
  );
  reservationTimeSeconds > openSeconds &&
  reservationTimeSeconds < lastReservationSeconds
    ? next()
    : next({
        status: 400,
        message: `Reservation must be betweem 10:30 AM and 9:30 PM.`,
      });
}

module.exports = {
  isOpen,
  isPastDay,
  isPastTime,
  isOpenTime,
};
