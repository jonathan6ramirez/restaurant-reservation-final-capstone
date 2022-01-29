import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchPage() {
    
    const handleSubmit = (event) => {
        event.preventDefault();
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

        </React.Fragment>
    )
};

export default SearchPage;