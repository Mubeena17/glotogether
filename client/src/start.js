import { createRoot } from "react-dom/client";
import Welcome from "./components/welcome";

import { Navbar, Container, Button } from "react-bootstrap";
import { Auth } from "./utlis/auth";
const root = createRoot(document.querySelector("main"));

const handleLogout = () => {
    Auth.logout();
};

fetch("/user/id.json")
    .then((result) => result.json())
    .then((user) => {
        root.render(
            <div className="App">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>Social Network</Navbar.Brand>
                    </Container>
                    {user.user_id && (
                        <Button
                            variant="outline-secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </Navbar>

                {!user.user_id && <Welcome />}
                {user.user_id && <h1>hello world</h1>}
            </div>
        );
    });
