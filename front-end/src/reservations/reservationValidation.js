function isDatePast(date, time, today) {
  const newDate = new Date(`${date} ${time}`);
  //offset is the difference of your current timezone and UTC
  const offset = newDate.getTimezoneOffset();
  const todayDate = new Date(today);
  //setHours changes todays date into local time
  todayDate.setHours(todayDate.getHours() + offset / 60);
  const error = { message: "Reservation must be on a future date" };
  if (newDate < todayDate) {
    throw error;
  }
  return false;
}

function isTuesday(date, time) {
  const testDate = new Date(`${date} ${time}`);
  //offset is the difference of your current timezone and UTC
  const offset = testDate.getTimezoneOffset();
  //setHours changes the testDate into local time
  testDate.setHours(testDate.getHours() + offset / 60);
  const error = { message: `Reservation must not be on a Tuesday.` };
  if (testDate.getDay() === 2) {
    throw error;
  }
  return false;
}

function isTimePast(date, time) {
  const reservationTime = new Date(`${date} ${time}`);
  //offset is the difference of your current timezone and UTC
  const offset = reservationTime.getTimezoneOffset();
  //setHours changes the reservation time into local time
  reservationTime.setHours(reservationTime.getHours() + offset / 60);
  const now = Date.now();
  const error = { message: `Reservation must be at a future time` };

  if (Date.parse(reservationTime) < now) {
    throw error;
  }
  return false;
}

function isOpenHours(time) {
  const error = {
    message: `Reservations must be between 10:30 AM and 9:30 PM`,
  };
  const reservationTime = time;
  //open and last reservation are the restaurant hours
  const open = "10:30";
  const lastReservation = "21:30";

  if (reservationTime <= open || reservationTime >= lastReservation) {
    throw error;
  }
  return false;
}

module.exports = {
  isDatePast,
  isTuesday,
  isTimePast,
  isOpenHours,
};
