import "./SearchPage.css"
import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { searchReservationsByPhone } from "../../utils/api";

function SearchPage() {

    // This is the initial search state
    const initialFormState = {
        mobile_number: "",
    };
    // This is the state of the form
    const [form, setForm] = useState({ ...initialFormState });
    // This handles when the form changes and any input is detected
    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value,
        });
    };

    // This is the state for the reservations and to show them
    const [empty, setEmpty] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clickedSearch, setClickedSearch] = useState(false);
    const [err, setErr] = useState("");

    const handleSubmit = async (event) => {
        if(form.mobile_number == "") return setErr("")
        event.preventDefault();
        setEmpty(false)
        try {
            setLoading(true);
            const reservations = await searchReservationsByPhone(form.mobile_number);
            if(reservations.length == 0){
                console.log("empty")
                setReservations([]);
                return setEmpty(true)
            }
            setReservations(reservations);
        } catch (err) {
            console.log("!!!", err, "!!!")
        } finally {
            setLoading(false)
        }
    }

    const mapOutReservations = (reservation, index) => {
        const reservation_id = reservation.reservation_id
        return (
            <div key={index} className="search__card" >
                <Card>
                <Card.Header as="h5">Reservation for : {reservation.first_name} {reservation.last_name}</Card.Header>
                <Card.Body>
                    <Card.Title>Reservation Time: {reservation.reservation_time}</Card.Title>
                    <Card.Text>
                    People: {reservation.people}
                    </Card.Text>
                    {reservation.status == "booked" &&
                        <Button variant="danger">Cancel</Button>
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

    return (
        <div className="search__main-container">
            <h3 className="search__main-title">Search: </h3>
            <Form>
                <Form.Group className="search__input-container">
                    <Form.Label>Phone #: </Form.Label>
                    <Form.Control 
                        className="search__input-field"
                        name="mobile_number"
                        placeholder="Enter a customer's phone number"
                        type="text"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    >Find</Button>
            </Form>
            {loading && <span>Searching...</span>}
            {reservations.map(mapOutReservations)}
            {empty && <span>No reservations found</span>}
        </div>
    )
};

export default SearchPage;