import { createRoot } from "react-dom/client";
import Welcome from "./components/welcome";
import App from "./components/app";
import { Provider } from "react-redux";
import { Navbar, Container, Button } from "react-bootstrap";
import { Auth } from "./utlis/auth";
const root = createRoot(document.querySelector("main"));
import store from "./redux/store";
import { init } from "./socket";

fetch("/user/id.json")
    .then((result) => result.json())
    .then((user) => {
        root.render(
            <div className="App">
                {!user.user_id && <Welcome />}

                {user.user_id && (
                    <Provider store={store}>
                        {init(store)}
                        <App id={user.user_id} />
                    </Provider>
                )}
            </div>
        );
    });
