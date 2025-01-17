/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * *Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 * *a promise that resolves to a possibly empty array of reservations saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}
/*
* Retrieves all existing tables
* @returns {Promise<[tables]>}
* a promise that resolves to a possibly empty array of tables saved in the database.
*/
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url)
}

/*
* @param reservation
* the reservation object to be created
* @signal
* optional AbortController.signal
*/
export async function createReservation(reservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(reservation),
    signal,
  };
  return await fetchJson(url, options, {});
}

/*
* @param table
* the table object to be created
* @signal
* optional AbortController.signal
*/
export async function createTable(table, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(table),
    signal,
  };
  return await fetchJson(url, options, {});
}

/*
 * 
 * returns the reservation matching the reservationId
 * @param reservationId
 *  
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<any>}
 *  a promise that resolves to the saved deck.
 */
export async function readReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  const options = {
    method: "GET",
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
}


/*
 * 
 * assigns a reservations to a tables
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<any>}
 * 
 */
export async function seatReservation({reservationId, tableId}, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const data = {reservationId};
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data}),
    signal,
  }
  return await fetchJson(url, options, {});
}

export async function emptyTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method: "DELETE",
    headers,
    signal,
  }
  return await fetchJson(url, options, {});
}

export async function searchReservationsByPhone(phone, signal) {
  const url = `${API_BASE_URL}/reservations?mobile_number=${phone}`;
  const options = {
    method: "GET",
    headers,
    signal,
  }
  return await fetchJson(url, options, {});
}

export async function updateReservationStatus ({status, reservationId}, signal) {
  const url = `/reservations/${reservationId}/status`
  const data = { status };
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
    signal,
  }
  return await fetchJson(url, options, {})
}

export async function updateReservation ({updatedReservation, reservationId}, signal) {
  const url = `/reservations/${reservationId}`
  const data = { updatedReservation };
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
    signal,
  }
  return await fetchJson(url, options, {})
}