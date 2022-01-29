import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    const [empty, setEmpty] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loaded, setLoaded] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Set the searched state to true so the reservations will show
        clickedSearch(true);
        // check to see if the phone number is in the correct format
        // make the call to the api for the reservations
        // check to see if the call is empty
            // if it is empty set the empty state to `message: No reservations found`
        // set the state of the reservations to the call if it isnt empty
    }
    return (
        <React.Fragment>
            <h3>Search: </h3>

            <Form>
                <Form.Group>
                    <Form.Label>Phone #: </Form.Label>
                    <Form.Control 
                        name="mobile_number"
                        placeholder="Enter a customer's phone number"
                        type="text"
                    />
                </Form.Group>

                <Button
                    variant="primary"

                    >Search</Button>

            </Form>

            {/*Depending on the state of the reservations output them*/}
        </React.Fragment>
    )
};

export default SearchPage;