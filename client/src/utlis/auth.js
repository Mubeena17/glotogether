export const Auth = {
    //checking cookies
    isLoggedIn: async () => {
        let result = await fetch("/user/id.json");
        let user = await result.json();
        if (user.user_id) {
            return true;
        } else {
            return false;
        }
    },

    loginUser: async (email, password) => {
        //handle in server
        //setcookies in server
        let user = {
            email,
            password,
        };
        try {
            let response = await fetch("/login", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                return response.json();
            } else throw Error("Something went wrong");
        } catch (err) {
            console.log(err.message);
            return response.json({
                success: false,
                message: err.message,
            });
        }
    },

    logout: () => {
        fetch("/logout").then(() => {
            location.replace("/");
            return;
        });
    },

    registerUser: async (email, password, firstname, lastname) => {
        let user = {
            email,
            password,
            firstname,
            lastname,
        };
        try {
            let response = await fetch("/register", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                return response.json();
            } else throw Error("Something went wrong");
        } catch (err) {
            console.log(err.message);
            return response.json({
                success: false,
                message: err.message,
            });
        }
    },
};
