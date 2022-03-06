import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CreateReservation.css";

// Util Functions
import { today } from "../../utils/date-time"
import ErrorAlert from "../ErrorAlert"
import { createReservation } from "../../utils/api"

const moment = require("moment");

// This is going to be the main page for the `reservations/new` route
// The create and edit form will be the same component that will display
// the correct paramters based on if there is a reservation parameter/state
// present.
/*
    TODO: Make sure the POST request to the API is working
    TODO:  

 */

function CreateReservation() {
    // The history object used to move the user to the dashboard after the form is submitted.
    const history = useHistory();

    // Initial form state
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number1: "",
        mobile_number2: "",
        mobile_number3: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    // State for the form
    const [form, setForm] = useState({ ...initialFormState });
    
    //*Error holders for all the possible errors that ocurr during validation 
    // This is the state that will check to see if there is an error
    const [tuesday, setTuesday] = useState(null);
    // This is the the error object that holds the past tense error
    const [pastTense, setPastTense] = useState(null);
    // This is the error object that holds the out of hours error
    const [outOfHours, setOutOfHours] = useState(null);
    // This is the error object that holds the people error
    const [notEnoughPeople, setNotEnoughPeople] = useState(null); 

    // Handles the form change
    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value,
        });
    };



    // Handles when the user clicks the submit button
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Clean the errors if there are any
        setTuesday(null);
        setPastTense(null);
        setOutOfHours(null);
        setNotEnoughPeople(null);

        // Initialize the variables to make the validations
        const currentDay = today();
        const currentTime = moment().format('HH:mm');
        const givenDate = new Date(form.reservation_date + " " + form.reservation_time);
        const day = givenDate.getDay();

        // Date objects for the closing time and opening time
        const openingTime = new Date(form.reservation_date + " " + "10:30");
        const closingTime = new Date(form.reservation_date + " " + "21:30");

        //*Validations
        if (day === 2){
            setTuesday({message: "!! CANNOT MAKE RSVPS ON TUESDAYS !!"});
        } 
        if (currentDay === form.reservation_date) {
            if(currentTime > form.reservation_time){
                setPastTense({message: "!! RSVP TIME CANNOT BE BEFORE THE CURRENT TIME !!"});
            }
        }
        if (currentDay > form.reservation_date){
            setPastTense({message: "!! CANNOT MAKE AN RSVP IN THE PAST !!"});
        }
        if(closingTime.getHours() === givenDate.getHours()){
            if(closingTime.getMinutes() < givenDate.getMinutes()){
                setOutOfHours({ message: "!! CANNOT MAKE THE RESERVATION LESS THAN 1HR BEFORE WE CLOSE !!"});
            }
        }
        if(openingTime.getHours() === givenDate.getHours() ){
            if( openingTime.getMinutes() > givenDate.getMinutes()){
                setOutOfHours({ message: "!! CANNOT MAKE THE RESERVATION BEFORE WE OPEN !!"});
            }
        }
        if (openingTime.getHours() > givenDate.getHours()){
            setOutOfHours({ message: "!! CANNOT MAKE THE RESERVATION BEFORE WE OPEN !!"})
        }
        if (closingTime.getHours() < givenDate.getHours()){
            setOutOfHours({ message: "!! CANNOT MAKE THE RESERVATION AFTER WE CLOSE!!"});
        }
        if (form.people < 1){
            setNotEnoughPeople({message: "!! CANNOT MAKE A RESERVATION WITHOUT AT LEAST 1 PERSON !!"})
        }

        // Check the document to see if any errors were thrown
        let errors = await document.getElementsByClassName("alert alert-danger m-2")
        
        if(errors.length > 0){
            
            return
        }
        form["people"] = Number(form["people"])
        const data = {...form}
        // Make the call to the API
        await createReservation({ data });
        // Clean up the form state
        setForm({...initialFormState});
        history.push("/dashboard");
    }

    return (
        <div className="createReservation__main-container">
            <ErrorAlert error={tuesday} />
            <ErrorAlert error={pastTense} />
            <ErrorAlert error={outOfHours} />
            <ErrorAlert error={notEnoughPeople} />
            <h2 className="text-center">Create A Reservation</h2>

            <Form id="CreateReservationForm" onSubmit={ handleSubmit }>
                <Form.Group >
                    <Form.Label>First Name</Form.Label> 
                    <Form.Control 
                        type="text" 
                        name="first_name"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="last_name" 
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Container className="container">
                        <Row>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    name="mobile_number1"
                                    id="numberField"
                                    onChange={handleChange}
                                    placeholder="###"
                                    maxlength="3"
                                    required
                                />
                            </Col>
                            <Col className="col-between">-</Col>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    name="mobile_number2" 
                                    onChange={handleChange}
                                    placeholder="###"
                                    maxlength="3"
                                    required
                                />
                            </Col>
                            <Col className="col-between">-</Col>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    name="mobile_number3" 
                                    onChange={handleChange}
                                    placeholder="####"
                                    maxlength="4"
                                    required
                                />
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date Of Reservation</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="reservation_date" 
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Time Of Reservation</Form.Label>
                    <Form.Control 
                        type="time" 
                        name="reservation_time"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label># of Guests</Form.Label>
                    <Form.Control 
                        type="number"
                        min="1"
                        max="20"
                        name="people"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                
            <div className="mt-2">
                <Button 
                    variant="secondary" 
                    className="me-2"
                    onClick={() => history.goBack()}
                    >Cancel</Button>

                <Button
                    type="submit"
                    variant="primary"
                    >Submit</Button>
            </div>
            </Form>

        </div>
    );
};

export default CreateReservation