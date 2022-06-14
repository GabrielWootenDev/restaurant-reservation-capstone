function isDatePast(date, today) {
    const newDate = new Date(date);
    const todayDate = new Date(today);
    const error = {message: "Reservation must be on a future date"}

    if (newDate < todayDate) {
        throw error;
    }
    return false;
}

function isTuesday(date) {
    const newDate = new Date(date);
    const error = {message: `Reservation must not be on a Tuesday.`}
    
    if (newDate.getDay() === 1) {
        throw error;
    }
    return false;
}

module.exports = {
    isDatePast,
    isTuesday,
}