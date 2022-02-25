import "./Seat.css"
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, listTables } from "../../utils/api";
import Button from "react-bootstrap/Button";


function Seat() {
    //Getting the reservation id from the params to submit the seat request to the api
    const { reservationId } = useParams();
    const history = useHistory();
    const [reservation, setReservation] = useState([]);
    const [reservationError, setReservationError] = useState(null);
    const [tables, setTables] = useState([])
    const [tableError, setTableError] = useState(null);
    const [table, setTable] = useState(0);
    const [err, setErr] = useState(null);

    const tempData = [
        {
            table_id: 2,
            table_name: "Cool",
            capacity: 4,
        }
    ]

    async function loadReservation() {
        const abortController = new AbortController();
        readReservation(reservationId, abortController.signal)
            .then(setReservation)
            .catch(setReservationError);
        listTables(abortController.signal)
            .then(setTables)
            .catch(setTableError);
    }

    useEffect(() => {loadReservation()}, []);

    const handleChange = ({target}) => {
        setTable(target.value)
    }

    const handleSubmit = (e) => {
        setErr(null);
        //! Make sure to to checks and check if the table has enough capacity for
        //! the reservation as well as making sure the value is greater than 0
        e.preventDefault();
        if (table < 1){
            setErr({message: `Pick a table to seat the reservation.`})
        }
        console.log(table)
    }
    //make a function that makes the request to the api to get the reservation info
    //make a function that makes the request to the api to get the tables
    //put that function inside a useeffect
    //make a render function for the tables to put into an option dropdown
    //whenever they click on the seat table run validations
    //check the capacity
    //check the availability
    //send the requests with the object: `{ data: { reservation_id: x } }`
    console.log(reservationId, 'this is the reservation id from the parameters')
    console.log(tables, "hey there")
    return (
        <div className="seat__main-container">
            <h2 className="seat__main-title">Select a table</h2>
            <h4 className="seat__main-title">Reservation id: {reservationId}</h4>

            <div className="seat__input-container">
                <Button type="secondary" className="seat__button-cancel" onClick={() => history.goBack()}>Cancel</Button>
                <div>
                    {err && 
                        <div className="seat__err-message"><p>Please pick a table</p></div>
                    }
                    <select 
                        className="seat__dropdown-container"
                        type="text"
                        name="table_id"
                        onChange={handleChange}
                        required
                        >
                        <option value="-1">Please Select A Table</option>
                        {tables.map((table, index) => (
                            <option key={index} value={table.table_id}>
                                {table.table_name} - {table.capacity}
                            </option>
                        ))}
                    </select>
                </div>
                <Button type="submit" className="seat__button-submit" onClick={handleSubmit}>Submit</Button>
            </div>
            {tables.map((table, index) => {
                <p key={index}>{table.table_name}</p>
            })}
        </div>
    )
}


//{tables.length > 0 && (
//     tempData.map((table, index) => {
//         <option key={index} value={table.table_id}>
//             {table.table_name}
//         </option>
//     })
// )}
export default Seat;