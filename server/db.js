const spicedPg = require("spiced-pg");
require("dotenv").config();
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${process.env.USER}:${process.env.PASS}@localhost:5432/${process.env.DATABASE}`
);

module.exports.registerUser = ({ firstName, lastName, email, password }) => {
    return db
        .query(
            `INSERT INTO users ("firstname", "lastname", "email", "password")
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
            [firstName, lastName, email, password]
        )
        .then((result) => result.rows[0]);
};

module.exports.authenticateUser = (email, password) => {
    return db
        .query(`SELECT * FROM users WHERE email=$1 AND password=$2`, [
            email,
            password,
        ])
        .then((result) => result.rows[0]);
};

module.exports.userEmailExist = (email) => {
    return db
        .query(`SELECT email, password, id FROM users WHERE email=$1`, [email])
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        });
};

module.exports.storePasswordRestCode = ({ email, code }) => {
    return db
        .query(
            `INSERT INTO reset_code (email, code )
             VALUES ($1, $2)
             ON CONFLICT (email)
             DO UPDATE SET code=$2, created_at=CURRENT_TIMESTAMP
             RETURNING email, created_at`,
            [email, code]
        )
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        });
};

module.exports.verifyPasswordRestCode = ({ email }) => {
    return db
        .query(`SELECT code FROM reset_code WHERE email=$1`, [email])
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        });
};

module.exports.verifyRestCode = ({ email }) => {
    return db
        .query(
            `SELECT code FROM reset_code
             WHERE email=$1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`,
            [email]
        )
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        });
};
module.exports.updatePassword = ({ email, password }) => {
    return db
        .query(`UPDATE users SET password=$1 WHERE email=$2 RETURNING *`, [
            password,
            email,
        ])
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        })
        .catch((err) => console.log(err));
};

module.exports.getUserInfo = (userid) => {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [userid])
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        })
        .catch((err) => console.log(err));
};

module.exports.updateProfilepic = ({ id, profileurl }) => {
    return db
        .query(`UPDATE users SET profileurl=$1 WHERE id=$2 RETURNING *`, [
            profileurl,
            id,
        ])
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        })
        .catch((err) => console.log(err));
};

module.exports.updateBio = ({ id, bio }) => {
    return db
        .query(`UPDATE users SET bio=$1 WHERE id=$2 RETURNING *`, [bio, id])
        .then((result) => {
            if (result.rows.length > 0) return result.rows[0];
            return false;
        })
        .catch((err) => console.log(err));
};

module.exports.getUserList = (query) => {
    let sql;
    let value = [];
    if (query == 0) {
        sql =
            "SELECT profileurl, firstname, lastname, id, bio FROM users ORDER BY created_at DESC LIMIT 3";
    } else {
        sql = `SELECT profileurl, firstname, lastname, id, bio FROM users WHERE firstname ILIKE $1`;
        value = [query + "%"];
    }
    return db
        .query(sql, value)
        .then((result) => {
            if (result.rows.length > 0) return result.rows;
            return false;
        })
        .catch((err) => console.log(err));
};

module.exports.findFriendshipStatus = (sender, recipient) => {
    const query = `
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`;
    return db
        .query(query, [sender, recipient])
        .then((result) => {
            console.log("here i am ", result.rows);
            if (result.rows.length > 0) return result.rows[0];
            return false;
        })
        .catch((err) => console.log(err));
};

module.exports.createFriendRequest = (sender, recipient) => {
    return db
        .query(
            `INSERT INTO friendships ("sender_id", "recipient_id")
    VALUES ($1, $2)
    RETURNING *`,
            [sender, recipient]
        )
        .then((result) => {
            return result.rows[0];
        });
};

module.exports.deleteFriendRequest = (sender, recipient) => {
    return db
        .query(
            `DELETE FROM friendships 
                    WHERE (sender_id=$1 AND recipient_id=$2)
                    OR (sender_id=$2 AND recipient_id=$1)`,
            [sender, recipient]
        )
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
};

module.exports.acceptFriendRequest = (sender, recipient) => {
    return db
        .query(
            `UPDATE friendships SET accepted=true
            WHERE (sender_id=$1 AND recipient_id=$2)
            OR (sender_id=$2 AND recipient_id=$1) RETURNING *`,
            [sender, recipient]
        )
        .then((result) => {
            return result.rows[0];
        });
};

module.exports.getFriendList = (id) => {
    return db
        .query(
            `SELECT users.id, firstname, lastname, profileurl, accepted, bio
        FROM friendships
        JOIN users 
        ON (accepted = FALSE AND recipient_id = $1 AND sender_id = users.id) 
        OR (accepted = TRUE AND recipient_id = $1 AND sender_id = users.id) 
        OR (accepted = TRUE AND sender_id = $1 AND recipient_id = users.id)`,
            [id]
        )
        .then((result) => result.rows);
};

module.exports.getMessages = () => {
    return db
        .query(
            `SELECT users.id, firstname, lastname, profileurl, text
            FROM messages
            JOIN users
            ON users.id = messages.user_id
            ORDER BY messages.created_at DESC LIMIT 10`
        )
        .then((result) => result.rows);
};

module.exports.insertNewMessage = (userid, message) => {
    return db
        .query(
            `WITH currentuser AS
            (SELECT id, firstname, lastname, profileurl 
            FROM users
            WHERE id=$1),
            message AS (INSERT INTO messages (user_id, text )
            VALUES ($1,$2)
            RETURNING text , created_at)
            SELECT * FROM currentuser, message;`,
            [userid, message]
        )
        .then((result) => result.rows[0]);
};
