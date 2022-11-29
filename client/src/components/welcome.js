import Login from "./login";
import Registration from "./registration";
import ResetPassword from "./resetpassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Registration />}></Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}
