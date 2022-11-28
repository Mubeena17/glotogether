import { createRoot } from "react-dom/client";
import Welcome from "./components/welcome";

const root = createRoot(document.querySelector("main"));

fetch("/user/id.json")
    .then((result) => result.json())
    .then((user) => {
        if (user.user_id) {
            root.render(<div> hello</div>);
        } else {
            root.render(<Welcome />);
        }
    });
