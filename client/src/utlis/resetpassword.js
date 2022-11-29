export const Reset = {
    //checking cookies
    resetStart: () => {
        fetch("/password/reset/start")
            .then((result) => result.json())
            .then(() => {
                return true;
            });
    },
};
