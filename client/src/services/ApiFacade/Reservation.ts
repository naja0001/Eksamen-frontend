import { API_URL } from "../../settings";
import { makeOptions, handleHttpErrors } from "../fetchUtils";

const RESERVATIONS_URL = API_URL + "/reservations";

export interface Reservation {
  id: number | null;
  albumId: number;
  customerId: number;
  albumTitle: string;
  customerFirstName: string;
  customerLastName: string;
  reservationDate: string;
  status: string;
}

let reservations: Array<Reservation> = [];

// Fetch all reservations
export async function getReservations(): Promise<Array<Reservation>> {
  if (reservations.length > 0) return [...reservations];
  const res = await fetch(RESERVATIONS_URL).then(handleHttpErrors);
  reservations = [...res];
  return reservations;
}

// Fetch a specific reservation by ID
export async function getReservation(id: number): Promise<Reservation> {
  return fetch(`${RESERVATIONS_URL}/${id}`).then(handleHttpErrors);
}

// Delete a reservation
export async function deleteReservation(id: number): Promise<void> {
  const options = makeOptions("DELETE", null);
  await fetch(`${RESERVATIONS_URL}/${id}`, options).then(handleHttpErrors);
  reservations = reservations.filter((r) => r.id !== id);
}
