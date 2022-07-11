
function isDatePast(date, time, today) {
  const newDate = new Date(`${date} ${time}`);
  const offset = newDate.getTimezoneOffset()
  const todayDate = new Date(today);
  todayDate.setHours(todayDate.getHours() + (offset / 60));
  const error = { message: "Reservation must be on a future date" };
  if (newDate < todayDate) {
    throw error;
  }
  return false;
}

function isTuesday(date, time) {
  const testDate =  new Date(`${date} ${time}`)
  const error = { message: `Reservation must not be on a Tuesday.` };
  if (testDate.getDay() === 2) {
    throw error;
  }
  return false;
}

function isTimePast(date, time) {
  const reservationTime = Date.parse(date + " " + time);
  const now = Date.now();
  const error = { message: `Reservation must be at a future time` };

  if (reservationTime < now) {
    throw error;
  }
  return false;
}

function isOpenHours(time) {
  const error = {
    message: `Reservations must be between 10:30 AM and 9:30 PM`,
  };
  const reservationTime = time.split(":");
  const open = "10:30:00".split(":");
  const lastReservation = "21:30:00".split(":");

  const openSeconds = parseInt(open[0] * 3600 + open[1] * 60);
  const lastReservationSeconds = parseInt(
    lastReservation[0] * 3600 + lastReservation[1] * 60);
  const reservationTimeSeconds = parseInt(
    reservationTime[0] * 3600 + reservationTime[1] * 60);
  if (
    reservationTimeSeconds < openSeconds ||
    reservationTimeSeconds > lastReservationSeconds
  ) {
    throw error;
  }
  return false;
}

module.exports = {
  isDatePast,
  isTuesday,
  isTimePast,
  isOpenHours
};
