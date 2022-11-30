import React, { useState, useEffect } from "react";
import { Button, Modal, Stack, Form, Row, Col } from "react-bootstrap";
import { Upload } from "../utlis/upload";

export default function Bioeditor(props) {
    const [Editbio, setEditBio] = useState(false);
    const openEditbio = () => setEditBio(true);
    const [biotext, setBiotext] = useState({
        text: props.bio,
    });

    const handleSubmit = () => {
        console.log("clcicked now");

        return Upload.bioUpdate(props.id, biotext.text).then((response) => {
            console.log("respindd", response);
            if (response.success) {
                props.bioUpdated(biotext.text);
                setEditBio(false);
            }
        });
    };

    useEffect(() => {
        setBiotext({
            text: props.bio,
        });
    }, [props.bio]);

    return (
        <>
            {Editbio && (
                <>
                    <Form.Control
                        as="textarea"
                        placeholder="Add profile bio"
                        style={{ height: "100px" }}
                        value={biotext.text || ""}
                        onChange={(event) => {
                            const { value } = event.target;
                            setBiotext({ text: value });
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
