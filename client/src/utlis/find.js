export const Find = {
    getUserList: (query) => {
        if (query === "") {
            query = 0;
        }

        return fetch(`/userlist/${query}`)
            .then((result) => result.json())
            .then((user) => {
                console.log("u", user);
                return user;
            });
    },
};
