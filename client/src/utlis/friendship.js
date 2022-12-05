export const Friendship = {
    getStatus: async (id) => {
        let response = await fetch(`/friendship/${id}`);
        return response.json();
    },
    sendFriendrequest: async (id, method) => {
        let response = await fetch(`/friendship/${id}`, {
            method: method,
        });
        return response.json();
    },
};
