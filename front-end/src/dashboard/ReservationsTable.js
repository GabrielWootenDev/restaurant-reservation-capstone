function ReservationsTable({ reservations }) {
  return (
    <div>
      <table className="table table-dark table-hover word-break table-responsive-lg">
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle">
              Time of Reservation
            </th>
            <th scope="col" className="text-center align-middle">
              First Name
            </th>
            <th scope="col" className="text-center align-middle">
              Last Name
            </th>
            <th scope="col" className="text-center align-middle">
              Mobile Number
            </th>
            <th scope="col" className="text-center align-middle">
              Party Size
            </th>
            <th scope="col" className="text-center align-middle">
              Date of Reservation
            </th>
            <th scope="col" className="text-center align-middle">
              Seat at Table?
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td className="text-center align-middle">
                <div>{reservation.reservation_time}</div>
              </td>
              <td className="text-center align-middle">
                <div>{reservation.first_name}</div>
              </td>
              <td className="text-center align-middle">
                <div>{reservation.last_name}</div>
              </td>
              <td className="text-center align-middle">
                <div>{reservation.mobile_number}</div>
              </td>
              <td className="text-center align-middle">
                <div>{reservation.people}</div>
              </td>
              <td className="text-center align-middle">
                <div>{reservation.reservation_date}</div>
              </td>
              <td className="text-center align-middle">
                <div>
                  <a
                    class="btn btn-danger"
                    href={`/reservations/${reservation.reservation_id}/seat`}
                    role="button"
                  >
                    Seat
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationsTable;
