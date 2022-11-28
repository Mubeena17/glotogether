import Login from "./login";
import { Auth } from "./auth";
import Registration from "./registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
export default function Welcome() {
    const handleLogout = () => {
        //logout
    };

    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Social Network</Navbar.Brand>
                </Container>
                {/* {Auth.isLoggedIn() && (
                    <Button variant="outline-secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                )} */}
            </Navbar>

            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Registration />}></Route>

                    <Route exact path="/login" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
