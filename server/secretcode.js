const cryptoRandomString = require("crypto-random-string");
module.exports = {
    secretCode: cryptoRandomString({
        length: 6,
    }),
};
