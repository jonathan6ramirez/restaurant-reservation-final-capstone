import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateReservationStatus } from "../../utils/api";

function SearchPageModal({ show, setShow, reservation }) {
    const handleClose = () => setShow(!show);

    const handleCancel = async () => {
        const abortController = new AbortController();
        const status = "cancelled"
        const reservationId = reservation.reservation_id
        try {
            await updateReservationStatus({status, reservationId}, abortController.signal);
        } catch (err){
            console.log("!!!!", err, "!!!!")
        }
    }
    return (
        <>
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Cancel Reservation for {reservation.first_name} {reservation.last_name}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to cancel this reservation? This cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancel
                </Button>
                <Button variant="primary" onClick={() => console.log("yes clicked")}>
                Yes
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default SearchPageModal;