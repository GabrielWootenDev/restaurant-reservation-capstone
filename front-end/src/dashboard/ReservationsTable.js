import React from "react";

function ReservationsTable({ reservations, handleCancellation, history }) {
  return (
    <>
      <div className="card col-sm-12 mx-auto border-0">
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
                Seat at Table?
              </th>
              <th scope="col" className="text-center align-middle">
                Change?
              </th>
              <th scope="col" className="text-center align-middle">
                Status
              </th>
              <th scope="col" className="text-center align-middle">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              const reservation_id = reservation.reservation_id;
              return (
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
                    {reservation.status === "booked" ? (
                      <a
                        className="btn btn-primary"
                        href={`/reservations/${reservation_id}/seat`}
                      >
                        Seat
                      </a>
                    ) : null}
                  </td>
                  <td className="text-center align-middle">
                  {reservation.status === "booked" ? (
                    <a
                      className="btn btn-warning"
                      href={`/reservations/${reservation_id}/edit`}
                    >
                      Edit
                    </a> ) : null}
                  </td>
                  <td
                    className="text-center align-middle"
                    data-reservation-id-status={reservation_id}
                  >
                    {reservation.status}
                  </td>
                  <td className="text-center align-middle">
                    {reservation.status && (
                      <button
                        className="btn btn-danger"
                        data-reservation-id-cancel={reservation.reservation_id}
                        onClick={() => handleCancellation(reservation_id, history)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReservationsTable;
