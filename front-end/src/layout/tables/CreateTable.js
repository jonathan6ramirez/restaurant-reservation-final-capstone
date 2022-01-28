import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import ErrorAlert from require("../ErrorAlert");

function CreateTable() {
    // Used to take the user back a page if they cancel the submission
    const history = useHistory();

    //Initial form state
    const initialFormState = {
        table_name: "",
        capacity: "",
    }

    // State for the form
    const [form, setForm] = useState({ ...initialFormState });

    // State for the errors, if any error occurs during form validation
    // it is set inside the err state
    const [err, setErr] = useState(null);


    // Handles the form change
    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value,
        });
    };

    // Handles when the form is submitted
    const handleSubmit = (event) => {
        event.preventDefault();
        // Check to see the form is valid
        if(form.capacity < 1){
            console.log("!! Must seat at least 1 person !!")
            setErr(true)
        }
        console.log("! submit button clicked !")
    }

    return (
        <React.Fragment>
            <ErrorAlert />
            <h3 className="text-center" >Create A Table</h3>
            <Form>
                <Form.Group>
                    <Form.Lable>Table Name:</Form.Lable>
                    <Form.Control
                        type="text"
                        name="table_name"
                        onChange={ handleChange }
                        required={true}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Lable>Capacity: </Form.Lable>
                    <Form.Control 
                        type="text"
                        name="capacity"
                        require={true}
                        onChange={ handleChange }
                    />
                </Form.Group>
            </Form>
            <div className="mt-2">
                <Button
                    varaint="secondary"
                    onClick={() => history.goBack()}
                    >Cancel</Button>

                <Button
                    className="primary"
                    onClick={ handleSubmit }
                    >Submit</Button>
            </div>
        </React.Fragment>
    )
} 

export default CreateTable;