import { Image } from "react-bootstrap";

function Profilepic(props) {
    return (
        <>
            <Image
                width={props.size == "large" ? "200px" : "80px"}
                height={props.size == "large" ? "200px" : "80px"}
                className="border border-dark"
                src={props.src}
                roundedCircle
                onClick={props.onShow}
            />
        </>
    );
}
export default Profilepic;
