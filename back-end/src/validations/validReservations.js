function checkOpen(req, res, next) {
  const { data = {} } = res.locals.data;
  const reservationDay = new Date(`${data["reservation_date"]} ${data["reservation_time"]}`);
  //offset is the difference of your current timezone and UTC
  const offset = reservationDay.getTimezoneOffset()
  //setHours changes your reservation into local time
  reservationDay.setHours(reservationDay.getHours() + (offset / 60));
  // in getDay() 2 === tuesday 
  reservationDay.getDay() !== 2
    ? next()
    : next({ status: 400, message: `Restaurant is closed on Tuesday.` });
}

function checkFutureDate(req, res, next) {
  const today = new Date();
  const { reservation_date, reservation_time } = req.body.data;
  //combine the reservation date and time to test the date.
  const testDate = new Date(`${reservation_date} ${reservation_time}`);
  if (today.getTime() < testDate.getTime()) {
    return next();
  }
  next({ status: 400, message: `Reservation must be on a future date` });
}

function checkPastTime(req, res, next) {
  //checkPastTime could be written like checkFutureDate
  const { data = {} } = res.locals.data;
  const reservationTime = Date.parse(
    data["reservation_date"] + " " + data["reservation_time"]
  );
  //Date.now() gets the current date/time
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
  //if the status is finished or an anything other than finished, booked, or seated returns an error message
  status === "finished" || (status !== "booked" && status !== "seated")
    ? next({ status: 400, message: `Reservation is ${status}` })
    : next();
}

function checkNewStatus(req, res, next) {
  const status = req.body.data.status;
  //if the new status is anything but booked, seated, finished, or cancelled returns an error message for unknown status
  status === "booked" || status === "seated" || status === "finished" || status === "cancelled"
    ? next()
    : next({
        status: 400,
        message: `reservation status "${status}" is unknown`,
      });
}

function checkValidStatus(req, res, next) {
  const { status } = req.body.data;
  //checks for a booked status or no status from request body (to check for unknown status after)
  status === "booked" || !status
    ? next()
    : next({ status: 400, message: `Status must be "booked", not ${status}` });
}

function checkBooked(req, res, next) {
  const { status } = res.locals.data;
  //checks for a booked status or no status from local data(to check for unknown status after)
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
  checkBooked,
};
