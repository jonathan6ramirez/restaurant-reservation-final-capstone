import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

// This is going to be the main page for the `reservations/new` route
// The create and edit form will be the same component that will display
// the correct paramters based on if there is a reservation parameter/state
// present.


function CreateReservation() {
    // The history object
    const history = useHistory();

    //State for the object to submit
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    const [form, setForm] = useState({ ...initialFormState});

    // Handles the form change
    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value,
        });
    };

    // Handles when the user clicks the submit button
    const handleSubmit = (event) => {
        event.preventDefault();
        setForm({...initialFormState})
        history.push("/dashboard")
    }

    return (
        <React.Fragment>
            <h2 className="text-center">Create A Reservation</h2>
            <Form id="CreateReservationForm" >
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="first_name"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="last_name" 
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="mobile_number" 
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date Of Reservation</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="reservation_date" 
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Time Of Reservation</Form.Label>
                    <Form.Control 
                        type="time" 
                        name="reservation_time"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label># of Guests</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="people"
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>
            <div className="mt-2">
                <Button 
                    variant="secondary" 
                    className="me-2"
                    onClick={() => history.goBack()}
                    >Cancel</Button>

                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    >Submit</Button>
            </div>
        </React.Fragment>
    )
}

export default CreateReservation