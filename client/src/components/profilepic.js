import { Image } from "react-bootstrap";

function Profilepic(props) {
    return (
        <>
            <Image
                width="80px"
                height="80px"
                className="border border-dark"
                src="/images/profile.png"
                roundedCircle
                onClick={props.onShow}
            />
        </>
    );
}
export default Profilepic;