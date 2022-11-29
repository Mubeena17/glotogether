export const Auth = {
    //checking cookies
    isLoggedIn: () => {
        fetch("/user/id.json")
            .then((result) => result.json())
            .then((user) => {
                console.log(user);
                if (user.user_id) {
                    return true;
                } else {
                    return false;
                }
            });
    },

    loginUser: (email, password) => {
        //handle in server
        //setcookies in server
        let user = {
            email,
            password,
        };

        return fetch("/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("################RESPONSE", response);
                if (response.status === 200) {
                    console.log("################", response);
                    return true;
                } else throw Error("Something went wrong");
            })
            .catch((err) => {
                console.log(err.message);
                return false;
            });
    },

    logout: () => {
        fetch("/logout").then(() => {
            location.reload();
            return;
        });
    },

    registerUser: (email, password, firstname, lastname) => {
        let user = {
            email,
            password,
            firstname,
            lastname,
        };

        return fetch("/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("################RESPONSE", response);
                if (response.status === 200) {
                    console.log("################", response);
                    return true;
                } else throw Error("Something went wrong");
            })
            .catch((err) => {
                console.log(err.message);
                return false;
            });
    },
};
