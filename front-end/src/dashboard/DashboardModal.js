import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import { emptyTable, listTables, listReservations, updateReservationStatus } from "../utils/api";

function DashboardModal ({ date, show, setShow, selectedTable, setTables, selectedReservation, setReservations}) {
    const handleClose = () => setShow(false);
    const onConfirmTable = async (table) => {
        const abortController = new AbortController();
        console.log(table, "confirmation clicked")
        try {
            await emptyTable(table.table_id, abortController.signal);
            const tables = await listTables(abortController.signal);
            setTables(tables)
            setShow(!show)
        } catch (err) {
            console.log("!!!!!", err, "!!!!!")
        }
    }

    const onConfirmReservation = async (reservation) => {
        console.log("reservation yes confirmed")
        const abortController = new AbortController();
        const reservationId = reservation.reservation_id;
        const status = "cancelled"
        try {
            await updateReservationStatus({status, reservationId}, abortController.signal);
            const reservations = await listReservations(date, abortController.signal);
            setReservations(reservations)
            setShow(!show)
        } catch (err) {
            console.log("!!!!!", err, "!!!!!")
        }
    }

    if(selectedTable) {
        return (
            <>
                <Modal 
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Clear Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>Is this table ready to seat new guests? This cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={() => onConfirmTable(selectedTable)}>
                    Yes
                    </Button>
                </Modal.Footer>
                </Modal>
            </>
        )
    }
    if(selectedReservation) {
        return (
            <>
                <Modal 
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to cancel this reservation? This cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={() => onConfirmReservation(selectedReservation)}>
                    Yes
                    </Button>
                </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default DashboardModal;