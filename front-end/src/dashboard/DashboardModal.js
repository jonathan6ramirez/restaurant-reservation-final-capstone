import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import { emptyTable, listTables } from "../utils/api";

function DashboardModal ({ show, setShow, selectedTable, setTables }) {
    const handleClose = () => setShow(false);
    const onConfirm = async (table) => {
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

    return (
        <>
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Is this table ready to seat new guests? This cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancel
                </Button>
                <Button variant="primary" onClick={() => onConfirm(selectedTable)}>
                Yes
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default DashboardModal;