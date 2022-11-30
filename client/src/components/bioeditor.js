import React, { useState } from "react";
import { Button, Modal, Stack, Form, Row, Col } from "react-bootstrap";

export default function Bioeditor(props) {
    const [Editbio, setEditBio] = useState(false);
    const openEditbio = () => setEditBio(true);
    const [biotext, setBiotext] = useState("");

    const handleSubmit = () => {
        console.log("clcicked now");

        setEditBio(false);
    };

    return (
        <>
            {Editbio && (
                <>
                    <Form.Control
                        as="textarea"
                        placeholder="Add profile bio"
                        style={{ height: "100px" }}
                        value={props.bio || ""}
                        onChange={(event) => {
                            const { value } = event.target;
                            props.bioUpdated(value);
                        }}
                    />

                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </>
            )}
            {!Editbio && props.bio && (
                <>
                    <div> {props.bio}</div>
                    <Button variant="primary" onClick={openEditbio}>
                        Edit
                    </Button>
                </>
            )}

            {!props.bio && !Editbio && (
                <div onClick={openEditbio}>Add you bio now</div>
            )}
        </>
    );
}
