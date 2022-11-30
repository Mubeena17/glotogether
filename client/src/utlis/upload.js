export const Upload = {
    profilepic: (formData) => {
        console.log("hellow ", formData);

        return fetch("/upload/profilepic", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                else throw Error("Something went wrong");
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                this.message = err.message;
                return;
            });
    },

    bioUpdate: (id, bio) => {
        let user = { id, bio };
        return fetch("/user/updatebio", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                else throw Error("Something went wrong");
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err.message);
                return;
            });
    },
};

//{success: true,
// message: 'File upload successful',
//  profileurl: 'https://s3.amazonaws.com/spicedling/dAk8tmDwIvnzk4XT4O0LMMTF9eqW1bQN.jpeg'}
