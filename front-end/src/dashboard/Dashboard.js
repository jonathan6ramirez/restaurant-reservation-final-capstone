import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"

import "./Dashboard.css"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTableError] = useState(null);

  useEffect(loadDashboard, [date]);

  let tempReservations = [
    {
      reservation_id: 1,
      first_name: "jonathan",
      last_name: "ramirez",
      reservation_time: "13:00",
      reservation_date: "2022-02-08",
      people: 2
    },
    {
      reservation_id: 2,
      first_name: "jonathan",
      last_name: "ramirez",
      reservation_time: "14:00",
      reservation_date: "2022-02-08",
      people: 4
    },
    {
      reservation_id: 3,
      first_name: "jonathan",
      last_name: "ramirez",
      reservation_time: "15:00",
      reservation_date: "2022-02-08",
      people: 2
    },
    {
      reservation_id: 4,
      first_name: "jonathan",
      last_name: "ramirez",
      reservation_time: "16:00",
      reservation_date: "2022-02-08",
      people: 2
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
            <Link to={`reservations/${reservation.reservation_id}/seat`}>
              <Button variant="primary" >Seat</Button>
            </Link>
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
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTableError);

    return () => abortController.abort();
  }

  return (
    <main className="dashboard__main-container">
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      {tempReservations.map(mapOutReservations)}

      <div className="d-md-flex mt-4 mb-3">
        <h4 className="mb-0">Tables Available: </h4>
      </div>
      {tables.map(mapOutTables)}
    </main>
  );
}

export default Dashboard;
