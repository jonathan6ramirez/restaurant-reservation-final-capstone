import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  let tables = [
    {
      table_name: "Bar #1",
      capacity: 1,
      is_occupied: null,
    },
    {
      table_name: "Bar #2",
      capacity: 1,
      is_occupied: null,
    },
    {
      table_name: "#1",
      capacity: 6,
      is_occupied: null,
    },
    {
      table_name: "#2",
      capacity: 6,
      is_occupied: null,
    }
  ]


  // * Mapper functions
  const mapOutReservations = (reservation, index) => {
    return (
      <div key={index} className="row justify-content-center" >
        <Card>
          <Card.Header as="h5">Reservation for : {reservation.first_name} {reservation.last_name}</Card.Header>
          <Card.Body>
            <Card.Title>Reservation Time: {reservation.reservation_time}</Card.Title>
            <Card.Text>
              People: {reservation.people}
            </Card.Text>
            <Button variant="primary" href={`reservations/${reservation.reservation_id}/seat`} >Seat</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }

  const mapOutTables = (table, index) => {
    const occupied = table.is_occupied ? "Occupied": "Free"
    return (
      <div key={index} className="row" >
        <Card>
          <Card.Header as="h5">Table: {table.table_name}</Card.Header>
          <Card.Body>
            <Card.Title>Capacity: {table.capacity}</Card.Title>
            <Card.Text data-table-id-status={table.table_id} >Is Occupied: {occupied}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.map(mapOutReservations)}

      <div className="d-md-flex mt-4 mb-3">
        <h4 className="mb-0">Tables Available: </h4>
      </div>
      {tables.map(mapOutTables)}
    </main>
  );
}

export default Dashboard;
