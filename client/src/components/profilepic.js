import { Image } from "react-bootstrap";

function Profilepic(props) {
    console.log("props", props);
    return (
        <>
            <Image
                width="80px"
                height="80px"
                className="border border-dark"
                src={props.src}
                roundedCircle
                onClick={props.onShow}
            />
        </>
    );
}
export default Profilepic;
