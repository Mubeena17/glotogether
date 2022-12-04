import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Upload } from "../utlis/upload";

export default function Bioeditor(props) {
    const [Editbio, setEditBio] = useState(false);
    const openEditbio = () => setEditBio(true);
    const [biotext, setBiotext] = useState({
        text: props.bio,
    });

    const handleSubmit = async () => {
        let response = await Upload.bioUpdate(props.id, biotext.text);

        if (response.success) {
            console.log("$$$$", biotext.text);
            setEditBio(false);
            props.bioUpdated(biotext.text);
        }
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
                <div onClick={openEditbio}>Add your bio now</div>
            )}
        </>
    );
}
