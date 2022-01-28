import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

// Util Functions
import { today } from "../../utils/date-time"
import ErrorAlert from "../ErrorAlert"
const moment = require("moment");

// This is going to be the main page for the `reservations/new` route
// The create and edit form will be the same component that will display
// the correct paramters based on if there is a reservation parameter/state
// present.


function CreateReservation() {
    // The history object used to move the user to the dashboard after the form is submitted.
    const history = useHistory();

    // Initial form state
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }

    // State for the form
    const [form, setForm] = useState({ ...initialFormState });
    
    // This is the state that will check to see if there is an error
    // The submitHandler will verify the form and set this state 
    // to the error according to the user story guidlines.
    const [err, setErr] = useState(null);

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
        const currentDay = today();
        const currentTime = moment().format('HH:mm');
        const givenDate = new Date(form.reservation_date + " " + form.reservation_time);
        const day = givenDate.getDay();
        event.preventDefault();
        if (day === 2){
            console.log("!! CANNOT MAKE RSVPS ON TUESDAYS !!");
            return setErr(true);
        } else if (currentDay === form.reservation_date) {
            if(currentTime > form.reservation_time){
                console.log("!! RSVP TIME CANNOT BE BEFORE THE CURRENT TIME !!")
                return setErr(true)
            }
        }else if (currentDay > form.reservation_date){
            console.log("!! CANNOT MAKE AN RSVP IN THE PAST !!")
            return setErr(true);
        }
        // Clean up the form state
        setForm({...initialFormState})
        /*!!!! Dont forget to uncomment the push to the history object !!!! */
        //history.push("/dashboard")
    }

    return (
        <React.Fragment>
            <ErrorAlert error={err} />
            <h2 className="text-center">Create A Reservation</h2>
            <Form id="CreateReservationForm" >
                <Form.Group>
                    <Form.Label>First Name</Form.Label> 
                    <Form.Control 
                        type="text" 
                        name="first_name"
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="last_name" 
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="mobile_number" 
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date Of Reservation</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="reservation_date" 
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Time Of Reservation</Form.Label>
                    <Form.Control 
                        type="time" 
                        name="reservation_time"
                        onChange={handleChange}
                        required={true}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label># of Guests</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="people"
                        onChange={handleChange}
                        required={true}
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