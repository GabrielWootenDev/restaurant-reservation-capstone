import { cancelReservation } from "../utils/api";

export async function handleCancellation(reservation_id, history) {
  // calls cancelReservation if confirmation is accepted
  if (
    window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    )
  ) {
    const abortController = new AbortController();

    await cancelReservation(reservation_id, abortController.signal);

    history.go(0);
  }
}
