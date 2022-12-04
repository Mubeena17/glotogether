import { Form, Button, Modal } from "react-bootstrap";
import { Upload } from "../utlis/upload";
import { useState } from "react";

function Uploadmodal(props) {
    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("photo", selectedFile);

        formData.append("id", props.user.id);

        let response = await Upload.profilepic(formData);
        if (response.success) {
            props.change(response.profileurl);
            props.onHide();
        }
    };

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile image</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload a a profile pic</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Button
                            variant="secondary"
                            type="sumbit"
                            onClick={handleSubmit}
                        >
                            Upload
                        </Button>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    );
}
export default Uploadmodal;
