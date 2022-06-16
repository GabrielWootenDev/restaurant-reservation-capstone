import { today, previous, next } from "../utils/date-time";

function DashboardNav({ date, setDate }) {
  return (
    <div className="d-flex">
      <div className="d-sm-flex col mb-3">
        <div className="col p-0">
          <h4 className="d-flex-fill mb-0 p-2 justify-content-sm-center-lg-left ">
            Reservations for {date}
          </h4>
        </div>
        <div className="d-flex-fill p-0 justify-content-end">
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={() => setDate(previous(date))}
          >
            Previous Day
          </button>
          <button
            type="button"
            className="btn btn-dark mx-2"
            onClick={() => setDate(next(date))}
          >
            Next Day
          </button>
          <button
            type="button"
            className="btn btn-info mx-2"
            onClick={() => setDate(today())}
          >
            Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
