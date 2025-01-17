import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import DashboardModal from "./DashboardModal";

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
  const [selectedTable, setSelectedTable] = useState({});
  const [selectedReservation, setSelectedReservation] = useState({});

  const [show, setShow] = useState(false);
  
  const handleShow = (table) => {
    setSelectedTable(table);
    setShow(true);
  }

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setShow(true);
  }

  useEffect(loadDashboard, [date]);

  //TODO make the api call to cancel the reservation using PUT to 
  //TODO `/reservations/:reservation_id/status` w/a body `{data: { status: "cancelled" } }`

  // * Mapper functions
  const mapOutReservations = (reservation, index) => {
    const reservation_id = reservation.reservation_id
    return (
      <div key={index} className="dashboard__card" >
        <Card>
          <Card.Header as="h5">Reservation for : {reservation.first_name} {reservation.last_name}</Card.Header>
          <Card.Body>
            <Card.Title>Reservation Time: {reservation.reservation_time}</Card.Title>
            <Card.Text>
              People: {reservation.people}
            </Card.Text>
            {reservation.status == "booked" &&
              <Button 
                variant="danger" 
                onClick={() => handleCancelClick(reservation)}
                data-reservation-id-cancel={reservation.reservation_id}
              >Cancel</Button>
            }
            {reservation.status == "booked" &&
              <Link to={`/reservations/${reservation_id}/edit`}>
                <Button variant="warning" className="search__edit-btn">Edit</Button>
              </Link>
            }
            {reservation.status == "booked" &&
              <Link to={`reservations/${reservation.reservation_id}/seat`}>
                <Button variant="primary" >Seat</Button>
              </Link>
            }
          </Card.Body>
        </Card>
      </div>
    )
  }

  const mapOutTables = (table, index) => {
    const occupied = table.reservation_id ? "Occupied": "Free"
    return (
      <div key={index} className="dashboard__card" >
        <Card>
          <Card.Header as="h5">Table: {table.table_name}</Card.Header>
          <Card.Body>
            <Card.Title>Capacity: {table.capacity}</Card.Title>
            <Card.Text data-table-id-status={table.table_id} >Status: {occupied}</Card.Text>
            {table.reservation_id && 
              <div>
                <Button 
                  variant="primary" 
                  onClick={() => handleShow(table)}
                  data-table-id-finish={table.table_id}
                >Finish</Button>
              </div>
            }
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
      {reservations.length > 0 ? reservations.map(mapOutReservations) : null}

      <div className="d-md-flex mt-4 mb-3">
        <h4 className="mb-0">Tables Available: </h4>
      </div>
      {tables.map(mapOutTables)}

      <DashboardModal date={date} show={show} setShow={setShow} selectedTable={selectedTable} setTables={setTables} selectedReservation={selectedReservation} setReservations={setReservations} />
    </main>
  );
}

export default Dashboard;
