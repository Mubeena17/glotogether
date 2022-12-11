import React from "react";
import { Row, Col, Button } from "react-bootstrap";
export default function Friendbutton(props) {
    return (
        <Button className={props.className} onClick={props.onClick}>
            {props.text}
        </Button>
    );
}
