import { createRoot } from "react-dom/client";
import Welcome from "./components/welcome";
import App from "./components/app";
import { Provider } from "react-redux";
import { Navbar, Container, Button } from "react-bootstrap";
import { Auth } from "./utlis/auth";
const root = createRoot(document.querySelector("main"));
import store from "./redux/store";

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
                        {user.user_id && (
                            <Button
                                variant="outline-secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                    </Container>
                </Navbar>

                <Container>
                    {!user.user_id && <Welcome />}

                    {user.user_id && (
                        <Provider store={store}>
                            <App id={user.user_id} />
                        </Provider>
                    )}
                </Container>
            </div>
        );
    });
