import ProfileApp from "./profileapp";
import Findpeople from "./findpeople";
import Otherprofile from "./otherprofile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<ProfileApp id={props.id} />}
                ></Route>
                <Route path="/find" element={<Findpeople />}></Route>
                <Route
                    path="/otherprofile/:id"
                    element={<Otherprofile />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}
