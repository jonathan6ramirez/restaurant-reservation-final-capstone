import "./EditReservation.css";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation } from "../../utils/api";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


//Util functions 
import ErrorAlert from "../ErrorAlert";
import { today } from "../../utils/date-time";
const moment = require("moment")

//readReservation(reservationId, signal)
function EditReservation () {
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState({});

    useEffect(() => {
        const loadReservation = async () => {
            const abortController = new AbortController();
            try {
                const data = await readReservation(reservationId, abortController.signal);
                data.reservation_date = data.reservation_date.slice(0,10);
                setReservation(data);
            } catch (err) {
                console.log("this is the error", err)
            }
        }
        loadReservation();
    }, [])

        // The history object used to move the user to the dashboard after the form is submitted.
        const history = useHistory();

        // Initial form state
        const initialFormState = {
            first_name: "",
            last_name: "",
            mobile_number: "",
            reservation_date: "",
            reservation_time: "",
            people: 0,
        }
        const initialPhoneState = {
            mobile_number1: "",
            mobile_number2: "",
            mobile_number3: "",
        }
    
        // State for the form
        const [form, setForm] = useState({ ...initialFormState });
        const [phoneNumbers, setPhoneNumbers] = useState({ ...initialPhoneState });
        
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

    //Handles the phone number changes
    const handlePhoneChange = ({ target }) => {
        setPhoneNumbers({
            ...phoneNumbers,
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

        console.log(form)

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
        const phoneNumber = Object.values(phoneNumbers).join("-");
        form["mobile_number"] = phoneNumber;
        const data = {...form}
        console.log(data, "this is the full form object before the api call")
        // Make the call to the API
        // await createReservation({ data });
        // Clean up the form state
        // setForm({...initialFormState});
        // history.goBack();
    }

    return (
        <div className="createReservation__main-container">
            <ErrorAlert error={tuesday} />
            <ErrorAlert error={pastTense} />
            <ErrorAlert error={outOfHours} />
            <ErrorAlert error={notEnoughPeople} />
            <h2 className="text-center">Edit Reservation</h2>

            <Form id="CreateReservationForm" onSubmit={ handleSubmit }>
                <Form.Group >
                    <Form.Label>First Name</Form.Label> 
                    <Form.Control 
                        type="text" 
                        name="first_name"
                        onChange={handleChange}
                        value={reservation.first_name}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="last_name" 
                        onChange={handleChange}
                        value={reservation.last_name}
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
                                    onChange={handlePhoneChange}
                                    value={reservation.mobile_number ? reservation.mobile_number.slice(0,3) : ""}
                                    maxlength="3"
                                    required
                                />
                            </Col>
                            <Col className="col-between">-</Col>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    name="mobile_number2" 
                                    onChange={handlePhoneChange}
                                    value={reservation.mobile_number ? reservation.mobile_number.slice(4,7) : null}
                                    maxlength="3"
                                    required
                                />
                            </Col>
                            <Col className="col-between">-</Col>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    name="mobile_number3" 
                                    onChange={handlePhoneChange}
                                    value={reservation.mobile_number ? reservation.mobile_number.slice(8,12) : null}
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
                        value={reservation.reservation_date}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Time Of Reservation</Form.Label>
                    <Form.Control 
                        type="time" 
                        name="reservation_time"
                        onChange={handleChange}
                        value={reservation.reservation_time}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label># of Guests</Form.Label>
                    <Form.Control 
                        type="number"
                        min="1"
                        max="100"
                        name="people"
                        onChange={handleChange}
                        value={reservation.people}
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
    )
}

export default EditReservation;