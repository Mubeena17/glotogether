export const Auth = {
    isLoggedIn: () => {
        fetch("/user/id.json")
            .then((result) => result.json())
            .then((userInfo) => {
                //console.log(userInfo);
                if (userInfo.userID) {
                    return true;
                } else {
                    return false;
                }
            });
    },
};
