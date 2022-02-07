import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import ErrorAlert from "../ErrorAlert";
import { createTable } from "../../utils/api";

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
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check to see the form is valid
        if(form.capacity < 1){
            return setErr({message: "!! Must seat at least 1 person !!"})
        }
        if(form.table_name.length < 2){
            return setErr({message: "!! table name must be at least 2 characters !!"})
        }
        // Send the user to the dashboard page after the table is created
        form["capacity"] = Number(form["capacity"])
        const data = { ...form };
        await createTable({ data });
        history.push("/dashboard");
        //Clean up
        setForm({ ...initialFormState })
    }

    return (
    <React.Fragment >
        <ErrorAlert error={err} />
        <h3 className="text-center" >Create A Table</h3>
        <Form onSubmit={ handleSubmit }>
            <Form.Group>
                <Form.Label>Table Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="table_name"
                    onChange={ handleChange }
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Capacity: </Form.Label>
                <Form.Control
                    type="text"
                    name="capacity"
                    onChange={ handleChange }
                    required
                />
            </Form.Group>
            <div className="mt-2">
                <Button
                variant="secondary"
                onClick={() => history.goBack()}
                    >Cancel</Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="ms-2"
                    >Submit</Button>
            </div>
        </Form>

    </React.Fragment>
    )
} 

export default CreateTable;
