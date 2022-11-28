export const Auth = {
    //checking cookies
    isLoggedIn: () => {
        fetch("/user/id.json")
            .then((result) => result.json())
            .then((user) => {
                //console.log(userInfo);
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

        fetch("/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("response ", response);
                if (response.status === 200) {
                    location.reload();
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
        //handle in server
        //setcookies in server
        let user = {
            email,
            password,
            firstname,
            lastname,
        };

        fetch("/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    location.reload();
                    return true;
                } else throw Error("Something went wrong");
            })
            .catch((err) => {
                console.log(err.message);
                return false;
            });
    },
};
