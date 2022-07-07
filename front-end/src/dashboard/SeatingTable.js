function SeatingTable({ tables }) {

  return (
    <>
      <div className="col-md-4">
        <h4 className="d-flex justify-content-center">Seating</h4>

        <table className="table table-dark table-hover word-break">
          <thead>
            <tr>
              <th scope="col" className="text-center align-middle">
                Table
              </th>
              <th scope="col" className="text-center align-middle">
                Table Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) =>
              table.reservation_id !== null ? (
                <tr key={table.table_id}>
                  <td className="text-center align-middle">
                    {table.table_name}
                  </td>
                  <td
                    data-table-id-status={`${table.table_id}`}
                    className="text-center align-middle text-danger"
                  >
                    Occupied
                  </td>
                </tr>
              ) : (
                <tr key={table.table_id}>
                  <td className="text-center align-middle">
                    {table.table_name}
                  </td>
                  <td
                    data-table-id-status={`${table.table_id}`}
                    className="text-center align-middle text-success"
                  >
                    Free
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SeatingTable;
