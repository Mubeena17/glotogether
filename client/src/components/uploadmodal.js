import { Form, Button, Modal } from "react-bootstrap";

function Uploadmodal(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile image</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Button variant="secondary" onClick={props.onHide}>
                            Upload
                        </Button>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    );
}
export default Uploadmodal;
