import { today, previous, next } from "../utils/date-time";

function DashboardNav({ date, history}) {
  return (
    <div className="d-flex">
      <div className="d-sm-flex col mb-3">
        <div className="col p-0">
          <h4 className="mb-0 p-2 text-sm-left text-center">
            Reservations for {date}
          </h4>
        </div>
        <div className="btn-group d-flex p-0 justify-content-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {history.push(`/dashboard?date=${previous(date)}`)}}
          >
            Previous Day
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => {history.push(`/dashboard?date=${today()}`)}}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {history.push(`/dashboard?date=${next(date)}`)}}
          >
            Next Day
          </button>

        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
