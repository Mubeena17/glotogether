const spicedPg = require("spiced-pg");

const user = "mubeena";
const password = "12345";
const database = "social";

const db = spicedPg(`postgres:${user}:${password}@localhost:5432/${database}`);

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
             DO UPDATE SET code=$2
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
