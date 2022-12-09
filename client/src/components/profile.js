import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";
import { Form, Row, Col } from "react-bootstrap";

export default function Profile(props) {
    return (
        <Form>
            <Row>
                <Col sm={3}>
                    <Profilepic src={props.src} size={"large"} />
                </Col>
                <Col sm={4}>
                    <h1>
                        {props.user.firstname}
                        <span></span>
                        {props.user.lastname}
                    </h1>
                    <Bioeditor
                        id={props.user.id}
                        bio={props.bio}
                        bioUpdated={props.bioUpdated}
                    />
                </Col>
            </Row>
        </Form>
    );
}
