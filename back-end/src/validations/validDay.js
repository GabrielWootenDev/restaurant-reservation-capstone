function isOpen(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationDay = new Date(data["reservation_date"]);
  reservationDay.getDay() !== 1
    ? next()
    : next({ status: 400, message: `Reservation must not be on a Tuesday.` });
}

function isPast(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationDay = new Date(data["reservation_date"]);
  reservationDay < new Date()
    ? next()
    : next({ status: 400, message: `Reservation must be on a future date.` });
}

module.exports = {
  isOpen,
  isPast
};
