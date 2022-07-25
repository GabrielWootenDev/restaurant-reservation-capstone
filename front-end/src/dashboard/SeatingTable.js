function SeatingTable({ tables, finishTable }) {

  return (
    <>
      <div className="card col-sm-6 mx-auto border-0">
        <h4 className="card-title text-center">Seating</h4>

        <table className="table table-dark table-hover word-break">
          <thead>
            <tr>
              <th scope="col" className="text-center align-middle">
                Table
              </th>
              <th scope="col" className="text-center align-middle">
                Table Status
              </th>
              <th scope="col" className="text-center align-middle">
                Finish Table?
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
                  <td className="text-center align-middle">
                    <button className="btn btn-primary" data-table-id-finish={table.table_id} onClick={() => finishTable(table.table_id)} >
                      Finish
                    </button>
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
                    Open
                  </td>
                  <td className="text-center align-middle">
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
