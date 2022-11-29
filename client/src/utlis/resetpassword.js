export const Reset = {
    //checking cookies
    resetStart: (email) => {
        let user = { email };
        return fetch("/password/reset/start", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((result) => result.json())
            .then((result) => {
                console.log("hello result ", result);
                return true;
            });
    },
};
