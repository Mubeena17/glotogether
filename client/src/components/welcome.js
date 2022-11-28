import Login from "./login";
import { Auth } from "../utlis/auth";
import Registration from "./registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
export default function Welcome() {
    const handleLogout = () => {};

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Registration />}></Route>

                <Route exact path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
