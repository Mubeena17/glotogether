import React from "react";
import { Row, Col, Button } from "react-bootstrap";
export default function Friendbutton(props) {
    return <Button onClick={props.onClick}>{props.text}</Button>;
}
