function ReservationsTable({reservations}) {
  return (
    <div>
      <table className="table table-dark table-hover word-break table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">Time of Reservation</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Party Size</th>
            <th scope="col">Date of Reservation</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <th>{reservation.reservation_time}</th>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.people}</td>
              <td>{reservation.reservation_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationsTable;