import "./Seat.css"
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, listTables, seatReservation } from "../../utils/api";
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

    useEffect(() => {
        async function loadReservation() {
            const abortController = new AbortController();
            try {
                const reservationRes = await readReservation(reservationId, abortController.signal);
                setReservation(reservationRes);
            } catch (err) {
                setReservationError(err);
            }

            try {
                const tablesRes = await listTables(abortController.signal);
                setTables(tablesRes);
            } catch (err) {
                setTableError(err)
            }
        }
        loadReservation()
    }, []);

    const handleChange = ({target}) => {
        setTable(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        const abortController = new AbortController();
        const selectedTable = tables.find((currentTable) => currentTable.table_id == table)
        if (table < 1){
            return setErr({message: `Pick a table to seat the reservation.`})
        }

        if(selectedTable.capacity < reservation.people){
            return setErr({message: `Table does not seat enough people.`})
        }
        const data = {reservationId: parseInt(reservationId), tableId: selectedTable.table_id}
        const res = await seatReservation(data, abortController.signal);
    }
    //make a function that makes the request to the api to get the reservation info
    //make a function that makes the request to the api to get the tables
    //put that function inside a useeffect
    //make a render function for the tables to put into an option dropdown
    //whenever they click on the seat table run validations
    //the onChange function passes the capacity to the state so that the validations can be done
    //check the capacity
    //check the availability
    //send the requests with the object: `{ data: { reservation_id: x } }`
    return (
        <div className="seat__main-container">
            <h2 className="seat__main-title">Select a table</h2>
            <h4 className="seat__main-title">Reservation id: {reservationId}</h4>

            <div className="seat__input-container">
                <Button type="secondary" className="seat__button-cancel" onClick={() => history.goBack()}>Cancel</Button>
                <div>
                    {err && 
                        <div className="seat__err-message"><p>{err.message}</p></div>
                    }
                    {reservationError &&
                        <div className="seat__err-message"><p>{reservationError}</p></div>
                    }
                    {tableError &&
                        <div className="seat__err-message"><p>{tableError}</p></div>
                    }
                    <select 
                        className="seat__dropdown-container"
                        type="text"
                        name="table_id"
                        onChange={handleChange}
                        required
                        >
                        <option value="-1">Please Select A Table</option>
                        {Array.isArray(tables) && tables.map((table, index) => (
                            <option key={index} value={table.table_id}>
                                {table.table_name} - {table.capacity}
                            </option>
                        ))}
                    </select>
                </div>
                <Button type="submit" className="seat__button-submit" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}


export default Seat;