import ProfileApp from "./profileapp";
import Findpeople from "./findpeople";
import Otherprofile from "./otherprofile";
import Friends from "./friends";

import Chat from "./Chat";
import Onlineuser from "./onlineuser";
import Appnavbar from "./navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import Notification from "./notification";

export default function App(props) {
    return (
        <BrowserRouter>
            <Appnavbar></Appnavbar>
            <Notification />
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
                <Route path="/random" element={<Random />}></Route>
                <Route path="/friends" element={<Friends />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
                <Route path="/online" element={<Onlineuser />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
